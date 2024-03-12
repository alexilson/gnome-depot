import { Flex } from "@chakra-ui/react";

function Success() {
  setTimeout(() => {
    window.location.assign('/');
  }, 3000);

  return (
    <Flex bg="gnome.100" align='center' justify='center' height='75vh' direction='column' width='100vw'>
      <h1>Success!</h1>
      <h2>Thank you for your purchase!</h2>
      <h2>You will now be redirected to the home page</h2>
    </Flex>
  );
}

export default Success;
