import { useState } from 'react';
import { Box, Flex, Heading, Input, Button, Text, Link } from "@chakra-ui/react";

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

function SignUp() {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      // Ensure data exists before accessing it
      if (data && data.addUser && data.addUser.token) {
        console.log(data.addUser.token);
        Auth.login(data.addUser.token); 
      } else {
        throw new Error('Failed to fetch token from response.');
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Flex 
     bg='gnome.100'
      align="center" 
      justify="center" 
      minHeight="75vh" 
      width='100vw'>
      <Box
        bg='white'
        width="100%"
        maxWidth="400px"
        p={8}
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
      >
        <Heading mb={4}>Sign Up</Heading>
        <form onSubmit={handleFormSubmit}>
          <Input
            placeholder="Username"
            name="username"
            value={formState.username}
            onChange={handleChange}
            mb={4}
            required // Add required attribute for form validation
          />
          <Input
            placeholder="Email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            mb={4}
            type="email" // Set input type to email for browser validation
            required // Add required attribute for form validation
          />
          <Input
            placeholder="Password"
            type="password"
            name="password"
            value={formState.password}
            onChange={handleChange}
            mb={6}
            required // Add required attribute for form validation
          />
          <Button colorScheme="blue" type="submit" width="100%">
            Sign Up
          </Button>
          <Text mt={4} color="gray.500">
          If you already have an account go to login page.
        </Text>
        </form>
        {error && <Text color="red.500">Error: {error.message}</Text>}
        {data && (
          <Text color="green.500">
            Success! You may now head back to the homepage.
          </Text>
        )}
      </Box>
    </Flex>
  );
}

export default SignUp;
