require('dotenv').config()
const express = require("express");
const {graphqlHTTP} = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require('mongoose');
const cors = require("cors")

const server = express();

//allow cross-origin request
server.use(cors())

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@noise-controller-be.jiy1o.mongodb.net/${process.env.DB_CLUSTER}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
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
