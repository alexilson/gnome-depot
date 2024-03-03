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

type Order {
    orderDate: String
    orderStatus: String
    items: [orderItem]
}

type Query {
    me: User
}
`

module.exports = typeDefs;