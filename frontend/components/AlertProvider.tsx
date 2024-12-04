import React, { createContext, useContext, useState, ReactNode } from "react";
import Alert from "./Alert";
import { createPortal } from "react-dom";

type Severity = "error" | "warning" | "info" | "success";

interface AlertContextProps {
  showAlert: (message: string, severity: Severity) => void;
}

interface Alert {
  message: string;
  severity: Severity;
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

export const AlertProvider: React.FC<{ children: ReactNode }> = ({
                                                                   children
                                                                 }) => {
  const [alerts, setAlerts] = useState<Map<string, Alert>>(new Map());

  const addAlert = (alert: Alert): void => {
    setAlerts(prevAlerts => {
      const newMap = new Map(prevAlerts);
      const key = Math.random().toString();
      newMap.set(key, alert);
      setTimeout(() => deleteAlert(key.toString()), 3000);

      return newMap;
    });
  };

  const deleteAlert = (key: string): void => {
    setAlerts(prevAlerts => {
      const newMap = new Map(prevAlerts);
      newMap.delete(key);
      return newMap;
    });
  };

  const showAlert = (message: string, severity: Severity) => {
    addAlert({ message, severity });
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {createPortal(
        <div
          style={{
            position: "fixed",
            top: 20,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 9999,
            width: "90%",
            maxWidth: 500,
            pointerEvents: "none",
          }}
        >
          {Array.from(alerts.entries()).map(([key, alert]) => (
          <Alert
            message={alert.message}
            severity={alert.severity}
            onClose={() => deleteAlert(key)}
            key={key}
          />
          ))}
        </div>,
        document.body
      )}
    </AlertContext.Provider>
  );
};

export const useAlert = (): AlertContextProps => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used inside AlterProvider wrapper");
  }
  return context;
};
