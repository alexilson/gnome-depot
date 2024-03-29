const typeDefs = `

type User {
    _id: ID
    username: String
    email: String
    orders: [Order]
    cart: [Item]
}

type Item {
    _id: ID
    name: String
    description: String
    image: String
    price: Float
    inStock: Boolean
}

type orderItem {
    itemId: ID
    price: Float
}

type Auth {
    token: String
    user: User
}

type Checkout {
    session: ID
  }

type Order {
    orderDate: String
    orderStatus: String
    items: [orderItem]
}

type Query {
    me: User
    viewItems(id: ID): [Item]
    viewOrders: [User]
    viewCart: User
    checkout(products: [ID]!): Checkout
}

type Mutation {
    addUser(username: String, email: String, password: String): Auth
    addOrder(products: [ID]!): Order
    loginUser(username: String!, password: String!): Auth
    addToCart(item: ID!): User
    removeFromCart(item: ID!): User
    clearCart: User
}
`

module.exports = typeDefs;