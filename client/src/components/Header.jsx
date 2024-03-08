import React from 'react';
import { Box, Link, Flex } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import headerGif from '/images/Gnome-Depot.gif'; // Assuming header.gif is in the same directory as this component
import mascot from '/images/mascot.png'
import mascot2 from '/images/mascot2.png'

const Header = () => {
    return (
        <Box width='100vw' bg='gnome.300'>
            <Flex justifyContent="center" alignItems="center" height="100%">
                <img src={mascot} alt="Header GIF" style={{ maxWidth: "100%", height: "200px" }} /> 
                <img src={headerGif} alt="Header GIF" style={{ maxWidth: "100%", height: "200px" }} /> 
                <img src={mascot2} alt="Header GIF" style={{ maxWidth: "100%", height: "200px" }} /> 
            </Flex>
            <Box width='100vw' bg='gnome.500' p={4}>
                <Flex justifyContent="center" >
                    <Link as={RouterLink} to="/signup" mr={4}>
                        Sign Up
                    </Link>
                    <Link as={RouterLink} to="/login" mr={4}>
                        Login
                    </Link>
                </Flex>
            </Box>
        </Box>
    );        
}

export default Header;
