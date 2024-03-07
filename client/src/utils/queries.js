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