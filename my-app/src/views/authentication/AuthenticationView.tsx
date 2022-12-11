import { Center, Container, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import { useCallback, useState } from "react"
import { LoginView } from "./LoginView"
import { RegisterView } from "./Register"

export const AuthenticationView = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);

  const handleTabsChange = useCallback((index: number) => {
    setTabIndex(index)
  }, [setTabIndex]);
  
  return (
    <Container>
      <Center height={'100vh'}>
        <Tabs index={tabIndex} onChange={handleTabsChange}>
          <TabList>
            <Tab>Login</Tab>
            <Tab>Register</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <LoginView />
            </TabPanel>
            <TabPanel>
              <RegisterView onSuccessCreation={() => handleTabsChange(0)}/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Center>
    </Container>
  )
}