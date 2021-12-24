import React, { useContext, useReducer } from "react";
import reducer from "./reducer";
import axios from "axios";

//Creating Context
const AuthContext = React.createContext();

const initialState = {
  user: {},
};

const URL = "https://password-reset-gmkumaran87.herokuapp.com/api/v1/register/";

const Context = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const registerUser = async (userObj) => {
    try {
      // Sending Post request to save the User details in the DB
      const result = await axios.post(URL, userObj);
      if (result.status === 200) {
        dispatch({ type: "ADD_USER", payload: result.data });
      }
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const forgotPassword = async (email) => {
    try {
      const result = await axios.post(`${URL}/forgot-password/`, email);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, registerUser, forgotPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AuthContext);
};

export { Context, AuthContext };
