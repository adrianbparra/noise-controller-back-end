const { AuthenticationError, UserInputError, ApolloError } = require("apollo-server");

const Class = require("../../models/Class")

const checkAuth = require('../../utils/auth')


module.exports = {
    Mutation: {
        async addScore(_, { classId, theme, score}, context){
            const user = checkAuth(context)
            
            try {
                classroom = await Class.findById(classId);
            
                if (classroom){

                    if (user.id === classroom.teacherId){

                        classroom.scores.unshift({
                            theme,
                            score,
                            createdAt: new Date().toISOString()
                        })
                        await classroom.save()

                        return classroom

                    } else {
                        throw new AuthenticationError("Action not allowed");
                    }

                }
            } catch (error) {
                throw new UserInputError("Class not found", {errors: error})

            }
            
        }
    }
}