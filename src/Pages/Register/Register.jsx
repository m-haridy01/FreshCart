import { Formik, useFormik } from "formik";
import axios from "axios";
import { object, string } from "yup";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Register() {
  document.title = "Register";

  const passwordRegex = /^[A-Z][a-z0-9]{5,}$/;
  const rePasswordRegex = passwordRegex;
  const phoneRegex = /^01[0125][0-9]{8}$/;
  const navigate = useNavigate();

  let validationSchema = object({
    name: string("Name Must Be String")
      .required("Name Is Requierd")
      .min(3, "Min Chars 3")
      .max(20, "Max Chars 20"),
    email: string("Email Must Be String")
      .required("Email Is Requierd")
      .email("Email Must Be Valid"),
    password: string("")
      .required("password Is Requierd")
      .matches(
        passwordRegex,
        "Password Must Start By Capital Letter And More Than 6 Chars"
      ),
    rePassword: string("")
      .required("rePassword Is Requierd")
      .matches(rePasswordRegex, "Repassword Must Like The Password"),

    phone: string("")
      .required("phone Is Requierd")
      .matches(phoneRegex, "Phone Must Be Egyption Number"),
  });

  async function handleRegister(values) {
    let loadingTest = toast.loading("loading");
    try {
      let { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/signup`,
        values
      );
      toast.success(data.data.message);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      
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

  return (
    <>
      <form onSubmit={formikObject.handleSubmit}>
        <div className="container w-1/2 mx-auto py-5 mt-[15vh] dark:text-slate-300">
          <h2 className="text-2xl py-5">Register Now</h2>
          <div className="">
            <label htmlFor="name">Name: </label>
            <input
              name="name"
              value={formikObject.values.name}
              onChange={formikObject.handleChange}
              onBlur={formikObject.handleBlur}
              id="name"
              type="text"
              className="w-full focus:border-green-700 focus:outline-0 border border-green-500 rounded-2xl px-3 py-1 my-2"
            />
          </div>
          {formikObject.errors.name && formikObject.touched.name && (
            <p className="text-red-400 text-center font-semibold">
              {formikObject.errors.name}
            </p>
          )}

          <div className="">
            <label htmlFor="email">Email: </label>
            <input
              name="email"
              value={formikObject.values.email}
              onChange={formikObject.handleChange}
              onBlur={formikObject.handleBlur}
              id="email"
              type="email"
              className="w-full focus:border-green-700 focus:outline-0 border border-green-500 rounded-2xl px-3 py-1 my-2"
            />
          </div>
          {formikObject.errors.email && formikObject.touched.email && (
            <p className="text-red-400 text-center font-semibold">
              {formikObject.errors.email}
            </p>
          )}

          <div className="">
            <label htmlFor="password">Password: </label>
            <input
              name="password"
              value={formikObject.values.password}
              onChange={formikObject.handleChange}
              onBlur={formikObject.handleBlur}
              id="password"
              type="password"
              className="w-full focus:border-green-700 focus:outline-0 border border-green-500 rounded-2xl px-3 py-1 my-2"
            />
          </div>
          {formikObject.errors.password && formikObject.touched.password && (
            <p className="text-red-400 text-center font-semibold">
              {formikObject.errors.password}
            </p>
          )}

          <div className="">
            <label htmlFor="rePassword">RePassword: </label>
            <input
              name="rePassword"
              value={formikObject.values.rePassword}
              onChange={formikObject.handleChange}
              onBlur={formikObject.handleBlur}
              id="rePassword"
              type="password"
              className="w-full focus:border-green-700 focus:outline-0 border border-green-500 rounded-2xl px-3 py-1 my-2"
            />
          </div>
          {formikObject.errors.rePassword &&
            formikObject.touched.rePassword && (
              <p className="text-red-400 text-center font-semibold">
                {formikObject.errors.rePassword}
              </p>
            )}

          <div className="">
            <label htmlFor="phone">Phone: </label>
            <input
              name="phone"
              value={formikObject.values.phone}
              onChange={formikObject.handleChange}
              onBlur={formikObject.handleBlur}
              id="phone"
              type="tel"
              className="w-full focus:border-green-700 focus:outline-0 border border-green-500 rounded-2xl px-3 py-1 my-2"
            />
          </div>
          {formikObject.errors.phone && formikObject.touched.phone && (
            <p className="text-red-400 text-center font-semibold">
              {formikObject.errors.phone}
            </p>
          )}
          <button
            disabled={formikObject.isSubmitting}
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded-lg mt-2.5 hover:bg-green-400 cursor-pointer"
          >
            {formikObject.isSubmitting ? "Registering..." : "Register"}
          </button>
        </div>
      </form>
    </>
  );
}
