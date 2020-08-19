const express = require("express");
const express_graphql = require("express-graphql");
const {buildSchema} = require("graphql");

//GraphQl Schema

const schema = buildSchema(`
    type Query {
        message: String
    }
`);