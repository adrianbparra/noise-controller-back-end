const express = require("express");
const {graphqlHTTP} = require("express-graphql");
const schema = require("./schema/schema");

const server = express();


server.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

const PORT = process.env.PORT || 4000

server.listen(PORT,() => {
    console.log(`Server is running on PORT# ${PORT}`)
})
