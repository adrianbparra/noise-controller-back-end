const classResolvers = require("./classes");
const userResolvers = require("./users");
const scoresResolvers = require("./scores");

module.exports = {
    Class: {
        highestScore(parent){
            return Math.max(0, ...parent.scores.map(s => s.score))
        }
    },
    Query: {
        ...classResolvers.Query
    },
    Mutation: {
        ...classResolvers.Mutation,
        ...userResolvers.Mutation,
        ...scoresResolvers.Mutation
    }
}