import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Heading, Text, Button } from '@chakra-ui/react';

const Product = ({ product }) => {
  return (
    <Card>
      <CardHeader>
        <Heading size='md'>{product.name}</Heading>
      </CardHeader>
      <CardBody>
        <Text>{product.description}</Text>
      </CardBody>
      <CardFooter>
        <Button variant='ghost' colorScheme='blue'>
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Product;