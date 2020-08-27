const express = require("express");
const {graphqlHTTP} = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require('mongoose');

const server = express();

const password = "n0153c0ntr0ll3r"
const dbname = "noise-controller"

mongoose.connect(`mongodb+srv://noise-admin:${password}@noise-controller-be.jiy1o.mongodb.net/${dbname}?retryWrites=true&w=majority`, {
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
