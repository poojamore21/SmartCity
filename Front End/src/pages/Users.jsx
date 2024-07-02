import React, { useContext } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import axios from "axios";
import apiRequest from "../lib/apiRequest";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Bounce, toast } from "react-toastify";

function Users() {
  const { updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    password: "",
  };

  const alertOnLogin = () => {
    toast.success("Log in Successful", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  const alertOnLoginError = () => {
    toast.error("Incorrect username or password", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = "Username is required";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const res = await apiRequest.post("/auth/login", values);
      await updateUser(res.data);
      console.log(res.data);
      alertOnLogin();
      console.log(updateUser);
      navigate("/");
    } catch (err) {
      console.log(err.message);
      alertOnLoginError(); // Display error message for incorrect credentials
    }
    setSubmitting(false);
  };

  return (
    <div>
      <div className="text-3xl text-center m-10 font-bold">
        <h1>User Login</h1>
      </div>

      <div className="flex flex-col items-center mt-20 gap-8">
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="h-auto w-80 flex flex-col gap-4">
              <label className="input input-bordered flex items-center gap-2">
                Username
                <Field type="text" name="username" className="grow" />
              </label>
              <ErrorMessage
                name="username"
                component="div"
                className="error text-red-500"
              />
              <label className="input input-bordered flex items-center gap-2">
                Password
                <Field type="password" name="password" className="grow" />
              </label>
              <ErrorMessage
                name="password"
                component="div"
                className="error text-red-500"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="btn btn-active"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
                <button type="reset" className="btn btn-active">
                  Reset
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Users;
