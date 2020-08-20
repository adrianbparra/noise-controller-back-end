const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLInt, 
    GraphQLID, 
    GraphQLSchema
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
        "className": "English",
        "teacherId": "1",
        "theme": "Farm",
        "grade": "2",
        "numberOfKids": 12,
        "streak": 5,
    },
    {
        "id": '2',
        "className": "Spanish",
        "teacherId": "2",
        "theme": "Farm",
        "grade": "3",
        "numberOfKids": 24,
        "streak": 2,
    },
    {
        "id": "3",
        "className": "Math",
        "teacherId": "3",
        "theme": "snake",
        "grade": "kindergarden",
        "numberOfKids": 18,
        "streak": 4,
    },
    {
        "id": "4",
        "className": "Reading",
        "teacherId": "2",
        "theme": "snake",
        "grade": "1",
        "numberOfKids": 16,
        "streak": 2,
    },
    {
        "id": "5",
        "className": "Language",
        "teacherId": "1",
        "theme": "snake",
        "grade": "2",
        "numberOfKids": 12,
        "streak": 4,
    },
    {
        "id": "6",
        "className": "Testing",
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
        className: {type: GraphQLString},
        theme: {type: GraphQLString},
        grade: {type: GraphQLString},
        numberOfKids: {type: GraphQLInt},
        streak: {type:GraphQLInt},
        teacher: {
            type: UserType,
            resolve(parent,args){
                console.log(parent);
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
        theme: {type: GraphQLString}
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        classwithUser: {
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
        }
    }
});



module.exports = new GraphQLSchema({
    query: RootQuery
});