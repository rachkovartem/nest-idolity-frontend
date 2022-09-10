import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

const typeDefs = gql`
  type User {
    _id: String!

    # User name
    name: String!

    # User email
    email: String!

    # User password
    password: String!
    subscriptions: [User!]!
    subscribers: [User!]!
  }

  type UserOmitPassword {
    _id: String!

    # User name
    name: String!

    # User email
    email: String!
    subscriptions: [User!]!
    subscribers: [User!]!
  }

  type PostContent {
    text: String!
    images: [String!]!
    videos: [String!]!
  }

  type Post {
    _id: String!
    author: User!
    date: [String!]!
    content: PostContent!
  }

  type Query {
    getSubscriptions: [User!]!
    getSubscribers: [User!]!
    login(email: String!, password: String!): UserOmitPassword!
    profile: User!
    refresh: String!
    getMyPosts: [Post!]!
  }

  type Mutation {
    createSubscription(recipientId: String!): String!
    createUser(
      name: String!
      email: String!
      password: String!
    ): UserOmitPassword!
    createPost(text: String!, images: [String!]!, videos: [String!]!): Post!
  }
`;

const apolloClient = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
  typeDefs,
  credentials: "include",
});

export default apolloClient;
