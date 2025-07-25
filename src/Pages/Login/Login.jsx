import axios from "axios";
import { useFormik } from "formik";
import { useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { AuthContext } from "../../../Context/TokenContext";

export default function Login() {
  document.title = "Login";

  const passwordRule = /^[A-Z][A-Za-z0-9]{5,}$/;

  let validationSchema = object({
    email: string().required("Email Is Required").email("Email Must Be Valid"),
    password: string()
      .required("Password Is Required")
      .matches(
        passwordRule,
        "Password Must Start By Capital Letter And More Than 6 Chars"
      ),
  });

  const Navigate = useNavigate();

  const formikObject = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handleLoging,
    validationSchema,
  });

  let { setToken } = useContext(AuthContext);

  async function handleLoging(values) {
    let loadingTest = toast.loading("loading");
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/signin`,
        values
      );
      toast.success("You have successfully logged in");
      localStorage.setItem("token", data.token);
      setToken(data.token);
      Navigate("/");
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
    } finally {
      toast.dismiss(loadingTest);
    }
  }

  function goToForgetPass() {
    Navigate("/forgetPassword");
  }

  return (
    <>
      <form onSubmit={formikObject.handleSubmit}>
        <div className="container w-1/2 mx-auto py-16 mt-[15vh] dark:text-slate-300">
          <h2 className="text-2xl py-5">Login Now</h2>

          <div>
            <label htmlFor="email">Email: </label>
            <input
              className="w-full focus:border-green-700 focus:outline-0 border border-green-500 rounded-2xl px-3 py-1 my-2"
              name="email"
              type="email"
              id="mail"
              value={formikObject.values.email}
              onChange={formikObject.handleChange}
              onBlur={formikObject.handleBlur}
            />

            {formikObject.errors.email && formikObject.touched.email && (
              <p className="text-red-400 text-center font-semibold">
                {formikObject.errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="password">password: </label>
            <input
              className="w-full focus:border-green-700 focus:outline-0 border border-green-500 rounded-2xl px-3 py-1 my-2"
              name="password"
              type="password"
              id="password"
              value={formikObject.values.password}
              onChange={formikObject.handleChange}
              onBlur={formikObject.handleBlur}
            />
            {formikObject.errors.password && formikObject.touched.password && (
              <p className="text-red-400 text-center font-semibold">
                {formikObject.errors.password}
              </p>
            )}
          </div>

          <div className="flex items-center gap-5">
            <button
              disabled={formikObject.isSubmitting}
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded-lg mt-2.5 hover:bg-green-400"
            >
              Login
            </button>

            <p
              onClick={goToForgetPass}
              className="text-sm pt-4 text-main underline cursor-pointer hover:text-green-500"
            >
              Forget Password
            </p>
          </div>
        </div>
      </form>
    </>
  );
}
