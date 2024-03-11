//import { useEffect } from 'react';
//import { useMutation } from '@apollo/client';
import Jumbotron from '../components/Jumbotron';
//import { ADD_ORDER } from '../utils/mutations';
//import { idbPromise } from '../utils/helpers';
import { Box, Flex, Heading, Input, Button, Text } from "@chakra-ui/react"; 

function Success() {
  //const [addOrder] = useMutation(ADD_ORDER);

  // useEffect(() => {
  //   async function saveOrder() {
  //     const cart = await idbPromise('cart', 'get');
  //     const products = cart.map((item) => item._id);

  //     if (products.length) {
  //       const { data } = await addOrder({ variables: { products } });
  //       const productData = data.addOrder.products;

  //       productData.forEach((item) => {
  //         idbPromise('cart', 'delete', item);
  //       });
  //     }

  //     setTimeout(() => {
  //       window.location.assign('/');
  //     }, 3000);
  //   }

  //   saveOrder();
  // }, [addOrder]);

    return (
      <Flex align='center' justify='center' height='100vh'>
        <Jumbotron textAlign='center'>
          <h1>Success!</h1>
          <h2>Thank you for your purchase!</h2>
          <h2>You will now be redirected to the home page</h2>
        </Jumbotron>
      </Flex>
    );
  }

export default Success;
