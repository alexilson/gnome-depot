import { Box, Text, Link, Flex } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Header = () => {
    return (
        <Box width='100vw' bg='gray' position="fixed" bg='gnome.300'>
            <Flex justifyContent="space-between" alignItems="center" p={4}>
                <Text textAlign='left' fontSize='50px'>
                    Header
                </Text>
                <Flex>
                    <Link as={RouterLink} to="/signup" mr={4}>
                        Sign Up
                    </Link>
                    <Link as={RouterLink} to="/login" mr={4}>
                        Login
                    </Link>
                    <Link as={RouterLink} to="/">
                        Home
                    </Link>
                </Flex>
            </Flex>
        </Box>
    );        
}

export default Header;
