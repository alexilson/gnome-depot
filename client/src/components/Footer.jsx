import { Box, Image } from "@chakra-ui/react";

const Footer = () => {
    return (
        <Box width="100%" bg="gray" position="fixed" bottom="0" height="0%">
            <Image
                src="/images/grass1.png"
                alt="Footer Image"
                w="100%"
                h="auto"
                position="absolute"
                bottom="0"
                left="0"
                pointerEvents="none" 
            />
        </Box>
    );
}

export default Footer;
