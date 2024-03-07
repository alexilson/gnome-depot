import React from 'react';
import { Box, Center, Grid, GridItem } from "@chakra-ui/react";
import Product from "../components/Product";
import itemData from "../../../server/seeds/itemData.json";

export default function Homepage() {
  return (
    <Box width="100%">
      <Center height="100vh">
        <Grid
          templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
          gap={4}
          justifyContent="center"
          alignItems="center"
          maxWidth="90vw" // Set maximum width for responsiveness
          padding={4} // Add some padding for aesthetics
        >
          {itemData.map((item, index) => (
            <GridItem key={index}>
              <Product product={item} />
            </GridItem>
          ))}
        </Grid>
      </Center>
    </Box>
  );
}
