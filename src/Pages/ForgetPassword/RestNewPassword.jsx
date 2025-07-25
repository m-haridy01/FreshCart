import axios from "axios";
import { useFormik } from "formik";
import { useContext } from "react";
import toast from "react-hot-toast";
import { object, string } from "yup";
import { AuthContext } from "../../../Context/TokenContext";

export default function RestNewPassword() {
  document.title = 'Rest New Password'

  let { setToken } = useContext(AuthContext);
  const passwordRegex = /^[A-Z][a-z0-9]{5,}$/;

  async function ChangPassword() {
    let loadingTest = toast.loading("loading");
    try {
      let { data } = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/auth/resetPassword`,
        {
          email: formikObject.values.email,
          newPassword: formikObject.values.newPassword,
        }
      );
      toast.success("Your password has been changed successfully ");
      setToken(data.token);
      localStorage.setItem('token', data.token)
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      toast.dismiss(loadingTest);
    }
  }

  let validationSchema = object({
    email: string("Email Must Be String")
      .required("Email Is Requierd")
      .email("Email Must Be Valid"),
    newPassword: string("")
      .required("password Is Requierd")
      .matches(
        passwordRegex,
        "Password Must Start By Capital Letter And More Than 6 Chars"
      ),
  });

  const formikObject = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: ChangPassword
  });

  return (
    <form onSubmit={formikObject.handleSubmit} className="mt-[20vh] container w-1/2 mx-auto py-15 flex flex-col justify-center  dark:text-slate-300">
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
          name="newPassword"
          value={formikObject.values.newPassword}
          onChange={formikObject.handleChange}
          onBlur={formikObject.handleBlur}
          id="password"
          type="password"
          className="w-full focus:border-green-700 focus:outline-0 border border-green-500 rounded-2xl px-3 py-1 my-2"
        />
      </div>

      {formikObject.errors.newPassword && formikObject.touched.newPassword && (
        <p className="text-red-400 text-center font-semibold">
          {formikObject.errors.newPassword}
        </p>
      )}

      <button
        disabled={formikObject.isSubmitting}
        type="submit"
        className="bg-green-500 text-white py-2 px-4 rounded-lg mt-2.5 hover:bg-green-400"
      >
        Send
      </button>

    </form>
  );
}
