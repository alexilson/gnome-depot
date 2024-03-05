const typeDefs = `

type User {
    _id: ID
    username: String
    email: String
    password: String
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

type Order {
    orderDate: String
    orderStatus: String
    items: [orderItem]
}

type Query {
    me: User
}

type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
}
`

module.exports = typeDefs;