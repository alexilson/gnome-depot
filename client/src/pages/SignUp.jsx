import { useState } from 'react';
import { Box, Flex, Heading, Input, Button } from "@chakra-ui/react";

function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
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
      password: '',
      confirmPassword: ''
    });
  };

  return (
    <Flex bg='gnome.500' align="center" justify="center" minHeight="100vh" width='100vw'>
      <Box
        bg='gnome.400'
        width="100%"
        maxWidth="400px"
        p={8}
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        margin="auto" // Center the box horizontally and vertically
      >
        <Heading mb={4}>Sign Up</Heading>
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
            mb={4}
          />
          <Input
            placeholder="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            mb={6}
          />
          <Button colorScheme="blue" type="submit" width="100%">
            Sign Up
          </Button>
        </form>
      </Box>
    </Flex>
  );
}

export default SignUp;
