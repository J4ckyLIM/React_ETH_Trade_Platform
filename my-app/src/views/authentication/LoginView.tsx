import { Alert, AlertIcon, Button, Card, CardBody, CardHeader, Center, Container, Heading, Input, InputGroup, InputRightElement, VStack } from "@chakra-ui/react"
import { useCallback, useState } from "react";
import { useAuthentication } from "../../hooks";

export const LoginView = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const { login } = useAuthentication();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const handleLogin = useCallback(() => {
    if(email !== '' && password !== '') {
      login({ email, password });
    } else {
      setError('Please enter email and password');
    }
  }, [login, email, password])
  return (
    <Container>
      <Center minWidth='400px'>
        <Card width='100%'>
          <CardHeader>
            <Heading size='md'>Login to access the application</Heading>
          </CardHeader>
          <CardBody>
            <VStack>
              {error && (
                <Alert status='error'>
                  <AlertIcon />
                  {error}
                </Alert>
              )}
              <Input
                pr='4.5rem'
                size='md'
                type='text'
                placeholder='Enter email'
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputGroup size='md'>
                <Input
                  pr='4.5rem'
                  size='md'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Enter password'
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement width='4.5rem'>
                  <Button h='1.75rem' size='sm' onClick={handleClickShowPassword}>
                    {showPassword ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <Button width='100%' onClick={handleLogin}>Login</Button>
            </VStack>
          </CardBody>
        </Card>
      </Center>
    </Container>
  )
}