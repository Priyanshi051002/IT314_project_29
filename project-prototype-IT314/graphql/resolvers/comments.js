const { AuthenticationError } = require('apollo-server');
const { UserInputError } = require('apollo-server');

const Post = require('../../models/Post');
const checkAuth = require('../../util/check-auth');

module.exports = {
    Mutation:
    {
        async createComment(_, { postId, body }, context) {
            const { username } = checkAuth(context);
            if (body.trim() === '') {
                throw new UserInputError('Empty comment', {
                    errors: {
                        body: 'Comment body must not be empty'
                    }
                });
            }

            const post = await Post.findById(postId);
            if (post) {
                // unshift to add to the beginning of the array
                //post.comments mongoose gives facility to take json object type 
                post.comments.unshift({
                    body,
                    username,
                    createdAt: new Date().toISOString()
                });
                await post.save();
                return post;
            }
            else throw new UserInputError('Post not found');
        },
        
        async deleteComment(_, { postId, commentId }, context) {
            const { username } = checkAuth(context);
            try 
            {
            const post = await Post.findById(postId);
            if (post) {
                const commentIndex = post.comments.findIndex(c => c.id === commentId); // get comment index 
                if (post.comments[commentIndex].username === username) { // user verify same comment same user 
                    post.comments.splice(commentIndex, 1);
                    await post.save();
                    return post;
                }
                else {
                    throw new AuthenticationError('Action not allowed');
                }
            }
            else {
                throw new UserInputError('Post not found');
            }
        }catch(err){
            throw new UserInputError('User not found');
        }
        },
    }
};