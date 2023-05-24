import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  IconButton,
  Tooltip,
  Heading,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import AddEditTaskForm from "./AddEditTaskForm";
export default function EditTask(props) {
  const editModal = useDisclosure();
  return (
    <>
      <Tooltip
        label="Edit"
        fontSize="md"
        bg="gray.100"
        color={"gray.600"}
        hasArrow
      >
        <IconButton
          size={"lg"}
          variant="ghost"
          color={"blue.500"}
          _hover={{ bg: "white", color: "blue" }}
          icon={<EditIcon />}
          onClick={editModal.onOpen}
        />
      </Tooltip>

      <Modal isOpen={editModal.isOpen} onClose={editModal.onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading
              fontSize={"4xl"}
              textAlign={"center"}
              color="#59A52C"
              fontFamily={"mono"}
            >
              Edit Todo
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddEditTaskForm
              type={"edit"}
              todoId={props.id}
              todoTask={props.task}
              todoDate={props.date}
              todoFrom={props.from}
              todoTo={props.to}
              todoNotes={props.notes}
              onClose={editModal.onClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
