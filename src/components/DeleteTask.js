import {
  useDisclosure,
  IconButton,
  Tooltip,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useRef } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { firestore } from "../firebase_setup/firebase";

export default function DeleteTask(props) {
  const deleteAlert = useDisclosure();
  const cancelRef = useRef();

  const deleteTask = async (id) => {
    try {
      const documentRef = doc(firestore, "tasks", id);
      await deleteDoc(documentRef);
      deleteAlert.onClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Tooltip
        label="Delete"
        fontSize="md"
        bg="gray.100"
        color={"gray.600"}
        hasArrow
      >
        <IconButton
          size={"md"}
          variant="ghost"
          color={"red.500"}
          _hover={{ bg: "white", color: "red" }}
          aria-label="Delete"
          icon={<CloseIcon />}
          onClick={deleteAlert.onOpen}
        />
      </Tooltip>

      <AlertDialog
        isOpen={deleteAlert.isOpen}
        leastDestructiveRef={cancelRef}
        onClose={deleteAlert.onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Task
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete "{props.task}" task ?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={deleteAlert.onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => deleteTask(props.id)}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
