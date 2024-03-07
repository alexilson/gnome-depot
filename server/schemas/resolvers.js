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
        }
    }
}

module.exports = resolvers;