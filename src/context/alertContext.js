import { createContext, useContext, useState } from "react";

const AlertContext = createContext(undefined);

export const AlertProvider = ({ children }) => {
  const [state, setState] = useState({
    isOpenAlert: false,
    // Type can be either "success" or "error"
    type: "success",
    // Message to be displayed, can be any string
    message: "",
  });

  return (
    <AlertContext.Provider
      value={{
        ...state,
        onOpenAlert: (type, message) =>
          setState({ isOpenAlert: true, type, message }),
        onCloseAlert: () =>
          setState({ isOpenAlert: false, type: "", message: "" }),
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export const useAlertContext = () => useContext(AlertContext);
