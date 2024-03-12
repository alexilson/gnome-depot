const { User, Item, Order } = require('../models');
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
            console.log("Trying to view orders", context.user)
            return await User.find(context.user ? { _id: context.user._id } : {}).populate("orders")
        },
        viewCart: async (parent, args, context) => {
            console.log("Trying to view cart", context.user)
            return await User.findOne( { _id: context.user._id } ).populate("cart");
        },
        checkout: async (parent, args, context) => {
            console.log("Made it to server checkout")
            console.log(args);
            const url = new URL(context.headers.referer).origin;
            console.log("RETURN URL: ", url);
            //const order = new Order({ products: args.products });
            const line_items = [];
            //const { products } = await order.populate('products');
            
            // TODO: Refactor with Order Object - brining in product ID's from Cart
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

            for (let i = 0; i < products.length; i++) {
                console.log("Processing product:", products[i]);
            
                const product = await stripe.products.create({
                    name: products[i].name,
                    description: products[i].description,
                    images: [`${url}/images/${products[i].image}`]
                });
            
                console.log("Created product:", product);
            
                const price = await stripe.prices.create({
                    product: product.id,
                    unit_amount: products[i].price * 100,
                    currency: 'usd',
                });
            
                console.log("Created price:", price);
            
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
                },
                {
                    new: true
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