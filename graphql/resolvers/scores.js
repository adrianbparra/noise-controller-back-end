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
                        throw new AuthenticationError("User not allowed to add score");
                    }

                } else {

                    throw new UserInputError("Unable to add score")

                }
            } catch (error) {
                throw new ApolloError("Unable to add score",{errors:error})

            }
            
        },
        async deleteScore(_,{classId, scoreId},context){

            const user = checkAuth(context);

           try {
               
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
                   throw new UserInputError("Unable to delete score")
               }
           } catch (error) {
               throw new ApolloError("Unable to delete score", {errors: error})
           }
            
        }
    }
}