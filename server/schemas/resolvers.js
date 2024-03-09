const { User, Item } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id });
            }
            throw AuthenticationError;
        },
        viewItems: async (parent, { id }) => {
                return await Item.find(id ? {_id: id} : {});
        },
        viewOrders: async (parent, args, context) => {
            console.log("Trying to view orders", context.user)
            return await User.find(context.user ? { _id: context.user._id } : {}).populate("orders")
        }
    },
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
                console.log("MADE IT TO SERVER MUTATION")
                const user = await User.create({ username, email, password });
                const token = await signToken(user);
                return { token, user };
        },
        loginUser: async (parent, { username, password }) => {
            const user = await User.findOne({ username })

            if (!user || !(await user.isCorrectPassword(password))) {
                throw AuthenticationError;
            }

            const token = await signToken(user)
            return { token, user }
        },
        addToCart: async (parent, { item }, context) => {
            console.log("Adding to cart...");
            console.log(item)
            console.log("User id:", context.user._id)
            const user = await User.findOneAndUpdate(
                {
                    _id: context.user._id
                },
                {
                    $push: { cart: item }
                }
            ).populate('cart');
            console.log(user);
            return(user);
        },
        removeFromCart: async (parent, { item }, context) => {
            console.log("Removing from cart...");
            console.log(item)
            console.log("User id:", context.user._id)
            const user = await User.findOneAndUpdate(
                {
                    _id: context.user._id
                },
                {
                    $pull: 
                        {
                            'cart': item
                        }
                },
                {
                    new: true
                }
            )
            .populate('cart');
            console.log(user)
            return user;
        }
    }
}

module.exports = resolvers;