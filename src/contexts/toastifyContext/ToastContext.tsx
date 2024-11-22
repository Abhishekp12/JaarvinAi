import React, { createContext, useContext, ReactNode } from "react";
import { Slide, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define the type for the toast functions
interface ToastContextType {
  notifySuccess: (message: string) => void;
  notifyError: (message: string) => void;
  notifyInfo: (message: string) => void;
}

// Create the context with a default value of undefined
const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const notifySuccess = (message: string) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      transition: Slide,
      hideProgressBar: false, // Optional: Show/Hide the progress bar
      closeOnClick: true,
      pauseOnHover: true,
    });
  };

  const notifyError = (message: string) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
    });
  };

  const notifyInfo = (message: string) => {
    toast.info(message, {
      position: "top-right",
      autoClose: 4000,
    });
  };

  return (
    <ToastContext.Provider value={{ notifySuccess, notifyError, notifyInfo }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

// Custom hook to use the ToastContext
export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
};
