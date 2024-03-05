import { useState } from 'react';
import { Box, Flex, Heading, Input, Button } from "@chakra-ui/react";

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

function SignUp() {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: ''
  });
  
  const [addUser, {error, data }] = useMutation(ADD_USER);

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

      Auth.login(data.addProfile.token); // Assuming Auth is correctly defined
    } catch (e) {
      console.error(e);
      // Handle error: Display error message to the user
    }
  };

  return (
    <Flex bg='gray.200' align="center" justify="center" minHeight="100vh">
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
          />
          <Input
            placeholder="Email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            mb={4}
          />
          <Input
            placeholder="Password"
            type="password"
            name="password"
            value={formState.password}
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
