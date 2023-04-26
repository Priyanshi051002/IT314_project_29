const client = require("../elasticSearch/connection");
const getSearchQuery = require("../elasticSearch/getSearchQuery");

exports.addpost = async (req, res) => {
  const { title, description, user_id } = req.body;
  client.index(
    {
      index: "post",
      body: {
        title,
        description,
        user_id,
        comments: [],
        likes: [],
      },
    },
    (err, result, status) => {
      if (err) {
        res.send({ err });
      } else {
        res.send({ id: result._id });
      }
    }
  );
};

exports.addComment = async (req, res) => {
  const { comment, user_id, post_id } = req.body;
  client.update(
    {
      index: "post",
      id: post_id,
      body: {
        script: {
          source: "ctx._source.comments.add(params.comment)",
          lang: "painless",
          params: {
            comment: {
              user_id,
              comment,
            },
          },
        },
      },
    },
    (err, result, status) => {
      if (err) {
        res.send({ err });
      } else {
        res.send({ success: true });
      }
    }
  );
};

exports.getPostsUser = async (req, res) => {
  const { user_id } = req.body;
  client.search(
    {
      index: "post",
      body: {
        query: {
          match: {
            user_id,
          },
        },
      },
    },
    (err, result, status) => {
      if (err) {
        res.send({ err });
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
            likes,
          });
        });
        res.send(ret);
      }
    }
  );
};

exports.getPostsQuery = async (req, res) => {
  const { string } = req.body;
  const query = getSearchQuery(string);
  client.search(
    {
      index: "post",
      body: query,
    },
    (err, result, status) => {
      if (err) {
        res.send({ err });
      } else {
        const posts = [];
        result.hits.hits.forEach((post) => {
          const { title, user_id, likes } = post._source;
          const post_id = post._id;
          const normal_comments = post._source.comments;
          // set description as highlight.description if post.highlight is not undefined otherwise set it as post._source.description
          const description = post.highlight ? post.highlight.description[0] : post._source.description;

          // set highlighted_comments as post.inner_hits.comments.hits.hits.map if post.inner_hits is not undefined otherwise set it as empty array
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
            likes,
          });
        });
        res.send(posts);
      }
    }
  );
};

exports.getPostsHome = async (req, res) => {
  client.search(
    {
      index: "post",
      body: {
        query: {
          function_score: {
            query: {
              match_all: {},
            },
            random_score: {},
          },
        },
      },
    },
    (err, result, status) => {
      if (err) {
        res.send({ err });
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
            likes,
          });
        });
        res.send(posts);
      }
    }
  );
};

exports.deletePost = async (req, res) => {
  const { post_id } = req.body;
  client.delete(
    {
      index: "post",
      id: post_id,
    },
    (err, result, status) => {
      if (err) {
        res.send({ err });
      } else {
        res.send({ success: true });
      }
    }
  );
};

exports.addLike = async (req, res) => {
  const { post_id, user_id } = req.body;
  client.update(
    {
      index: "post",
      id: post_id,
      body: {
        script: {
          source:
            "if (!ctx._source.likes.contains(params.user)) {ctx._source.likes.add(params.user)}",
          lang: "painless",
          params: {
            user: {
              user_id: user_id,
            },
          },
        },
      },
    },
    (err, result, status) => {
      if (err) {
        res.send({ err });
      } else {
        res.send({ success: true });
      }
    }
  );
};

exports.removeLike = async (req, res) => {
  const { post_id, user_id } = req.body;
  client.update(
    {
      index: "post",
      id: post_id,
      body: {
        script: {
          source:
            "ctx._source.likes.removeIf(l -> l.user_id == params.user_id)",
          lang: "painless",
          params: {
            user_id,
          },
        },
      },
    },
    (err, result, status) => {
      if (err) {
        res.send({ err });
      } else {
        res.send({ success: true });
      }
    }
  );
};
