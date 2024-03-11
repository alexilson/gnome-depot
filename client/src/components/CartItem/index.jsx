import { useStoreContext } from "../../utils/GlobalState";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import { useQuery, useMutation } from '@apollo/client';
import { REMOVE_DB_CART } from "../../utils/mutations";

import { Flex, Image, Box, Text, Input, IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

const CartItem = ({ item }) => {

  const [, dispatch] = useStoreContext();

  const [removeDbCart, {error}] = useMutation(REMOVE_DB_CART);

  const removeFromCart = async (item) => {

    const user = await removeDbCart({
      variables: { item: item._id }
    });

    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id
    });
    idbPromise('cart', 'delete', { ...item });

  };

  const onChange = (e) => {
    const value = e.target.value;
    if (value === '0') {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id
      });
      idbPromise('cart', 'delete', { ...item });

    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        purchaseQuantity: parseInt(value)
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });

    }
  }

  return (
    <Flex alignItems="center" width="100%">
    <Box display="inline-block">
      <Image src={item.image} alt="cart item  pic" />
    </Box>
    <Box width="100%" ml={4} display="inline-block">
      <Text>{item.name}, ${item.price}</Text>
      <Flex alignItems="center">
        <Text>Qty:</Text>
        <Input
          type="number"
          placeholder="1"
          value={item.purchaseQuantity}
          onChange={onChange}
          ml={2}
        />
        <IconButton
          icon={<DeleteIcon />}
          aria-label="Delete"
          onClick={() => removeFromCart(item)}
          ml={2}
        />
      </Flex>
    </Box>
  </Flex>
  );
}

export default CartItem;
