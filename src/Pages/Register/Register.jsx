import { useFormik } from "formik";
import axios from "axios";
import { object, ref, string } from "yup";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function InputField({ name, label, type, formik }) {
  return (
    <div className="">
      <label htmlFor={name}>{label}: </label>
      <input
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        id={name}
        type={type}
        className="w-full focus:border-green-700 focus:outline-0 border border-green-500 rounded-2xl px-3 py-1 my-2"
      />
      {formik.errors[name] && formik.touched[name] && (
        <p className="text-red-400 text-center font-semibold">
          {formik.errors[name]}
        </p>
      )}
    </div>
  );
}

export default function Register() {
  const passwordRegex = /^[A-Z][a-z0-9]{5,}$/;
  const phoneRegex = /^01[0125][0-9]{8}$/;
  const navigate = useNavigate();

  const validationSchema = object({
    name: string("Name Must Be String")
      .required("Name Is Required")
      .min(3, "Min Chars 3")
      .max(20, "Max Chars 20"),
    email: string("Email Must Be String")
      .required("Email Is Required")
      .email("Email Must Be Valid"),
    password: string("")
      .required("Password Is Required")
      .matches(
        passwordRegex,
        "Password must start by uppercase letter and be at least 6 characters long"
      ),
    rePassword: string("")
      .required("RePassword Is Required")
      .oneOf([ref("password")], "Passwords must match"),
    phone: string("")
      .required("Phone Is Required")
      .matches(phoneRegex, "Phone Must Be Egyptian Number"),
  });

  async function handleRegister(values) {
    if (!import.meta.env.VITE_BASE_URL) {
      toast.error("Configuration error. Please contact support.");
      return;
    }

    let loadingTest = toast.loading("Loading...");
    try {
      let { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/signup`,
        values
      );
      const message =
        data?.data?.message || data?.message || "Registration successful";
      toast.success(message);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message || "Registration failed";
      toast.error(errorMessage);
    } finally {
      toast.dismiss(loadingTest);
    }
  }

  const formikObject = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: handleRegister,
    validationSchema,
  });

  useEffect(() => {
    document.title = "Register";
  }, []);

  return (
    <form onSubmit={formikObject.handleSubmit}>
      <div className="container w-1/2 mx-auto py-5 mt-[15vh] dark:text-slate-300">
        <h2 className="text-2xl py-5">Register Now</h2>
        <InputField
          name="name"
          label="Name"
          type="text"
          formik={formikObject}
        />
        <InputField
          name="email"
          label="Email"
          type="email"
          formik={formikObject}
        />
        <InputField
          name="password"
          label="Password"
          type="password"
          formik={formikObject}
        />
        <InputField
          name="rePassword"
          label="RePassword"
          type="password"
          formik={formikObject}
        />
        <InputField
          name="phone"
          label="Phone"
          type="tel"
          formik={formikObject}
        />

        <button
          disabled={
            formikObject.isSubmitting ||
            !formikObject.isValid ||
            !formikObject.dirty
          }
          type="submit"
          className="bg-green-500 text-white py-2 px-4 disabled:cursor-not-allowed rounded-lg mt-2.5 hover:bg-green-400 cursor-pointer disabled:opacity-50"
        >
          {formikObject.isSubmitting ? "Registering..." : "Register"}
        </button>
      </div>
    </form>
  );
}
