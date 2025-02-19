const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");
const cors = require("cors");

const users = [];

const root = {
  hello: () => "Hello, world!",
  saveUser: ({ id, address }) => {
    const newUser = { id, address };
    users.push(newUser);
    return newUser;
  },
  user: ({ address }) => {
    return users.find((user) => user.address === address);
  },
};

const app = express();
app.use(cors()); // Enable CORS globally

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("GraphQL server running at http://localhost:4000/graphql");
});
