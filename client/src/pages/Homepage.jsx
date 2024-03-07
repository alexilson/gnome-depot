import React from 'react';
import { Box, Text, Container, Grid } from "@chakra-ui/react";
import Item from '../components/Item';
import itemData from '../../../server/seeds/itemData.json'; 
import ItemList from '../components/ItemList'

export default function Homepage() {
  return (
    <Container maxW="100%">
      <Text color="black" fontSize="3xl">Main Page</Text>
      {/* Use a Grid with three columns */}
      <Grid
        templateColumns="repeat(3, 1fr)" // Three columns with equal width
        gap={4} // Space between grid items
        justifyContent="center" // Center align grid items
      >
        {itemData.map((item, index) => (
          <Item key={index} item={item} />
        ))}
      </Grid>
    </Container>
  );      
}
