import { gql } from '@apollo/client';

export const VIEW_ITEMS = gql`
query viewItems($viewItemsId: ID) {
  viewItems(id: $viewItemsId) {
    _id
    name
    description
    image
    price
    inStock
  }
}
`
export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;

export const VIEW_CART = gql`
  query viewCart {
    viewCart {
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