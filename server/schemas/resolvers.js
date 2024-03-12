const { User, Item, Order } = require('../models');
require('dotenv').config();
const { signToken, AuthenticationError } = require('../utils/auth');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET);

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
            return await User.find(context.user ? { _id: context.user._id } : {}).populate("orders")
        },
        viewCart: async (parent, args, context) => {
            return await User.findOne( { _id: context.user._id } ).populate("cart");
        },
        checkout: async (parent, args, context) => {
            const url = new URL(context.headers.referer).origin;
            // TODO: implement order tracking
            const line_items = [];

            // find item info based on ID and put in product array
            const getProducts = async (productIds) => {
                let foundProducts = [];
                for (const productId of productIds) {
                    const product = await Item.findById(productId);
                    foundProducts.push(product);
                }
                return foundProducts;
            }
            // assign id's from cart array            
            const productIds = args.products;
            
            // create array of products to be checked out
            const products = await getProducts(productIds);
            
            // strip prep and send
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
            
            // link to stripe
            const session = await stripe.checkout.sessions.create({
              payment_method_types: ['card'],
              line_items,
              mode: 'payment',
              success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
              cancel_url: `${url}/`
            });
            
            // return from stripe
            return { session: session.id };
          }
    },
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
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
            const user = await User.findOneAndUpdate(
                {
                    _id: context.user._id
                },
                {
                    $push: { cart: item }
                },
                {
                    new: true
                }
            ).populate('cart');
            return(user);
        },
        removeFromCart: async (parent, { item }, context) => {
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

            return user;
        },
        clearCart: async (parent, args, context) => {
            console.log("Clearing cart...");
            const user = await User.findOneAndUpdate(
                {
                    _id: context.user._id
                },
                {
                    $set:
                    {
                        'cart': []
                    }
                },
                {
                    new: true
                }
            ).populate('cart');
            console.log(user);
            return user;
        }
        
    }
}

module.exports = resolvers;