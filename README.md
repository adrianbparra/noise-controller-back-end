# Noise Controller Back End

Our backend to handle users and to save scores and classes.
This backend was created to handle users to save their scores and classes. I am creating it to learn how to use MongoDB and Graph QL.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.


### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be

```
Clone or Fork Repo

yarn install

add .evn Variables

yarn start server
```

## End Points

### Users

Register
```
mutation{
    register(registerInput:{    
        email: String | Required | Unique
        password: String | Required
        title: String | Required
        lastName: String | Required
        firstName: String
        micSensitivity: Int | Default = 5
        theme: String | Default = "Farm"
    }
    ){}
}

```
Login
```
mutation{
    login(
        email: String | Required
        password: String | Required
    ){}
}
```

## Running the tests

Coming Soon!

### Break down into end to end tests

Explain what these tests test and why

```
Coming Soon!
```

### And coding style tests

Explain what these tests test and why

```
Coming Soon!
```

## Built With

* [Node.js](https://nodejs.org/en/docs/) - Running on Node
* [Apollo Server](https://www.apollographql.com/docs/apollo-server/) - Server Routing
* [GraphQL](https://graphql.org/graphql-js/running-an-express-graphql-server/) - Query Builder
* [MongoDB](http://mongodb.github.io/node-mongodb-native/3.4/quick-start/quick-start/) - Server Database

## Contributing

Please try to contribute if you can. Email me if you would like to contribute.

## Authors

* **Adrian Parra** - *Initial work* - [AdrianbParra](https://github.com/adrianbparra)


## Acknowledgments

* Hat tip to anyone whose code was used