const { AuthenticationError, UserInputError, ApolloError } = require("apollo-server");

const Class = require("../../models/class.js");
const checkAuth = require("../../utils/auth.js");


module.exports = {
    Mutation: {
        async addScore(_, { classId, theme, score}, context){
            const user = checkAuth(context)
            
            classroom = await Class.findById(classId);
            
            if (classroom){
                console.log(user.id === classroom.teacherId)
                
                if (user.id === classroom.teacherId){
                    
                    classroom.scores.unshift({
                        theme,
                        score,
                        createdAt: new Date().toISOString()
                    })
                    await classroom.save()

                    return classroom

                } else {
                    throw new AuthenticationError("User not allowed to add score");
                }

            } else {

                throw new UserInputError("Unable to add score")

            }

            
        },
        async deleteScore(_,{classId, scoreId},context){

            const user = checkAuth(context);

            const classroom = await Class.findById(classId);
            
            if (classroom){
    
                if (classroom.teacherId === user.id){

                    const scoreIndex = classroom.scores.findIndex(s => s.id === scoreId);

                    console.log(scoreIndex)

                    if (scoreIndex < 0){
                        throw new UserInputError("Unable to find score")
                    }

                    classroom.scores.splice(scoreIndex, 1);

                    await classroom.save();
                    
                    return classroom
    
                } else {
                    throw new AuthenticationError("User not allowed to delete score");
                }

            } else {
                throw new ApolloError("Unable to delete score")
            }

            
        }
    }
}