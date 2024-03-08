import React from 'react';
import { Container } from "@chakra-ui/react";
import ItemList from '../components/ItemList';

export default function Homepage() {
  return (
    <Container maxW="100%">
      <ItemList />
    </Container>
  );      
}
