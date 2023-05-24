import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box backgroundColor="gray.800">
      <footer>
        <Flex
          ml={{ base: 0, md: 60 }}
          p="4"
          color="white"
          justifyContent="center"
          alignItems="center"
          //maxWidth="1024px"
          maxW={"100vw"}
          h={"8vh"}
        >
          <Text color={"gray.200"}>Raneem Taha Alkhabbaz • © 2023</Text>
        </Flex>
      </footer>
    </Box>
  );
};
export default Footer;
