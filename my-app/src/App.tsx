import {
  ChakraProvider,
  Box,
  theme,
} from "@chakra-ui/react"
import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import { routes } from "./router";

export const App = () => {
  const elements = useRoutes(routes);
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Suspense>{elements}</Suspense>
      </Box>
    </ChakraProvider>
  )
}
