import React, { ReactNode } from "react";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Heading,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Image,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {
  FiHome,
  FiSettings,
  FiMenu,
  FiChevronDown,
  FiPlus,
  FiList,
  FiCalendar,
  FiLogIn,
  FiLogOut,
  FiInfo,
} from "react-icons/fi";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import LogIn from "./LogIn";
import SignUp from "./SignUp";

export default function SidebarWithHeader({
  children,
}: {
  children: ReactNode,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("white", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("purple.50", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("rgb(0, 39, 77)", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Image
          display={"inline-flex"}
          boxSize={"100%"}
          objectFit="contain"
          src={require("../images/logo.png")}
          alt={"ci-cal"}
        />

        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <Links name="Home" to="/" icon={FiHome} />
      <Links name="New Task" to="/add_task" icon={FiPlus} />
      <Links name="My Tasks" to="/my_tasks" icon={FiList} />
      <Links name="About Us" to="/about_us" icon={FiInfo} />
      <Links name="Settings" to="/settings" icon={FiSettings} />
    </Box>
  );
};

const Links = (props) => {
  return (
    <Link to={props.to}>
      <Flex
        align="center"
        color={"rgb(0, 39, 77)"}
        fontWeight="bold"
        p="4"
        mx="4"
        borderRadius="lg"
        cursor="pointer"
        _hover={{
          bg: "#aa74ac",
          color: "white",
        }}
      >
        <Icon
          mr="4"
          fontSize="16"
          _hover={{
            color: "white",
          }}
          as={props.icon}
        />
        {props.name}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const getUser = localStorage.getItem("user");
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("purple.50", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("rgb(0, 39, 77)", "gray.700")}
      // justifyContent={{ base: "space-between", md: "center" }}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Image
        display={{ base: "flex", md: "none" }}
        boxSize={"100%"}
        objectFit="contain"
        src={require("../images/logo.png")}
        alt={"ci-cal"}
      />
      <HStack spacing={{ base: "0", md: "6" }}>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{getUser}</Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem>
                <Link to="/profile">Profile</Link>
              </MenuItem>
              <MenuDivider />
              <MenuItem
                onClick={() => {
                  localStorage.clear();
                  window.location.replace("/");
                  setTimeout(() => {
                    window.location.reload();
                  }, 1000);
                }}
              >
                Sign out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>

      {/** 
      <Menu>
        <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: "none" }}>
          <HStack>
            <VStack
              display={{ base: "none", md: "flex" }}
              alignItems="flex-start"
              spacing="1px"
              ml="2"
            >
              <Text fontSize="sm">{getUser}</Text>
            </VStack>
            <Box display={{ base: "none", md: "flex" }}>
              <FiChevronDown />
            </Box>
          </HStack>
        </MenuButton>
        <MenuList bg={"white"} borderColor={"rgb(0, 39, 77)"}>
          <MenuItem
            justifyContent={"center"}
            onClick={() => {
              localStorage.clear();
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            }}
          >
            Sign out <Icon ml="2" fontSize="16" as={FiLogOut} />
          </MenuItem>
        </MenuList>
          </Menu>*/}
    </Flex>
  );
};
