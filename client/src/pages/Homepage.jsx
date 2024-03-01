import { Box, Text, Center } from "@chakra-ui/react";

export default function Homepage() {
  return (
    <Box bg='gnome.100' height='100%' width='100vw'>
      <Text>
        Home
      </Text>
      <Center height="calc(100vh - 1.5rem)"> 
        <img src="../src/assets/icon.jpg" alt="Your Image" style={{ width: "500px", height: "500px" }} />
      </Center>
    </Box>
  );      
}
