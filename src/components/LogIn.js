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
import { getDocs, collection, doc } from "@firebase/firestore";
import { firestore } from "../firebase_setup/firebase";
import { useAlertContext } from "../context/alertContext";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LogIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { onOpenAlert } = useAlertContext();
  const submitLoginUser = async (values) => {
    console.log("hhh");
    const auth = getAuth();
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        window.localStorage.setItem("user", values.email);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        onOpenAlert("success", "You Have Succsessfully Loged In.");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, " ", errorMessage);
        if (errorCode === "auth/wrong-password") {
          onOpenAlert("error", "Wrong Password!!");
        } else {
          onOpenAlert("error", "User Not Found!!");
        }
      });

    LogInFormik.resetForm();
  };

  const LogInFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      submitLoginUser(values);
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .required("Required")
        .min(8, "Password is too short - should be 8 chars minimum."),
    }),
  });
  return (
    <form onSubmit={LogInFormik.handleSubmit}>
      <VStack spacing={4}>
        <FormControl
          id="email"
          isRequired
          isInvalid={!!LogInFormik.errors.email && LogInFormik.touched.email}
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
            {...LogInFormik.getFieldProps("email")}
          />
          <FormErrorMessage>{LogInFormik.errors.email}</FormErrorMessage>
        </FormControl>
        <FormControl
          id="password"
          isRequired
          isInvalid={
            !!LogInFormik.errors.password && LogInFormik.touched.password
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
              {...LogInFormik.getFieldProps("password")}
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
          <FormErrorMessage>{LogInFormik.errors.password}</FormErrorMessage>
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
            LogInFormik.values.email && LogInFormik.values.password
              ? false
              : true
          }
        >
          Login
        </Button>
      </VStack>
    </form>
  );
};
export default LogIn;
