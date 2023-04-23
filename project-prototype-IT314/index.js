//relative imports 
const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');


//dependency imports 
const { MONGODB } = require('./config.js');
const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/typeDefs');

const server = new ApolloServer({
    typeDefs, resolvers , context: ({ req }) => ({ req })
});


mongoose.connect(MONGODB, { useNewUrlParser: true })
    .then(() => { 
        console.log('You are connected to MongoDB') ;
        return server.listen({ port: 5000 }) }) 
    .then(res => {
        console.log(`Server running at ${res.url}`);
    });
