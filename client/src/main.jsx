import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

import App from './App.jsx'
import Home from './pages/Homepage.jsx';
import SignUp from './pages/SignUp.jsx';
import Login from './pages/Login.jsx';

import './index.css'


const colors = {
  gnome: {
    100: '#57A16E', // Jade
    200: '#50514F', // Davy's Gray
    300: '#EC4E20', // Flame
    400: '#FFFCFF', // Snow
    500: '#247BA0', // Cerulean
  },
  fonts: 'Georgia, serif',
  body: 'Montserrat, sans-serif'
}

const theme = extendTheme({ colors })

// Define the accessible routes, and which components respond to which URL
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/SignUp',
        element: <SignUp />,
      },
      {
        path: '/Login',
        element: <Login />,
      },
    ],
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
  </ChakraProvider>
);