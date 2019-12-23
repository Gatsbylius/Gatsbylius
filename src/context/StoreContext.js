import React from "react";
import { cartReducer } from "../reducers/cartReducer";

export const defaultStoreState = localStorage.getItem("storeState")
  ? JSON.parse(localStorage.getItem("storeState"))
  : {
      cartKey: "",
      currency: "USD",
      miniCartIsOpen: false,
      adding: false,
      products: [],
      cart: {},
    };

export const StoreStateContext = React.createContext();
export const StoreDispatchContext = React.createContext();

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(cartReducer, defaultStoreState);

  React.useEffect(() => {
    localStorage.setItem("storeState", JSON.stringify(state));
  }, [state]);

  return (
    <StoreStateContext.Provider value={state}>
      <StoreDispatchContext.Provider value={dispatch}>
        {children}
      </StoreDispatchContext.Provider>
    </StoreStateContext.Provider>
  );
};

export const useStoreStateContext = () => {
  const context = React.useContext(StoreStateContext);
  if (context === undefined) {
    throw new Error(
      "useStoreStateContext must be used within a StoreStateProvider"
    );
  }
  return context;
};

export const useStoreDispatchContext = () => {
  const context = React.useContext(StoreDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useStoreDispatchContext must be used within a StoreDispatchContext"
    );
  }
  return context;
};
