import { useEffect } from 'react';
import Item from './Item'; 
import { useStoreContext } from '../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../utils/actions';
import { useQuery } from '@apollo/client';
import { VIEW_ITEMS } from '../utils/queries';  // Same as QUERY_PRODUCTS
import { idbPromise } from '../utils/helpers';
// import spinner from '../../assets/spinner.gif';
import { Container, Grid, Box } from "@chakra-ui/react";

const ItemList = () => {
  const [state, dispatch] = useStoreContext();

  const { loading, error, data } = useQuery(VIEW_ITEMS); 

  useEffect(() => {
    if (data) {
      // dispatch({
      //   type: UPDATE_PRODUCTS,
      //   products: data.products,
      // });
      data.viewItems.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    } else if (!loading) {
      idbPromise('products', 'get').then((products) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products,
        });
      });
    }
  }, [data, loading, dispatch]);


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
            templateColumns={{ base: "repeat(1, 2fr)", sm: "repeat(2, 2fr)", md: "repeat(3, 2fr)", lg: "repeat(5, 2fr)", xl: "repeat(6, 2fr)"}}
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
