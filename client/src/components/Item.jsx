import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Heading, Text, Button } from '@chakra-ui/react';

const Item = ({ item }) => {
  return (
    <Card>
      <CardHeader>
        <Heading size='md'>{item.name}</Heading>
      </CardHeader>
      <CardBody>
        <Text>{item.description}</Text>
      </CardBody>
      <CardFooter>
        <Button variant='ghost' colorScheme='blue'>
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Item;