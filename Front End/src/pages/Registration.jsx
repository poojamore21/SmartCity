import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Registration() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const url = "http://localhost:8800/api/auth/register";
  const initialValues = {
    username: "",
    email: "",
    password: "",
    name: "",
    phoneno: "",
    role: "",
  };

  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = "Username is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = "Invalid email address";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    if (!values.name) {
      errors.name = "Name is required";
    }
    if (!values.phoneno) {
      errors.phoneno = "Phone number is required";
    } else if (values.phoneno.length !== 10) {
      errors.phoneno = "Phone number must be exactly 10 digits";
  }
    if (!values.role) {
      errors.role = "Role is required";
    }
    return errors;
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    // Handle form submission here
    setSubmitting(false);
    try {
      await axios.post(url, values);
      toast.success("Registration Successful, Go to Login", {
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
      resetForm();
      navigate("/users");
    } catch (error) {
      console.log(error.response.data.message);
      setError(error.response.data.message);
    }
  };

  return (
    <div>
      <div className="text-3xl font-bold text-center mt-10">Register Here!</div>
      <div className="flex flex-col items-center mt-10 gap-8">
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
              {error ? <div className="text-red-500">{error}</div> : null}
              <label className="input input-bordered flex items-center gap-2">
                Email
                <Field type="text" name="email" className="grow" />
              </label>
              <ErrorMessage
                name="email"
                component="div"
                className="error text-red-500" // Set error message color to red
              />
              <label className="input input-bordered flex items-center gap-2">
                Password
                <Field type="password" name="password" className="grow" />
              </label>
              <ErrorMessage
                name="password"
                component="div"
                className="error text-red-500" // Set error message color to red
              />
              <label className="input input-bordered flex items-center gap-2">
                Name
                <Field type="text" name="name" className="grow" />
              </label>
              <ErrorMessage
                name="name"
                component="div"
                className="error text-red-500" // Set error message color to red
              />
              <label className="input input-bordered flex items-center gap-2">
                Phone Number
                <Field type="text" name="phoneno" className="grow" />
              </label>
              <ErrorMessage
                name="phoneno"
                component="div"
                className="error text-red-500" // Set error message color to red
              />
              <label className="input input-bordered flex items-center gap-2">
                Role
                <Field
                  as="select"
                  name="role"
                  className="input focus:outline-none grow"
                >
                  <option value="">Select Role</option>
                  {/* <option value="ADMIN">ADMIN</option> */}
                  <option value="TOURIST">TOURIST</option>
                  <option value="JOB_SEEKERS">JOB_SEEKERS</option>
                  <option value="BUSINESSMAN">BUSINESSMAN</option>
                  <option value="STUDENT">STUDENT</option>
                </Field>
              </label>
              <ErrorMessage
                name="role"
                component="div"
                className="error text-red-500" // Set error message color to red
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

export default Registration;
