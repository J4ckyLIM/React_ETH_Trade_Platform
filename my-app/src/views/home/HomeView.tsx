import { Box, Button, Text, VStack } from "@chakra-ui/react"
import { FC, useCallback } from "react"
import { toast } from "react-toastify"
import { useCreateWallet } from "../../api/users"
import { UserInfoCard } from "../../components/card/UserInfoCard"
import { Page } from "../../components/layouts/Page/Page"
import { useAuthentication } from "../../hooks"
import { useWeb3 } from "../../hooks/useWeb3"
import { UserWallet } from "../../types/types"

export const HomeView: FC = () => {
  const { createWallet } = useCreateWallet();
  const { user } = useAuthentication();
  const { wallet, setWallet } = useWeb3();

  const handleOnSuccessWalletCreation = useCallback((wallet: UserWallet) => {
    setWallet(wallet);
    toast('Wallet created successfully', { type: 'success' });
  }, [setWallet]);

  const handleOnClickCreateWallet  = useCallback(() => {
    if(user) {
      createWallet({ userId: user.uid, onSuccess: handleOnSuccessWalletCreation });
    }
  }, [createWallet, user, handleOnSuccessWalletCreation]);

  return (
    <Page title="Home">
      <VStack>
        <Text>In order to use our services you must create a wallet.</Text>
        {wallet ? (
          <Box pt={10}>
            <UserInfoCard wallet={wallet} />
          </Box>
        ) : (<Button onClick={handleOnClickCreateWallet}>Create wallet</Button>)}
      </VStack>
    </Page>
  )
}