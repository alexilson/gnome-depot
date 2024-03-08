import { Box, Image, Badge, Button } from '@chakra-ui/react';
import { useStoreContext } from "../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../utils/actions";
import { StarIcon } from '@chakra-ui/icons';
import { useQuery } from '@apollo/client';
import { VIEW_ITEMS } from '../utils/queries'; 

function Item({ item }) {
  const [state, dispatch] = useStoreContext();

  const {
    image,
    name,
    _id,
    price,
    quantity
  } = item;

  const { cart } = state;

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 }
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  };

  return (
    <Box maxW='sm' borderWidth='1px' borderRadius='lg' bg='gnome.400' overflow='hidden'>
      <Image src={item.image} alt={item.name} />

      <Box p='6'>
        <Box display='flex' alignItems='baseline'>
          <Badge borderRadius='full' px='2' colorScheme='teal'>
            New
          </Badge>
          
          <Box
            color='black'
            fontWeight='bold'
            letterSpacing='wide'
            fontSize='xl'
            ml='2'
          >
            {item.name}
          </Box>
        </Box>
        
        <Box
          mt='1'
          fontWeight='semibold'
          as='h3'
          lineHeight='tight'
        >
          {item.description}
        </Box>

        <Box>
          ${item.price}
          <Box as='span' color='gray.600' fontSize='sm'></Box>
        </Box>

        <Button onClick={addToCart} colorScheme="blue">
          Add to Cart
        </Button>
      </Box>
    </Box>
  );
}

export default Item;
