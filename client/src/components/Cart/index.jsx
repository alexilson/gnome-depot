import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT, VIEW_CART } from '../../utils/queries';
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import { useStoreContext } from '../../utils/GlobalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import icon from '/images/cart.png';
import { Box, Heading, Text, Button, VStack, Center } from '@chakra-ui/react';
import './style.css';

// stripePromise returns a promise with the stripe object as soon as the Stripe package loads
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Cart = () => {
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
  const [viewCart, { cartData }] = useLazyQuery(VIEW_CART);

  // We check to see if there is a data object that exists, if so this means that a checkout session was returned from the backend
  // Then we should redirect to the checkout with a reference to our session id
  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  // If the cart's length or if the dispatch function is updated, check to see if the cart is empty.
  // If so, invoke the getCart method and populate the cart with the existing from the session/
  useEffect(() => {
    async function getCart() {
      console.log("Getting cart from db...")
      const cartDb = await viewCart();
      if (!cartDb) return (<div>Loading Cart...</div>)

      const cart = cartDb.data.viewCart.cart; 

      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price;
    });
    return sum.toFixed(2);
  }

  // When the submit checkout method is invoked, loop through each item in the cart
  // Add each item id to the productIds array and then invoke the getCheckout query passing an object containing the id for all our products
  function submitCheckout() {
    const productIds = state.cart.map((item) => item._id);
    
    getCheckout({
      variables: { products: productIds },
    });

  }

  if (!state.cartOpen) {
    return (
      <div className="cart-closed" onClick={toggleCart}>
        <span role="img" aria-label="trash">
          <img src={icon} alt="cart-icon" /> 
        </span>
      </div>
    );
  }

  return (
    <Box className="cart">
      <Box className="close" onClick={toggleCart}>
        [close]
      </Box>
      <Heading as="h1" p={4}>Shopping Cart</Heading>
      {state.cart.length ? (
        <VStack width='100%' alignItems="center" spacing={4}>
          {state.cart.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}
          <Box m={4}>
            <Text fontWeight="bold">Total: ${calculateTotal()}</Text>

            {Auth.loggedIn() ? (
              <Button onClick={submitCheckout}>Checkout</Button>
            ) : (
              <Text>(log in to check out)</Text>
            )}
          </Box>
        </VStack>
      ) : (
        <Center>
          <Box>
            <img src="images/logincart.jpg" alt="shocked" style={{ width: "350px", height: "350px", marginRight: "5px" }} />
            <Heading as="h1">
              {Auth.loggedIn() ? "You haven't added anything to your cart yet!" : "Please log in to add items to your cart."}
            </Heading>
          </Box>
        </Center>
      )}
    </Box>
  );
};

export default Cart;
