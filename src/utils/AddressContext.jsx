// src/utils/AddressContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const AddressContext = createContext();

export const useAddress = () => useContext(AddressContext);

export const AddressProvider = ({ children }) => {
  // Load from localStorage initially
  const [address, setAddress] = useState(() => {
    const saved = localStorage.getItem("address");
    return saved
      ? JSON.parse(saved)
      : { name: "", street: "", city: "", zip: "", phone: "" };
  });

  // Persist address
  useEffect(() => {
    localStorage.setItem("address", JSON.stringify(address));
  }, [address]);

  return (
    <AddressContext.Provider value={{ address, setAddress }}>
      {children}
    </AddressContext.Provider>
  );
};
