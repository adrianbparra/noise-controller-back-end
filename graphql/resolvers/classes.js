const { AuthenticationError, UserInputError, ApolloError } = require("apollo-server");

const Class = require("../../models/Class");
const User = require("../../models/User");
const checkAuth = require('../../utils/auth')


module.exports = {
    Query: {
        async getClasses(_, __, context){
            const user = checkAuth(context)
            try{
                const classes = await Class.find({teacherId: user.id});
                return classes
            } catch (err){
                throw new UserInputError("Error searching for classes");

            }
        },
        async getClass(_, {classId}){
            try {

                const classroom = await Class.findById(classId)
                
                if (classroom) {
                    return classroom
                } else {
                    throw new UserInputError("Class not found");
                }
            } catch (error) {
                // console.error(error)
                throw new UserInputError("Unable to find Class", {errors: error})
            }

        },
        async getUserClasses(teacherId){
            try {

                const classrooms = await Class.find(teacherId)
                
                if (classrooms) {
                    return classrooms
                } else {
                    throw new UserInputError("Class not found");
                }
            } catch (error) {
                // console.error(error)
                throw new UserInputError("Unable to find Class", {errors: error})
            }
        }
        
    },
    Mutation: {
        async addClass(_, {name, theme, grade, numberOfKids}, context){
            const user = checkAuth(context)

            try {
                
                const newClass = new Class({
                    name,
                    theme,
                    grade,
                    numberOfKids,
                    teacherId: user.id
                })
    
                const classroom = await newClass.save()

                const updateSelected = await User.updateOne({_id: user.id}, {selectedClassId: classroom.id})
    
                return classroom
            } catch (error) {
                throw new ApolloError("Unable to add Class", {errors: error})
            }

        },
        async deleteClass(_,{classId}, context){
            const user = checkAuth(context)

            try {
                const classroom = await Class.findById(classId);

                if(!classroom){
                    return new UserInputError("No class found")
                }

                if (user.id === classroom.teacherId){
                    await classroom.delete()
                    return 'Class deleted successfully'
                } else {
                    throw new AuthenticationError("Action not allowed");
                }

            } catch (error) {
                throw new ApolloError("Unable to delete class", {errors: error})

            }
        },
        async editClass(_, classroomData, context){
            const user = checkAuth(context);

            // find class first

           

        }
    }
}