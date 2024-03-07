import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Heading, Text, Button } from '@chakra-ui/react';

const Product = ({ product }) => {
  const cardStyles = {
    backgroundImage: `url(${product.image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '200px', // Set a minimum height for the card to ensure content visibility
    position: 'relative', // Ensure relative positioning for children elements
  };

  return (
    <Card style={cardStyles}>
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
