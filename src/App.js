import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import { AlertProvider } from "./context/alertContext";
import Alert from "./components/Alert";

import Home1 from "./components/Home1";

import SidebarWithHeader from "./components/SidebarWithHeader";
import MyTasks from "./components/MyTasks";
import AddEditTaskForm from "./components/AddEditTaskForm";
import MyCalendar from "./components/MyCalendar";

function App() {
  const username = localStorage.getItem("user");
  return (
    <ChakraProvider>
      <AlertProvider>
        <Alert />
        {username ? (
          <SidebarWithHeader>
            <Routes>
              <Route path="/" element={<MyCalendar />} />
              <Route path="/my_tasks" element={<MyTasks />} />
              <Route
                path="/add_task"
                element={<AddEditTaskForm type={"add"} />}
              />
              <Route path="/full_calendar" element={<MyCalendar />} />
            </Routes>
          </SidebarWithHeader>
        ) : (
          <Routes>
            <Route path="/" element={<Home1 />} />
          </Routes>
        )}

        {/*<Footer />*/}
      </AlertProvider>
    </ChakraProvider>
  );
}

export default App;
