import React from "react";
import {
  Flex,
  HStack,
  Image,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Container,
  IconButton,
  Tooltip,
  Text,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
  Button,
  Heading,
} from "@chakra-ui/react";
import Calendar from "react-calendar";
import { CheckIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { firestore } from "../firebase_setup/firebase";
import EditTask from "./EditTask";
import DeleteTask from "./DeleteTask";

export default function MyTasks() {
  const [isLoading, setIsLoading] = useState(true);
  const [todos, setTodos] = useState([]);
  const [calDate, setCalDate] = useState(new Date());

  function onChange(calDate) {
    setIsLoading(true);
    setCalDate(calDate);
  }

  const [calenderIsOpen, setCalenderIsOpen] = useState(false);
  const calenderOpen = () => setCalenderIsOpen(true);
  const calenderClose = () => setCalenderIsOpen(false);

  function formatDate(calDate) {
    var d = new Date(calDate),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  function typeTime(time) {
    const hour = time.slice(0, 2);
    var type = "";
    var type = hour >= 12 ? "pm" : "am";

    return type;
  }

  function formatTime(time) {
    const hour = time.slice(0, 2);
    const minutes = time.slice(3, 5);

    const newHour = hour > 12 ? hour % 12 : hour;
    var newTime = "";

    if (newHour.length) {
      return (newTime = newHour + ":" + minutes);
    } else {
      return (newTime = "0" + newHour + ":" + minutes);
    }
  }

  const fetchData = async (calDate) => {
    const q = query(
      collection(firestore, "tasks"),
      where("date", "==", formatDate(calDate)),
      where("user", "==", localStorage.getItem("user"))
    );

    await getDocs(q).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTodos(newData);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    });
  };

  const doneTask = (id) => {
    const ref = doc(firestore, "tasks", id);
    let data = {
      done: true,
      timestamp: serverTimestamp(),
    };
    try {
      updateDoc(ref, data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData(calDate);
  });

  return (
    <Container maxW={"5xl"} zIndex={0}>
      <Flex direction="column">
        <Flex justify={"center"}>
          <Image
            mt={8}
            display={"inline-flex"}
            boxSize={{ base: "60%", md: "30%" }}
            objectFit="contain"
            src={require("../images/logo2.png")}
            alt={"ci-cal2"}
          />
        </Flex>

        <Popover
          isOpen={calenderIsOpen}
          onOpen={calenderOpen}
          onClose={calenderClose}
          trigger={"hover"}
          placement={"bottom-start"}
        >
          <PopoverTrigger>
            <Button
              color={"black"}
              fontSize={"lg"}
              fontWeight={800}
              variant={"ghost"}
              textColor="rgb(0, 39, 77)"
              maxW={"44"}
              _hover={{ color: "rgb(8, 19, 99)" }}
            >
              {calDate.toDateString()}
            </Button>
          </PopoverTrigger>
          <PopoverContent border={0} boxShadow={"xl"} p={4} rounded={"xl"}>
            <Calendar onChange={onChange} value={calDate} />
          </PopoverContent>
        </Popover>
        {isLoading && (
          <Progress
            isIndeterminate
            value={64}
            colorScheme="orange"
            top={"300px"}
          />
        )}
        {todos.length > 0 ? (
          <TableContainer
            m={6}
            border="1px solid"
            borderColor="gray.100"
            borderRadius="md"
          >
            <Table variant="simple" border={"-moz-initial"}>
              <TableCaption mt={0}>Daily tasks list</TableCaption>
              <Thead>
                <Tr>
                  <Th fontSize={"lg"} textColor="rgb(0, 39, 77)">
                    Task
                  </Th>
                  <Th
                    fontSize={"lg"}
                    textAlign={"center"}
                    textColor="rgb(0, 39, 77)"
                  >
                    Time
                  </Th>
                  <Th
                    fontSize={"lg"}
                    textAlign={"center"}
                    textColor="rgb(0, 39, 77)"
                  >
                    Options
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {todos.map((data) => (
                  <Tr>
                    <Td>
                      <Text as={data.done && "s"}>{data.task}</Text>
                      <Text fontSize={"xs"}>{data.notes}</Text>
                    </Td>
                    <Td>
                      <HStack justifyContent={"center"}>
                        <Text color="green.500">from</Text>{" "}
                        <Text>
                          {formatTime(data.from) + " " + typeTime(data.from)}
                        </Text>
                        <Text color="green.500">To</Text>{" "}
                        <Text>
                          {formatTime(data.to) + " " + typeTime(data.to)}
                        </Text>
                      </HStack>
                    </Td>

                    <Td>
                      <HStack justify={"center"}>
                        <EditTask
                          id={data.id}
                          task={data.task}
                          date={data.date}
                          from={data.from}
                          to={data.to}
                          notes={data.notes}
                        />

                        <DeleteTask id={data.id} task={data.task} />
                        {!data.done && (
                          <Tooltip
                            label="Done"
                            fontSize="md"
                            bg="gray.100"
                            color={"gray.600"}
                            hasArrow
                          >
                            <IconButton
                              size={"lg"}
                              variant="ghost"
                              color={"green.500"}
                              _hover={{ bg: "white", color: "green" }}
                              aria-label="Delete"
                              icon={<CheckIcon />}
                              onClick={() => doneTask(data.id)}
                            />
                          </Tooltip>
                        )}
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        ) : (
          <Heading size={"xl"} mt={8} textAlign={"center"}>
            {" "}
            No Tasks For Today
          </Heading>
        )}
      </Flex>
    </Container>
  );
}
