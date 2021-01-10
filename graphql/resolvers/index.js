const classResolvers = require("./classes");
const userResolvers = require("./users");
const scoresResolvers = require("./scores");

module.exports = {
    Query: {
        ...classResolvers.Query
    },
    Mutation: {
        ...classResolvers.Mutation,
        ...userResolvers.Mutation,
        ...scoresResolvers.Mutation
    }
}