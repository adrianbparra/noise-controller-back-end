const { ApolloError } = require("apollo-server");

const classResolvers = require("./classes.js");
const userResolvers = require("./users.js");
const scoresResolvers = require("./scores.js");

const Class = require("../../models/class.js")


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
        },
        async selectedClass(parent){
            const {selectedClassId} = parent;

            try {
                if (selectedClassId){
                    const selected = await Class.findById(selectedClassId)

                    return selected

                } else{
                    return null
                }
            } catch (error) {
                ApolloError("Unable to get selected class", {errors : error})
                
            }
        },
        async theme(parent){
            const {selectedClassId} = parent;

            try {
                if (selectedClassId){
                    const selected = await Class.findById(selectedClassId)

                    return selected.theme

                } else {
                    return "Farm"
                }
            } catch (error) {
                ApolloError("Unable to get Theme", {errors : error})
                
            }
        }
    },
    Query: {
        ...classResolvers.Query,
        ...userResolvers.Query
    },
    Mutation: {
        ...classResolvers.Mutation,
        ...userResolvers.Mutation,
        ...scoresResolvers.Mutation
    }
}