import {
  ChakraProvider,
  Box,
  theme,
} from "@chakra-ui/react"
import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import { routes } from "./router";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthenticationProvider, Web3Provider } from "./contexts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const App = () => {
  const elements = useRoutes(routes);
  const queryClient = new QueryClient();

  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Box textAlign="center" fontSize="xl">
          <AuthenticationProvider>
            <Web3Provider>
              <Suspense>{elements}</Suspense>
            </Web3Provider>
          </AuthenticationProvider>
        </Box>
      </QueryClientProvider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </ChakraProvider>
  )
}
