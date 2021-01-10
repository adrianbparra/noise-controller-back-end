const { AuthenticationError, UserInputError } = require("apollo-server");

const Class = require("../../models/Class")
const checkAuth = require('../../utils/auth')

const { validateClass } = require("../../utils/validators");

module.exports = {
    Query: {
        async getClasses(){
            try{
                const classes = await Class.find();
                return classes
            } catch (err){
                throw new Error(err)

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
                console.error(error)
                throw new UserInputError("Unable to find Class", {errors: error})
            }

        }
        
    },
    Mutation: {
        async addClass(_, {name, theme, grade, numberOfKids}, context){
            const user = checkAuth(context)

            console.log(user)

            const newClass = new Class({
                name,
                theme,
                grade,
                numberOfKids,
                teacherId: user.id
            })

            const classroom = await newClass.save()

            return classroom
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
                throw new Error(error)
            }
        },
        async editClass(_, classroomData, context){
            const user = checkAuth(context);

            // find class first

            try {
                classroom = await Class.findById( classroomData.classId , function (err, classroom) {
                    console.log(classroom)
                    if (err){

                        throw new Error("Unable to update class", {errors:err})
                    }

                    // TODO: Update only the fields that returned


                });
                
                return classroom
                // // loop over values and only keep onest htat have data
                // console.log(classroomData)

                // if (user.id === classroom.teacherId){

                //     classroom.update(classroomData)
                //     return classroom
                //     // const classroom = await classroom.update({_id: classroomData.classId},{
                //     //     ...classroomData
                //     // })
                //     return classroom
                // } else {
                //     throw new AuthenticationError("Action not allowed");
                // }

            } catch (err) {
                throw new Error("Unable to update class", {errors:err})
                
            }
            // update class

            // return class

        }
    }
}