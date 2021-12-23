import React, { useContext, useReducer } from "react";
import reducer from "./reducer";

//Creating Context
const AuthContext = React.createContext();

const initialState = {};

const Context = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <AuthContext.Provider> {children} </AuthContext.Provider>;
};

export const useGlobalContext = () => {
  return useContext(AuthContext);
};

export { Context, AuthContext };
