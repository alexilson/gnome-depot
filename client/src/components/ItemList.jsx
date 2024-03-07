import { useQuery } from '@apollo/client';
import { VIEW_ITEMS } from '../utils/queries'; 


const ItemList = () => {
  const { loading, data } = useQuery(VIEW_ITEMS); 
  console.log(data);
  return data;
}

export default ItemList;