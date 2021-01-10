require('dotenv').config()
const { ApolloServer } = require("apollo-server");
const mongoose = require('mongoose');

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => ({ req })
});

const PORT = process.env.PORT || 4000


mongoose
    .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@noise-controller-be.jiy1o.mongodb.net/${process.env.DB_CLUSTER}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    })
    .then(() => {
        return server.listen({port: PORT});
    })
    .then((res) => {
        console.log(`Server running at ${res.url} on Port: ${PORT}`)
    })
    .catch(err => {
        console.error(err)
    })

mongoose.connection.once('open',()=>{
    console.log('Connected to database')
})