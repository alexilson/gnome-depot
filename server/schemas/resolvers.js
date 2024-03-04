const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id });
            }
            throw AuthenticationError;
        }
    },
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
                const user = await User.create({ username, email, password });
                const token = await signToken(user);
                return { token, user };
        }
    }
}

module.exports = resolvers;