import axios from "axios";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";

export default function ForgetPassword() {
  let navigate = useNavigate();

  async function sendEmail() {
    let loadingTest = toast.loading("loading");
    try {
      let { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/forgotPasswords`,
        {
          email: formikObject.values.email,
        }
      );
      console.log(data);
      toast.success(data.message);
      setTimeout(() => {
        navigate("/verifyRestCode");
      }, 2000);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    } finally {
      toast.dismiss(loadingTest);
    }
  }

  let validationSchema = object({
    email: string("Email Must Be String")
      .required("Email Is Requierd")
      .email("Email Must Be Valid"),
  });

  const formikObject = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: sendEmail
  });

  return (
    <div className="mt-[20vh] container w-1/2 mx-auto py-15 flex flex-col justify-center dark:text-slate-300 ">
      <form onSubmit={formikObject.handleSubmit}>
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
      {formikObject.errors.email && formikObject.touched.email && (
        <p className="text-red-400 text-center font-semibold">
          {formikObject.errors.email}
        </p>
      )}
      <button
        type="submit"
        disabled={formikObject.isSubmitting}
        className="bg-green-500 text-white py-2 px-4 rounded-lg mt-2.5 hover:bg-green-400"
      >
        {formikObject.isSubmitting ? "Sending..." : "Send Me Code"}
      </button>
      </form>
    </div>
  );
}
