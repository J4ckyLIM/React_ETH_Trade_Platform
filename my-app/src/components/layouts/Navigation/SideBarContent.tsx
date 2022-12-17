import { Box, BoxProps, CloseButton, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { ColorModeSwitcher } from "../../../ColorModeSwitcher";
import { NavItem } from "./NavItem";

export interface LinkItemProps {
  name: string;
  icon: IconType;
}

interface SidebarProps extends BoxProps {
  linkItems: LinkItemProps[];
  onClose: () => void;
}

export const SidebarContent = ({ linkItems, onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      <ColorModeSwitcher justifySelf="flex-end" />
      {linkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};