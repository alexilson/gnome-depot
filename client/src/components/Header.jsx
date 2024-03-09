import React from 'react';
import { Box, Link, Flex, Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import Auth from '../utils/auth';
import headerGif from '/images/Gnome-Depot.gif';
import mascot from '/images/mascot.png';
import mascot2 from '/images/mascot2.png';

const Header = () => {
    return (
        <>
            <Box bg='gnome.300' px={[4, 6]} py={[4, 8]} textAlign="center" position="relative">
                <Flex justifyContent="center" alignItems="center" flexDirection={['column', 'row']}>
                    <img src={mascot} alt="Header GIF" style={{ maxWidth: "100%", height: "200px", marginBottom: [3, 0] }} />
                    <img src={headerGif} alt="Header GIF" style={{ maxWidth: "100%", height: "200px", margin: [3, 4] }} />
                    <img src={mascot2} alt="Header GIF" style={{ maxWidth: "100%", height: "200px", marginTop: [3, 0] }} />
                    {Auth.loggedIn() ? (
                        <Box position="absolute" bottom="1%" right="0%">
                             <Link onClick={Auth.logout} mr={4} color='white' fontSize='xl' fontWeight="bold">
                        Logout
                      </Link>
                        </Box>
                       
                    ) : (
                        <Box position="absolute" bottom="1%" right="1%">
                            <Link as={RouterLink} to="/login" color='white' fontSize='xl' fontWeight="bold">
                                Login
                            </Link>
                        </Box>
                    )}
                </Flex>
            </Box>
        </>
    );
}

export default Header;
