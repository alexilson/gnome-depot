import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Heading, Input, Button, Text } from "@chakra-ui/react";
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ username: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {

      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.loginUser.token);
    } catch (error) {
      console.error(error);
    }

    // clear form values
    setFormState({
      username: '',
      password: '',
    });
  };

  return (
    <Flex bg='gnome.500'align="center" justify="center" height="75vh" width='100vw'>
      <Box bg='gnome.400' width="400px" p={8} borderWidth={1} borderRadius={8} boxShadow="lg" marginTop="-100px">
        <Heading mb={4}>Login</Heading>
        <form onSubmit={handleFormSubmit}>
          <Input
            placeholder="Username"
            name="username"
            value={formState.username}
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
            Login
          </Button>
          {error && (
            <Text mt={4} color="red.500">
              {error.message}
            </Text>
          )}
          {data && (
            <Text mt={4} color="green.500">
              Success! You may now proceed. <Link to="/">Back to the homepage.</Link>
            </Text>
          )}
        </form>
        <Text mt={4} color="gray.500">
          If you do not have an account, <Link to="/signup">sign up here</Link>.
        </Text>
      </Box>
    </Flex>
  );
}

export default Login;
