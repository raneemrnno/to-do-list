import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { useAlertContext } from "../context/alertContext";
import { useRef } from "react";
import { CheckCircleIcon, CloseIcon } from "@chakra-ui/icons";

/**
 * This is a global component that uses context to display a global alert message.
 */
function Alert() {
  const { isOpenAlert, type, message, onCloseAlert } = useAlertContext();
  const cancelRef = useRef();
  const isSuccess = type === "success";

  return (
    <AlertDialog
      isOpen={isOpenAlert}
      leastDestructiveRef={cancelRef}
      onClose={onCloseAlert}
      size="lg"
    >
      <AlertDialogOverlay>
        <AlertDialogContent
          py={4}
          backgroundColor={isSuccess ? "#D2F4D2" : "#EDE2E2"}
        >
          <AlertDialogBody
            color={"gray.700"}
            fontSize="xl"
            fontWeight={"bold"}
            textAlign="center"
            fontFamily={"mono"}
          >
            {isSuccess ? (
              <CheckCircleIcon boxSize={"30px"} color={"green.500"} />
            ) : (
              <CloseIcon boxSize={"20px"} color={"red.500"} />
            )}{" "}
            {message}
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
    /**toast({
                  title: "Account created.",
                  description: "We've created your account for you.",
                  status: "success",
                  duration: 3000,
                  isClosable: true,
                }); */
  );
}

export default Alert;
