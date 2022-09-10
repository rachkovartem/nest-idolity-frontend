import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation CreateUser($name: String!, $email: String!, $password: String!) {
    createUser(name: $name, email: $email, password: $password) {
      _id
    }
  }
`;
