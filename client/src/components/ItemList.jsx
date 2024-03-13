import Item from './Item';
import { useStoreContext } from '../utils/GlobalState';
import { useQuery } from '@apollo/client';
import { VIEW_ITEMS } from '../utils/queries';  
import { Container, Grid, Box } from "@chakra-ui/react";

const ItemList = () => {
    const [state, dispatch] = useStoreContext();

    const { loading, error, data } = useQuery(VIEW_ITEMS); 

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
        <Container maxW={{ base: "100%", xl: "2560px" }} pb="75px" bg='gnome.200'>
            <Box display="flex" justifyContent="center">
                <Grid
                    templateColumns={{
                        base: "repeat(1, minmax(230px, 1fr))",
                        sm: "repeat(2, minmax(230px, 1fr))",
                        md: "repeat(3, minmax(230px, 1fr))",
                        lg: "repeat(4, minmax(230px, 1fr))",
                        xl: "repeat(6, minmax(230px, 2fr))"
                    }}
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
