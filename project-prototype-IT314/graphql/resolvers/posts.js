const Post = require('../../models/Post');
const checkAuth = require('../../util/check-auth');
const { AuthenticationError , UserInputError} = require('apollo-server');

module.exports = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find().sort({ createdAt: -1 });
                return posts;
            } catch (err) {
                throw new Error(err);
            }
        },

        async getPost(_, { postId }) {
            try {
                const post = await Post.findById(postId);
                if (post) {
                    return post;
                } else {
                    throw new Error('Post not found');
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    }
    ,
    Mutation: {
        async createPost(_, { body }, context) {
            const user = checkAuth(context);
            if (body.trim() === '') {
                throw new Error('Post body must not be empty');
            }

            const newPost = new Post({
                body,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString()
            });

            const post = await newPost.save();

            return post;
        },

        async deletePost(_, { postId }, context) {
            const user = checkAuth(context);

            try {
                const post = await Post.findById(postId);
                if (!post) {
                    throw new Error('Post not found');
                }
                if (user.username === post.username) {
                    await post.deleteOne();  // check if this works
                    return 'Post deleted successfully';
                } else {
                    throw new AuthenticationError('Action not allowed');
                }
            } catch (err) {
                throw new Error(err);
            }
        },


        async likePost(_, { postId }, context) {
            const { username } = checkAuth(context);
            const post = await Post.findById(postId);
            if (post) {
                if (post.likes.find(like => like.username === username)) {
                    // Post already likes, unlike it
                    post.likes = post.likes.filter(like => like.username !== username); // filter out the like
                } else {
                    // Not liked, like post
                    post.likes.push({ // push to the array
                        username, 
                        createdAt: new Date().toISOString() // current time
                    });
                }
                await post.save();
                return post;
            } else throw new UserInputError('Post not found');
    }
}
};