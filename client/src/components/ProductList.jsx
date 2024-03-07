import React, { useState, useEffect } from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import Product from '../components/Product'; // Adjust the path based on your project structure

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch product data from your MongoDB database
    //GraphQL query here
    
    fetch('/api/products') // Replace with your actual API endpoint
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []); 

  return (
    <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
      {products.map((product) => (
        <Product key={product._id} product={product} />
      ))}
    </SimpleGrid>
  );
};

export default ProductList;