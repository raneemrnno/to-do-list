import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Textarea,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";
import { firestore } from "../firebase_setup/firebase";
import { useAlertContext } from "../context/alertContext";

export default function AddEditTaskForm(props) {
  const { onOpenAlert } = useAlertContext();

  const submitAddTask = (values) => {
    const ref = collection(firestore, "tasks"); // Firebase creates this automatically
    let data = {
      task: values.task,
      date: values.date,
      user: localStorage.getItem("user"),
      from: values.from,
      to: values.to,
      notes: values.notes,
      done: false,
      timestamp: serverTimestamp(),
    };
    try {
      addDoc(ref, data);
      onOpenAlert("success", "Task Added Successfully.");
      AddEditTaskFormik.resetForm();
    } catch (err) {
      console.log(err);
      onOpenAlert("error", "Please Try Again!!");
    }
  };

  const submitEditTask = (values) => {
    const ref = doc(firestore, "tasks", props.todoId);
    let data = {
      task: values.task,
      date: values.date,
      user: localStorage.getItem("user"),
      from: values.from,
      to: values.to,
      notes: values.notes,
      //done: false,
      timestamp: serverTimestamp(),
    };
    try {
      updateDoc(ref, data);
      props.onClose();
      onOpenAlert("success", "Task Updated Successfully.");
    } catch (err) {
      console.log(err);
      onOpenAlert("error", "Please Try Again!!");
    }
  };
  const AddEditTaskFormik = useFormik({
    initialValues: {
      date: props.type === "edit" ? props.todoDate : "",
      task: props.type === "edit" ? props.todoTask : "",
      from: props.type === "edit" ? props.todoFrom : "",
      to: props.type === "edit" ? props.todoTo : "",
      notes: props.type === "edit" ? props.todoNotes : "",
    },
    onSubmit: (values) => {
      props.type === "edit" ? submitEditTask(values) : submitAddTask(values);
    },
    validationSchema: Yup.object({
      task: Yup.string().required("Required"),
    }),
  });
  return (
    <form onSubmit={AddEditTaskFormik.handleSubmit}>
      <VStack spacing={4}>
        <FormControl
          id="date"
          isRequired
          isInvalid={
            !!AddEditTaskFormik.errors.date && AddEditTaskFormik.touched.date
          }
        >
          <FormLabel htmlFor="date">Date:</FormLabel>
          <Input
            size="md"
            type="date"
            id="date"
            name="date"
            {...AddEditTaskFormik.getFieldProps("date")}
          />
          <FormErrorMessage>{AddEditTaskFormik.errors.date}</FormErrorMessage>
        </FormControl>

        <FormControl
          id="task"
          isRequired
          isInvalid={
            !!AddEditTaskFormik.errors.task && AddEditTaskFormik.touched.task
          }
        >
          <FormLabel htmlFor="task">Task:</FormLabel>
          <Input
            type="text"
            id="task"
            name="task"
            {...AddEditTaskFormik.getFieldProps("task")}
            placeholder="task title"
          />
          <FormErrorMessage>{AddEditTaskFormik.errors.task}</FormErrorMessage>
        </FormControl>

        <FormControl id="time" isRequired>
          <FormLabel htmlFor="time">Time:</FormLabel>
          <HStack>
            <FormControl id="from">
              <FormLabel htmlFor="from" fontSize={"xs"}>
                From
              </FormLabel>
              <Input
                type="time"
                id="from"
                name="from"
                {...AddEditTaskFormik.getFieldProps("from")}
              />
            </FormControl>
            <FormControl id="to">
              <FormLabel htmlFor="to" fontSize={"xs"}>
                To
              </FormLabel>
              <Input
                type="time"
                id="to"
                name="to"
                {...AddEditTaskFormik.getFieldProps("to")}
              />
            </FormControl>
          </HStack>
        </FormControl>

        <FormControl id="notes">
          <FormLabel htmlFor="notes">Notes:</FormLabel>
          <Textarea
            placeholder="your notes"
            id="notes"
            name="notes"
            {...AddEditTaskFormik.getFieldProps("notes")}
          />
        </FormControl>
        <Button
          type="submit"
          w={"20%"}
          loadingText="Submitting"
          size="lg"
          bg={"rgb(0, 39, 77)"}
          color={"white"}
          _hover={{
            bg: "rgb(0, 49, 99)",
          }}
          isDisabled={
            AddEditTaskFormik.values.task &&
            AddEditTaskFormik.values.date &&
            AddEditTaskFormik.values.from &&
            AddEditTaskFormik.values.to
              ? false
              : true
          }
        >
          {props.type === "add" ? "Add" : "Edit"}
        </Button>
      </VStack>
    </form>
  );
}
