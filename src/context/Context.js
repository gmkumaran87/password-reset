import React, { useContext, useReducer } from "react";
import reducer from "./reducer";
import axios from "axios";
import { useEffect } from "react/cjs/react.development";

//Creating Context
const AuthContext = React.createContext();

const initialState = {
  user: {},
  register: { isLoading: false, isError: false, errorMsg: "" },
  passwordForgot: { isLoading: false, isError: false, errorMsg: "" },
  passwordReset: { isLoading: false, isError: false, errorMsg: "" },
  activationMsg: "",
};

const URL = "https://password-reset-gmkumaran87.herokuapp.com/api/v1/register";

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
      dispatch({ type: "ERROR", payload: error.response.data.msg });
    }
  };

  const forgotPassword = async (email) => {
    console.log("Entered email", email);
    try {
      const result = await axios.post(`${URL}/forgot-password/`, email);
      console.log(result);
      if (result.status === 200) {
        dispatch({ type: "EMAIL_SENT", payload: result.data.msg });
      }
    } catch (error) {
      console.log("In Forgot password error", error);
      dispatch({ type: "ERROR", payload: error.response.data.msg });
    }
  };

  const resetPassword = async (userObj) => {
    console.log("Entered Password", userObj);

    try {
      const result = await axios.post(`${URL}/reset-password/`, userObj);
      if (result.status === 200) {
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validateReset = async (userId, randomStr) => {
    const validateObj = { userId, randomStr };
    try {
      const res = await axios.post(`${URL}/reset-password`, validateObj);
      if (res.status === 200) {
        dispatch({
          type: "USER_EMAIL_VALIDATE",
          payload: { isLoading: false, isError: true },
        });
      }
    } catch (error) {
      dispatch({ type: "USER_EMAIL_VALIDATE", payload: false });
      console.log(error);
    }
  };

  // Setting the Password reset form page
  useEffect(() => {
    console.log("Restting the Page load");
    dispatch({ type: "PASSWORD_RESET", payload: true });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        registerUser,
        forgotPassword,
        resetPassword,
        validateReset,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AuthContext);
};

export { Context, AuthContext };
