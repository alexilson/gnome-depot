import { Box, Image, Badge, Button } from '@chakra-ui/react';
import { useStoreContext } from "../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../utils/actions";
import { useMutation } from '@apollo/client';
import { ADD_DB_CART } from "../utils/mutations";

function Item({ item }) {
  const [state, dispatch] = useStoreContext();
  const [addDbCart] = useMutation(ADD_DB_CART);

  const {
    name,
    _id,
    price,
  } = item;

  const { cart } = state;

  const addToCart = async () => {
    const cartDb = await addDbCart({ variables: { item: _id } });
    console.log(cartDb);
    
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 }
      });
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
        <Box mt='1' pb='3' fontWeight='semibold' as='h3' lineHeight='tight'>
          {item.description}
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Button onClick={addToCart} colorScheme="blue">
            Add to Cart
          </Button>
          <Box as="span" color="gnome.600" fontSize="xl" fontWeight='bold'>
            ${item.price.toFixed(2)}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Item;
