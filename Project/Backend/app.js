const express = require('express');
const client = require('./connection');
const indexSettings = require('./mappings_and_settings');
const getSearchQuery = require('./getSearchQuery');

const app = express();

// Use JSON parser
app.use(express.json());

client.ping({
    requestTimeout: 30000,
}, function (error) {
    if (error) {
        console.error('Elasticsearch cluster is down!');
    } else {
        console.log('Everything is ok');
        app.listen(3000, () => console.log('Server started on port 3000'));
    }
});

// Check if the index named post exists or not if not create it with mapping and analyzer settings
client.indices.exists({
    index: 'post'
}, (err, res, status) => {
    if (res) {
        console.log('index already exists');
    } else {
        client.indices.create({
            index: 'post',
            body: indexSettings
        }, (err, res, status) => {
            if (err) {
                console.log(err);
            } else {
                console.log('created a new index', res);
            }
        });
    }
});

// Add post
app.post('/addPost', (req, res) => {
    const { title, description, user_id } = req.body;
    client.index({
        index: 'post',
        body: {
            title,
            description,
            user_id,
            comments: [],
            likes: []
        }
    }, (err, result, status) => {
        if (err) {
            res.send({err});
        } else {
            res.send({id: result._id});
        }
    });
});

// Add comment
app.post('/addComment', (req, res) => {
    const { comment, user_id, post_id } = req.body;
    client.update({
        index: 'post',
        id: post_id,
        body: {
            script: {
                source: 'ctx._source.comments.add(params.comment)',
                lang: 'painless',
                params: {
                    comment: {
                        user_id,
                        comment
                    }
                }
            }
        }
    }, (err, result, status) => {
        if (err) {
            res.send({err});
        } else {
            res.send({success: true});
        }
    });
});

// Get posts for particular user
app.get('/getPostsUser', (req, res) => {
    const { user_id } = req.body;
    client.search({
        index: 'post',
        body: {
            query: {
                match: {
                    user_id
                }
            }
        },
        size: 10000
    }, (err, result, status) => {
        if (err) {
            res.send({err});
        } else {
            var ret = [];
            result.hits.hits.forEach((post) => {
                const { title, description, user_id, comments, likes } = post._source;
                const post_id = post._id;
                ret.push({
                    title,
                    description,
                    user_id,
                    comments,
                    post_id,
                    likes
                });
        });
        res.send(ret);
    }
})});

// Get post for particular query
app.get('/getPostsQuery', (req, res) => {
    const { string } = req.body;
    const query = getSearchQuery(string);
    client.search({
        index: 'post',
        body: query,
        size: 10000
    }, (err, result, status) => {
        if (err) {
            res.send({err});
        } else {
            const posts = [];
            result.hits.hits.forEach((post) => {
                const { title, user_id, likes } = post._source;
                const post_id = post._id;
                const normal_comments = post._source.comments;
                const description = post.highlight ? post.highlight.description[0] : post._source.description;
                const highlighted_comments = post.inner_hits ? post.inner_hits.comments.hits.hits.map((comment) => {
                    return {
                        user_id: comment._source.user_id,
                        comment: comment.highlight['comments.comment'][0]
                    }
                }) : [];
                posts.push({
                    title,
                    description,
                    user_id,
                    normal_comments,
                    highlighted_comments,
                    post_id,
                    likes
                });
            });
            res.send(posts);
            // res.send(result);
        }
    });
});

// Randomly get all posts
app.get('/getPostsHome', (req, res) => {
    // Fetch the same GET request first and know the number of hits
    client.search({
        index: 'post',
        body: {
            query: {
               function_score: {
                    query: {
                    match_all: {}
                    },
                    random_score: {}
                } 
            }
        },
        size: 10000
    }, (err, result, status) => {
        if (err) {
            res.send({err});
        } else {
            var posts = [];
            result.hits.hits.forEach((post) => {
                const { title, description, user_id, comments, likes } = post._source;
                const post_id = post._id;
                posts.push({
                    title,
                    description,
                    user_id,
                    comments,
                    post_id,
                    likes
                });
            });
            console.log(posts.length);
            res.send(posts);
        }
    });
});

// Delete post by post_id
app.delete('/deletePost', (req, res) => {
    const { post_id } = req.body;
    client.delete({
        index: 'post',
        id: post_id
    }, (err, result, status) => {
        if (err) {
            res.send({err});
        } else {
            res.send({success: true});
        }
    });
});

// Add like to post
app.post('/addLike', (req, res) => {
    const { post_id, user_id } = req.body;
    client.update({
        index: 'post',
        id: post_id,
        body: {
            script: {
                source: 'ctx._source.likes.add(params.user)',
                lang: 'painless',
                params: {
                    user: {
                        user_id: user_id
                    }
                }
            }
        }
    }, (err, result, status) => {
        if (err) {
            res.send({err});
        } else {
            res.send({success: true});
        }
    });
});

// Remove like from post
app.post('/removeLike', (req, res) => {
    const { post_id, user_id } = req.body;
    client.update({
        index: 'post',
        id: post_id,
        body: {
            script: {
                source: 'ctx._source.likes.removeIf(l -> l.user_id == params.user_id)',
                lang: 'painless',
                params: {
                    user_id
                }
            }
        }
    }, (err, result, status) => {
        if (err) {
            res.send({err});
        } else {
            res.send({success: true});
        }
    });
});