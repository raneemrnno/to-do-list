import { createContext, useContext, useState } from "react";

const LoaderContext = createContext(undefined);

export const LoaderProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <LoaderContext.Provider
      value={{
        isLoading,
        onOpenLoader: () =>
          setTimeout(() => {
            setIsLoading(false);
          }, 1000),
      }}
    >
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoaderContext = () => useContext(LoaderContext);
