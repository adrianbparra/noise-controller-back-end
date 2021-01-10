require('dotenv').config()
// const express = require("express");
// const {graphqlHTTP} = require("express-graphql");
const {ApolloServer } = require("apollo-server");
const mongoose = require('mongoose');

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

// const User = require("./models/user");
// const Class = require("./models/class");
// const Score = require("./models/score");


// const schema = require("./schema/schema");
// const cors = require("cors");
// const session = require("express-session");
// const bodyparser = require("body-parser");





const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => ({ req })
});

const PORT = process.env.PORT || 4000


// const server = express();

//allow cross-origin request

// var corsOption = {
//     origin: 'http://localhost:3000',
//     credentials: true 
// }
// server.use(cors(corsOption))

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

mongoose.connection.once('open',()=>{
    console.log('Connected to database')
})

// server.use(
//     session({
//         name: "quid",
//         secret: process.env.SESSION_SECRET,
//         resave: false,
//         saveUninitialized: true,
//         cookie: {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === "production",
//             maxAge: 1000 * 60 * 60 * 24 * 365
//     }
// }))

// server.use(
//     '/graphql',
//     bodyparser.json(),
//     (req,_,next) => {
//         console.log("session: ",req.session)
//         console.log("id:",req.session.userId)
//         next()
//     },
//     graphqlHTTP(req => ({
//         schema,
//         graphiql: true,
//         context: {
//             req
//         }
//     }))
// );


// server.listen(PORT,() => {
//     console.log(`Server is running on PORT# ${PORT}`)
// })
