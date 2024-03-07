import { Box, Image, Badge } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { useQuery } from '@apollo/client';
import { VIEW_ITEMS } from '../utils/queries'; 


function Item( { item }) {
  const { loading, data } = useQuery(VIEW_ITEMS); 
  console.log(data);
  
  return (
    <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
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
          <Box as='span' color='gray.600' fontSize='sm'>
          </Box>
        </Box>

        {/* <Box display='flex' mt='2' alignItems='center'>
          {Array(5)
            .fill('')
            .map((_, i) => (
              <StarIcon
                key={i}
                color={i < property.rating ? 'teal.500' : 'gray.300'}
              />
            ))}
          <Box as='span' ml='2' color='gray.600' fontSize='sm'>
            {property.reviewCount} reviews
          </Box>
        </Box> */}
      </Box>
    </Box>
  )
}

export default Item;