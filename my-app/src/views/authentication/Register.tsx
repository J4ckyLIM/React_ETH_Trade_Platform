import { Alert, AlertIcon, Button, Card, CardBody, CardHeader, Center, Container, Heading, Input, InputGroup, InputRightElement, VStack } from "@chakra-ui/react"
import { FC, useCallback, useState } from "react";
import { toast } from "react-toastify";
import { useCreateUser } from "../../api/users";

interface RegisterViewProps {
  onSuccessCreation: () => void;
}

export const RegisterView: FC<RegisterViewProps> = ({ onSuccessCreation }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const { createUser } = useCreateUser();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const handleSuccess = useCallback(() => {
    onSuccessCreation();
    toast('Your have successfully created an account', { type: 'success' })
  }, [onSuccessCreation]);

  const handleOnFailure = () => {
    toast('There was an error creating your account', { type: 'error' })
  }

  const handleLogin = useCallback(() => {
    console.log(email, password, confirmPassword)
    if(password !== confirmPassword) {
      setError('Passwords do not match');
    }
    if(email !== '' && password !== '') {
      createUser({ email, password, onSuccess: handleSuccess, onError: handleOnFailure });
    } else {
      setError('Please enter email and password');
    }
  }, [createUser, email, password, setError, handleSuccess, confirmPassword])

  return (
    <Container>
      <Center minWidth='400px'>
        <Card width='100%'>
          <CardHeader>
            <Heading size='md'>Register to access the application</Heading>
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
              <InputGroup size='md'>
                <Input
                  pr='4.5rem'
                  size='md'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Enter confirm password'
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <InputRightElement width='4.5rem'>
                  <Button h='1.75rem' size='sm' onClick={handleClickShowPassword}>
                    {showPassword ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <Button width='100%' onClick={handleLogin}>Register</Button>
            </VStack>
          </CardBody>
        </Card>
      </Center>
    </Container>
  )
}