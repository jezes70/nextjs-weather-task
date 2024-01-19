export const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
    hashedPassword: String
  }
  type City{
    id: ID!
    name: String!
  }
  type Query {
    users: [User]
    getcities(email: String!):[City]
  }

  type Mutation {
    signup(name: String!,email:String!,password: String!,confirmPassword:String!): User
    signin(email: String!, password: String!): User
    addcity(name: String!, email: String!):City
  }
`;
