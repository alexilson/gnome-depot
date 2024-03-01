import { useState } from 'react';
import { Box, Flex, Heading, Input, Button } from "@chakra-ui/react";

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission here, for example, send the data to your backend
    console.log(formData);
    // Reset form fields after submission
    setFormData({
      email: '',
      password: ''
    });
  };

  return (
    <Flex bg='gnome.500' align="center" justify="center" minHeight="100vh" width='100vw'>
      <Box bg='gnome.400' width="400px" p={8} borderWidth={1} borderRadius={8} boxShadow="lg">
        <Heading mb={4}>Login</Heading>
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            mb={4}
          />
          <Input
            placeholder="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            mb={6}
          />
          <Button colorScheme="blue" type="submit" width="100%">
            Login
          </Button>
        </form>
      </Box>
    </Flex>
  );
}

export default Login;
