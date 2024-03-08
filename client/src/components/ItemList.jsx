import React from 'react';
import { Container, Text, Grid, Box } from "@chakra-ui/react";
import { useQuery } from '@apollo/client';
import Item from './Item'; 
import { VIEW_ITEMS } from '../utils/queries'; 

const ItemList = () => {
  const { loading, error, data } = useQuery(VIEW_ITEMS); 
  
  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>Error: {error.message}</div>; 
  }

  if (!data || !data.viewItems) {
    return <div>No data available</div>; 
  }

  return (
    <Container maxW="100%" pb="75px" bg='gnome.200'> 
      <Box display="flex" justifyContent="center">
        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }}
          gap={6}
          p={6} 
        >
          {data.viewItems.map((item, index) => (
            <Item key={index} item={item} />
          ))}
        </Grid>
      </Box>
    </Container>
  );      
}

export default ItemList;
