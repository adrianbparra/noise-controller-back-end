const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLInt, 
    GraphQLID, 
    GraphQLSchema,
    GraphQLNonNull,
    GraphQLList
} = require('graphql');

const _ = require("lodash");

//dummy data 
var users =[
    {
        id:"1",
        username: "adrianbparra",
        firstName: "Adrian",
        lastName: "Parra",
        title: "Mr.",
        micSensitivity: 4,
        theme: "Farm"
    },
    {
        id:"2",
        username: "beautiful",
        firstName: "Esme",
        lastName: "Roman",
        title: "Ms.",
        micSensitivity: 8,
        theme: "Farm"
    },
    {
        id:"3",
        username: "rolly",
        firstName: "Rolando",
        lastName: "Parra",
        title: "Mr.",
        micSensitivity: 4,
        theme: "Snake"
    }
]

var classes = [
    {
        "id": '1',
        "name": "English",
        "teacherId": "1",
        "theme": "Farm",
        "grade": "2",
        "numberOfKids": 12,
        "streak": 5,
    },
    {
        "id": '2',
        "name": "Spanish",
        "teacherId": "2",
        "theme": "Farm",
        "grade": "3",
        "numberOfKids": 24,
        "streak": 2,
    },
    {
        "id": "3",
        "name": "Math",
        "teacherId": "3",
        "theme": "snake",
        "grade": "kindergarden",
        "numberOfKids": 18,
        "streak": 4,
    },
    {
        "id": "4",
        "name": "Reading",
        "teacherId": "2",
        "theme": "snake",
        "grade": "1",
        "numberOfKids": 16,
        "streak": 2,
    },
    {
        "id": "5",
        "name": "Language",
        "teacherId": "1",
        "theme": "snake",
        "grade": "2",
        "numberOfKids": 12,
        "streak": 4,
    },
    {
        "id": "6",
        "name": "Testing",
        "teacherId": "1",
        "theme": "snake",
        "grade": "2",
        "numberOfKids": 18,
        "streak": 4,
    },
]

const ClassesType = new GraphQLObjectType({
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
                return _.find(users,{id: parent.teacherId})
            }
        },
    })
});


const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: {type: GraphQLID},
        username: {type: GraphQLString},
        email: {type: GraphQLString},
        firstName: {type: GraphQLString},
        lastName: {type: GraphQLString},
        title: {type: GraphQLString},
        micSensitivity: {type:GraphQLInt},
        theme: {type: GraphQLString},
        classes: {
            type: new GraphQLList(ClassesType),
            resolve(parent, args){
                return _.filter(classes, {teacherId: parent.id})
            }
        }
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        class: {
            type: ClassesType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return _.find(classes,{id: args.id})
            }
        },
        user: {
            type: UserType,
            args: {id: {type: GraphQLID}},
            resolve(parent,args){
                return _.find(users,{id: args.id});
                //code to get data from db / other source
            }
        },
        classes: {
            type: new GraphQLList(ClassesType),
            resolve(parent,args){
                return classes
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent,args){
                return users
            }
        }
    }
});



module.exports = new GraphQLSchema({
    query: RootQuery
});