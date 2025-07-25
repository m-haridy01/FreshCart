import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function VerifyRestCode() {
  document.title = "Verify Rest Code";
  let navigate = useNavigate();
  const [sendAgain, setSendAgain] = useState(false);

  async function sendCode() {
    let loadingTest = toast.loading("loading");
    try {
      let { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/verifyResetCode`,
        {
          resetCode: formikObject.values.resetCode,
        }
      );
      setSendAgain(true);
      toast.success(data.status);
      setTimeout(() => {
        navigate("/restNewPassword");
      }, 2000);
    } catch (err) {
      toast.error(err.response.data.message);
      setSendAgain(true);
    } finally {
      toast.dismiss(loadingTest);
    }
  }

  async function sendCodeAgain() {
    setTimeout(() => {
      navigate("/forgetPassword");
    }, 1000);
  }

  const formikObject = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: sendCode
  });

  return (
    <div className="mt-[20vh] container w-1/2 mx-auto py-15 flex flex-col justify-center dark:text-slate-300 ">
      <form onSubmit={formikObject.handleSubmit} >
        <label htmlFor="resetCode">Received Code: </label>
        <input
          placeholder="Enter Your Received Code Here"
          name="resetCode"
          value={formikObject.values.resetCode}
          onChange={formikObject.handleChange}
          onBlur={formikObject.handleBlur}
          id="resetCode"
          type="text"
          className="w-full focus:border-green-700 focus:outline-0 border border-green-500 rounded-2xl px-3 py-1 my-2"
        />
        <button
          type="submit"
          disabled={formikObject.isSubmitting}
          className={
            sendAgain
              ? "hidden "
              : "bg-green-500 text-white py-2 px-4 rounded-lg mt-2.5 hover:bg-green-400"
          }
        >
          {formikObject.isSubmitting ? "Sending..." : "Send"}
        </button>

        <button
          onClick={() => sendCodeAgain()}
          type="button"
          disabled={formikObject.isSubmitting}
          className={
            sendAgain
              ? "bg-green-500 text-white py-2 px-4 rounded-lg mt-2.5 hover:bg-green-400"
              : "hidden "
          }
        >
          Send Again
        </button>
      </form>
    </div>
  );
}
