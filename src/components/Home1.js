import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  SimpleGrid,
  useBreakpointValue,
  IconProps,
  Icon,
  HStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import SignUp from "./SignUp";
import LogIn from "./LogIn";

export default function Home1() {
  const [showSignUpForm, setShowSignUpForm] = useState(true);
  const [showLogInForm, setShowLogInForm] = useState(false);
  return (
    <Box position={"relative"}>
      <Container
        as={SimpleGrid}
        maxW={"7xl"}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}
      >
        <Stack spacing={{ base: 10, md: 20 }}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
          >
            Determine your To-Do list{" "}
            <Text
              as={"span"}
              bgGradient="linear(to-r,  rgb(0, 39, 77),purple.400)"
              bgClip="text"
            >
              &
            </Text>{" "}
            do it in an Organized way.
          </Heading>
          <Stack
            direction={"row"}
            spacing={4}
            align={"center"}
            justify="center"
          >
            <Flex
              align={"center"}
              justify={"center"}
              fontFamily={"heading"}
              fontSize={{ base: "sm", md: "lg" }}
              bg={"gray.800"}
              color={"white"}
              rounded={"full"}
              minWidth={useBreakpointValue({ base: "104px", md: "120px" })}
              minHeight={useBreakpointValue({ base: "104px", md: "120px" })}
              position={"relative"}
              _before={{
                content: '""',
                width: "full",
                height: "full",
                rounded: "full",
                transform: "scale(1.125)",
                bgGradient: "linear(to-bl, orange.400,yellow.400)",
                position: "absolute",
                zIndex: -1,
                top: 0,
                left: 0,
              }}
            >
              CI Calendar
            </Flex>
          </Stack>
        </Stack>
        <Stack
          bg={"gray.50"}
          rounded={"xl"}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: "lg" }}
        >
          <Stack spacing={4}>
            <Heading
              color={"gray.800"}
              lineHeight={1.1}
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
            >
              {showSignUpForm ? "Sign Up" : "Login"}
              <Text
                as={"span"}
                bgGradient="linear(to-r,  rgb(0, 39, 77),purple.400)"
                bgClip="text"
              >
                !
              </Text>
            </Heading>
            <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
              Join us to organize yor daily tasks and enjoy all of our
              features..
            </Text>
          </Stack>
          <Box mt={10}>
            <Stack spacing={4}>
              {showSignUpForm && (
                <>
                  <SignUp />
                  <HStack pt={6}>
                    <Text align={"center"}>Already a user? </Text>
                    <Link
                      onClick={() => {
                        setShowLogInForm(true);
                        setShowSignUpForm(false);
                      }}
                    >
                      <Text color={"rgb(0, 39, 77)"} fontWeight="800">
                        Login
                      </Text>
                    </Link>
                  </HStack>
                </>
              )}
              {showLogInForm && (
                <Stack pt={6}>
                  <LogIn />
                  <HStack pt={6}>
                    <Text align={"center"}>New user? </Text>
                    <Link
                      onClick={() => {
                        setShowSignUpForm(true);
                        setShowLogInForm(false);
                      }}
                      color={"blue.500"}
                    >
                      <Text color={"rgb(0, 39, 77)"} fontWeight="800">
                        Create account
                      </Text>
                    </Link>
                  </HStack>
                </Stack>
              )}
            </Stack>
          </Box>
          form
        </Stack>
      </Container>
      <Blur
        position={"absolute"}
        top={-10}
        left={-10}
        style={{ filter: "blur(70px)" }}
      />
    </Box>
  );
}

export const Blur = (props: IconProps) => {
  return (
    <Icon
      width={useBreakpointValue({ base: "100%", md: "40vw", lg: "30vw" })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="71" cy="61" r="111" fill="#F56565" />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
    </Icon>
  );
};
