const {gql} = require("apollo-server")


module.exports = gql`
    # What is returned
    type Class{
        id: ID!
        name: String!
        theme: String!
        grade: String!
        numberOfKids: Int!
        teacherId: String!
        scores: [Score!]
        highestScore: Int!
    }
    type Score{
        id: ID!
        createdAt: String!
        theme: String!
        score: Int!
    }
    type User{
        id: ID!
        email: String!
        password: String!
        firstName: String!
        lastName: String
        title: String!
        micSensitivity: Int!
        theme: String
        createdAt: String!
        token: String!
        classes: [Class!]
        selectedClass: Class
    }
    # Input variables
    input RegisterInput{
        email: String!
        password: String!
        firstName: String
        lastName: String!
        title: String!
        micSensitivity: Int
    }
    # Queries
    type Query{
        getClasses: [Class]
        getClass(classId: ID!): Class!
        getUserClasses(teacherId: ID!): [Class]
        getUser: User!
    }

    type DeleteMessage {
        message: String!
        user: String!
    }
    # Mutations
    type Mutation{
        # (what is required) : What is returned
        register(registerInput: RegisterInput): User!
        login(email: String!, password: String!): User!
        updateUser(email: String, password: String, firstName: String, lastName: String, title: String, micSensitivity: Int, selectedClassId: String): User!
        deleteUser: DeleteMessage!

        addClass(name: String!, theme: String, grade: String!, numberOfKids: Int!): Class! 
        editClass(classId:ID!, name: String, theme: String, grade: String, numberOfKids: Int) :Class!
        deleteClass(classId: ID!): String!

        addScore(classId: ID!, theme: String!, score: Int! ): Class!
        deleteScore(classId: ID!, scoreId: ID!): Class!
    }
`

