const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type User {
    id: ID!
    address: String!
  }

  type Query {
    hello: String
    user(address: String!): User
  }

  type Mutation {
    saveUser(id: ID!, address: String!): User
  }
`);

module.exports = schema;
