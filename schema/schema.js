const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLInt, 
    GraphQLID, 
    GraphQLSchema,
    GraphQLNonNull,
    GraphQLList,
    GraphQLScalarType
} = require('graphql');

const bcrypt = require('bcrypt');

const Class = require("../models/class.js");
const User = require("../models/user.js");
const Score = require("../models/score.js");

const ScoreType = new GraphQLObjectType({
    name: "Score",
    fields:() =>({
        id: {type: GraphQLID},
        date: {type: GraphQLString},
        theme: {type: GraphQLString},
        score: {type: GraphQLInt},
        streak: {type: GraphQLInt},
        classId: {type: GraphQLID},
        class: {
            type: ClassType,
            resolve(parent,args){
                return Class.findById(parent.classId)
            }
        }
    })
})

const ClassType = new GraphQLObjectType({
    name: "Class",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        theme: {type: GraphQLString},
        grade: {type: GraphQLString},
        numberOfKids: {type: GraphQLInt},
        streak: {type:GraphQLInt},
        teacherId: {type: GraphQLID},
        teacher: {
            type: UserType,
            resolve(parent,args){
                // return _.find(users,{id: parent.teacherId})
                return User.findById(parent.teacherId)
            }
        },
        scores: {
            type: new GraphQLList(ScoreType),
            resolve(parent,args){
                // return all scores for class
                return Score.find({classId: parent.id})
            }
        }
    })
});


const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: {type: GraphQLID},
        email: {type: GraphQLString},
        password: {type: GraphQLString},
        firstName: {type: GraphQLString},
        lastName: {type: GraphQLString},
        title: {type: GraphQLString},
        micSensitivity: {type:GraphQLInt},
        theme: {type: GraphQLString},
        classes: {
            type: new GraphQLList(ClassType),
            resolve(parent, args){
                // return _.filter(classes, {teacherId: parent.id})
                return Class.find({teacherId: parent.id})
            }
        }
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        score: {
            type: ScoreType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return Score.findById(args.id)
            }
        },
        scores:{
            type: ScoreType,
            resolve(parent, args){
                return Score.find({})
            }
        },
        scoresByClass:{
            type: ScoreType,
            args: {classId: {type: GraphQLID}},
            resolve(parent,args){
                return Score.find({classId: args.classId})
            }
        },
        class: {
            type: ClassType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                // return _.find(classes,{id: args.id})
                return Class.findById(args.id)
            }
        },
        classes: {
            type: new GraphQLList(ClassType),
            resolve(parent,args){
                // return classes
                return Class.find({})
            }
        },
        user: {
            type: UserType,
            args: {id: {type: GraphQLID}},
            resolve(parent,args,{req}){
                // return _.find(users,{id: args.id});
                //code to get data from db / other source
                if(!req.session.userId) throw new Error("No Credentials, Please Sign In")
                
                return User.findById(args.id)
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent,args){
                // return users
                return User.find({})
            }
        },
        login: {
            type: UserType,
            args: {
                email: {type: new GraphQLNonNull(GraphQLString)},
                password: {type: new GraphQLNonNull(GraphQLString)}
            },
            async resolve(parent,args, {req}){
                const userInfo = await User.findOne({email: args.email})

                if(!userInfo) throw new Error("No user found with that email")

                const valid_pass = await bcrypt.compareSync(args.password, userInfo.password)
                
                if(!valid_pass) throw new Error("Incorrect credentials")

                req.session.userId = userInfo.id

                return userInfo
            }
        }
    }
});

const Mutations = new GraphQLObjectType({
    name: "Mutation",
    fields:{
        addUser: {
            type: UserType,
            args: {
                email: {type: GraphQLString},
                password: {type: GraphQLString},
                firstName: {type: GraphQLString},
                lastName: {type: GraphQLString},
                title: {type: GraphQLString},
                micSensitivity: {type:GraphQLInt},
                theme: {type: GraphQLString},
            },
            async resolve(parent,args){
                
                const hashpassword = await bcrypt.hashSync(args.password, 12)

                let user = new User({
                    email: args.email,
                    password: hashpassword,
                    firstName: args.firstName,
                    lastName: args.lastName,
                    title: args.title,
                    micSensitivity: args.micSensitivity,
                    theme: args.theme
                })

                return user.save();
            }
        },
        addClass: {
            type: ClassType,
            args: {
                name: {type: GraphQLString},
                theme: {type: GraphQLString},
                grade: {type: GraphQLString},
                numberOfKids: {type: GraphQLInt},
                streak: {type:GraphQLInt},
                teacherId: {type: GraphQLID},
            },
            resolve(parent, args){
                let newClass = new Class({
                    name: args.name,
                    theme: args.theme,
                    grade: args.grade,
                    numberOfKids: args.numberOfKids,
                    streak: args.streak,
                    teacherId: args.teacherId
                });

                return newClass.save();
            }
        },
        addScore: {
            type: ScoreType,
            args: {
                date: {type: new GraphQLNonNull(GraphQLString)},
                theme: {type: GraphQLString},
                score: {type: new GraphQLNonNull(GraphQLInt)},
                streak: {type: GraphQLInt},
                classId:{type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent,args){

                let newScore = new Score({
                    date: args.date,
                    theme: args.theme,
                    score: args.score,
                    streak: args.streak,
                    classId: args.classId
                })

                return newScore.save()
            }
        },

    }
})


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutations
});

