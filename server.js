require('dotenv').config()
const express = require("express");
const {graphqlHTTP} = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require('mongoose');

const server = express();

mongoose.connect(`mongodb+srv://${process.env.DB-USER}:${process.env.DB-PASS}@noise-controller-be.jiy1o.mongodb.net/${process.env.DB-HOST}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

mongoose.connection.once('open',()=>{
    console.log('Connected to database')
})

server.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

const PORT = process.env.PORT || 4000

server.listen(PORT,() => {
    console.log(`Server is running on PORT# ${PORT}`)
})
