import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputRightElement,
  InputGroup,
  VStack,
} from "@chakra-ui/react";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useAlertContext } from "../context/alertContext";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { onOpenAlert } = useAlertContext();

  const submitSignUpUser = (values) => {
    console.log("hhh");
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        onOpenAlert("success", "You Have Succsessfully Signed Up.");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        onOpenAlert("error", "Email Already In Use!!");
      });

    signUpFormik.resetForm();
  };
  const signUpFormik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      submitSignUpUser(values);
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .required("Required")
        .min(8, "Password is too short - should be 8 chars minimum."),
    }),
  });
  return (
    <form onSubmit={signUpFormik.handleSubmit}>
      <VStack spacing={4}>
        <FormControl
          id="fullName"
          isInvalid={
            !!signUpFormik.errors.fullName && signUpFormik.touched.fullName
          }
          isRequired
        >
          <FormLabel htmlFor="fullName">Full Name</FormLabel>
          <Input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="Fullname"
            bg={"gray.100"}
            border={0}
            _placeholder={{
              color: "gray.500",
            }}
            {...signUpFormik.getFieldProps("fullName")}
          />
          <FormErrorMessage>{signUpFormik.errors.fullName}</FormErrorMessage>
        </FormControl>
        <FormControl
          id="email"
          isRequired
          isInvalid={!!signUpFormik.errors.email && signUpFormik.touched.email}
        >
          <FormLabel htmlFor="email">Email address</FormLabel>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="example@gmail.com"
            bg={"gray.100"}
            border={0}
            _placeholder={{
              color: "gray.500",
            }}
            {...signUpFormik.getFieldProps("email")}
          />
          <FormErrorMessage>{signUpFormik.errors.email}</FormErrorMessage>
        </FormControl>
        <FormControl
          id="password"
          isRequired
          isInvalid={
            !!signUpFormik.errors.password && signUpFormik.touched.password
          }
        >
          <FormLabel htmlFor="password">Password</FormLabel>
          <InputGroup>
            <Input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="12345678"
              bg={"gray.100"}
              border={0}
              _placeholder={{
                color: "gray.500",
              }}
              {...signUpFormik.getFieldProps("password")}
            />
            <InputRightElement h={"full"}>
              <Button
                variant={"ghost"}
                onClick={() => setShowPassword((showPassword) => !showPassword)}
              >
                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{signUpFormik.errors.password}</FormErrorMessage>
        </FormControl>
        <Button
          type="submit"
          loadingText="Submitting"
          size="lg"
          bg={"rgb(0, 39, 77)"}
          color={"white"}
          fontFamily={"heading"}
          mt={8}
          w={"full"}
          bgGradient="linear(to-r, rgb(0, 39, 77),purple.400)"
          _hover={{
            bgGradient: "linear(to-r,  rgb(0, 39, 77),purple.400)",
            boxShadow: "xl",
          }}
          isDisabled={
            signUpFormik.values.fullName &&
            signUpFormik.values.email &&
            signUpFormik.values.password
              ? false
              : true
          }
        >
          Sign up
        </Button>
      </VStack>
    </form>
  );
};
export default SignUp;
