import { Card, CardBody, CardFooter, Heading, Stack, Text, Image, Button } from "@chakra-ui/react";
import { FC } from "react";
import { UserWallet } from "../../types/types";

interface UserInfoCardProps {
  wallet: UserWallet;
}

export const UserInfoCard: FC<UserInfoCardProps> = ({ wallet }) => {
  // TODO: DISPLAY THE USER'S ETH BALANCE
  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow='hidden'
      variant='outline'
    >
      <Image
        objectFit='cover'
        maxW={{ base: '100%', sm: '200px' }}
        src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
        alt='Caffe Latte'
      />

      <Stack>
        <CardBody>
          <Heading size='md'>This is your account information</Heading>

          <Text py='2'>
            You can trade ETH with your friends.
          </Text>
          <Text py='2'>
            Address: {wallet.address}
          </Text>
          <Text py='2'>
            ETH: 0
          </Text>
        </CardBody>

        <CardFooter>
            <Button>Trade ETH</Button>
        </CardFooter>
      </Stack>
    </Card>
  )
}