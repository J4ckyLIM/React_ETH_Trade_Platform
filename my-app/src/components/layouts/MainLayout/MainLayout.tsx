import { useDisclosure, useColorModeValue, Drawer, DrawerContent, Box } from "@chakra-ui/react";
import { FC, ReactNode } from "react";
import { FiHome, FiTrendingUp, FiCompass, FiStar, FiSettings } from "react-icons/fi";
import { Outlet } from "react-router-dom";
import { LinkItemProps, SidebarContent } from "../Navigation/SideBarContent";

const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome },
  { name: 'Trending', icon: FiTrendingUp },
  { name: 'Explore', icon: FiCompass },
  { name: 'Favorites', icon: FiStar },
  { name: 'Settings', icon: FiSettings },
];

interface MainLayoutProps {
  children?: ReactNode;
}

export const MainLayout: FC<MainLayoutProps> = () => {
  const { isOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        linkItems={LinkItems}
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent linkItems={LinkItems} onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: 60 }} p="4">
        <Outlet />
      </Box>
    </Box>
  );
}