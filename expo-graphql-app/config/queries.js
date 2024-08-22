import { gql } from "@apollo/client";

export const ADD_PRODUCT = gql`
  mutation AddProduct($name: String!, $price: Int!, $quantity: Int!) {
    addProduct(name: $name, price: $price, quantity: $quantity) {
      _id
      name
      price
    }
  }
`;

export const GET_PRODUCTS = gql`
  query GetProducts {
    getProducts {
      _id
      name
      price
      quantity
      createdAt
      authorId
      author {
        _id
        username
        email
      }
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query GetProductById($productId: ID) {
    getProductById(productId: $productId) {
      _id
      name
      price
      quantity
      createdAt
      comments
      likes
      authorId
      author {
        _id
        username
        email
        password
      }
      images {
        url
        createdAt
      }
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      username
      token
    }
  }
`;
