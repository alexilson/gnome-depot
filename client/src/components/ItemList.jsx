import React, { useEffect } from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import Item from './Item'; 
import { useQuery } from '@apollo/client';
import { GET_ITEMS } from '../utils/queries'; 
import { idbPromise } from '../utils/helpers';
import spinner from '../assets/spinner.gif';

const ItemList = () => {
  const { loading, data } = useQuery(VIEW_ITEMS); 

  useEffect(() => {
    if (data) {
      const items = data.items;

      items.forEach((item) => {
        idbPromise('items', 'put', item);
      });
    }
  }, [data]);

  return (
    <div className="my-2">
      <h2>Our Items:</h2>
      {loading ? (
        <img src={spinner} alt="loading" />
      ) : (
        <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
          {data &&
            data.items.map((item) => (
              <Item
                key={item._id}
                _id={item._id}
                image={item.image}
                name={item.name}
                description={item.description}
                price={item.price}
                inStock={item.inStock}
              />
            ))}
        </SimpleGrid>
      )}
    </div>
  );
};

export default ItemList;