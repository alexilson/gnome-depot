import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation loginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      token
      user {
        username
      }
    }
  }
`;

export const ADD_DB_CART = gql`
  mutation Mutation($item: ID!) {
    addToCart(item: $item) {
      cart {
        _id
        name
        description
        image
        price
        inStock
      }
    }
  }
`

export const REMOVE_DB_CART = gql`
  mutation RemoveFromCart($item: ID!) {
    removeFromCart(item: $item) {
      username
      cart {
        _id
        name
        description
        image
        price
        inStock
      }
    }
  }
`
export const CLEAR_DB_CART = gql`
  mutation clearDbCart {
    clearCart {
      cart {
        _id
        name
        description
        image
        price
        inStock
      }
    }
  }
`