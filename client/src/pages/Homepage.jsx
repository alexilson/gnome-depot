import React from 'react';
import { Container } from "@chakra-ui/react";
import ItemList from '../components/ItemList';
import Cart from "../components/Cart";

export default function Homepage() {
  return (
    <Container padding={0} maxW="100%">
    <ItemList />
    <Cart />
    </Container>
  );      
}
