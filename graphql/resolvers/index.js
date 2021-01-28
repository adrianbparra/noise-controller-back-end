const { ApolloError } = require("apollo-server");

const classResolvers = require("./classes");
const userResolvers = require("./users");
const scoresResolvers = require("./scores");

const Class = require("../../models/Class")


module.exports = {
    Class: {
        highestScore(parent){
            return Math.max(0, ...parent.scores.map(s => s.score))
        }
    },
    User: {

        async classes(parent){
            try {

                const classes = await Class.find({teacherId: parent._id}) 
                return classes  
                
            } catch (error) {
                ApolloError("Unable to get User classes", {errors : error})
            }
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