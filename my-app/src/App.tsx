import {
  ChakraProvider,
  Box,
  theme,
} from "@chakra-ui/react"
import { MainLayout } from "./components/layouts/MainLayout/MainLayout"

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <MainLayout>{'hello'}</MainLayout>
    </Box>
  </ChakraProvider>
)
