import React, { useEffect } from "react";

import "./Form.css";
import { useGlobalContext } from "../context/Context";
import { useParams } from "react-router-dom";
import ResetForm from "../component/ResetForm";

const ResetPassword = () => {
  // Loading State
  // const [isLoading, setLoading] = useState(true);
  const params = useParams();

  const { userId, randomStr } = params;
  const { passwordReset, validateReset } = useGlobalContext();

  useEffect(() => {
    validateReset(userId, randomStr);
  }, []);
  return (
    <>
      {passwordReset.isLoading && (
        <p className="page-load">Please wait while Page is loading...!</p>
      )}
      <ResetForm />
    </>
  );
};

export default ResetPassword;
