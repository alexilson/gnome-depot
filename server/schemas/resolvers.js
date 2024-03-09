const { User, Item, Order } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
//const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

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
        },
        checkout: async (parent, args, context) => {
            console.log("Made it to server checkout")
            const url = new URL(context.headers.referer).origin;
            console.log("URL: ", url)
            const order = new Order({ products: args.products });
            console.log(order);
            const line_items = [];
            const { products } = await order.populate('products');
            
            for (let i = 0; i < products.length; i++) {
              const product = await stripe.products.create({
                name: products[i].name,
                description: products[i].description,
                images: [`${url}/images/${products[i].image}`]
              });
      
              const price = await stripe.prices.create({
                product: product.id,
                unit_amount: products[i].price * 100,
                currency: 'usd',
              });
      
              line_items.push({
                price: price.id,
                quantity: 1
              });
            }
      
            const session = await stripe.checkout.sessions.create({
              payment_method_types: ['card'],
              line_items,
              mode: 'payment',
              success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
              cancel_url: `${url}/`
            });
      
            return { session: session.id };
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