import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { cartContext } from "../../../Context/CartContextProvider";

export default function Payment() {
  let { cartId } = useContext(cartContext);
  const [payment, setPayment] = useState(null);
  const phoneRegex = /^01[0125][0-9]{8}$/;

  let navigate = useNavigate();

  async function paymentCash(values) {
    try {
      let { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/orders/${cartId}`,
        {
          shippingAddress: values,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(data);

      toast.success(data.status);
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  }

  async function paymentOnline(values) {
    try {
      let { data } = await axios.post(
        `${
          import.meta.env.VITE_BASE_URL
        }/orders/checkout-session/${cartId}?url=http://localhost:5173`,
        {
          shippingAddress: values,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      if (data.status == "success") {
        window.location.href = data.session.url;
      }
    } catch (err) {
      console.log(err);
    }
  }

  let validationSchema = object({
    phone: string("")
      .required("phone Is Requierd")
      .matches(phoneRegex, "Phone Must Be Egyption Number"),
  });

  let formikObje = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: (x) => {
      if (payment == "cash") {
        paymentCash(x);
      } else paymentOnline(x);
    },
    validationSchema,
  });

  return (
    <>
      {/* PayMent */}

      <div className=" h-full rounded-lg border bg-white p-6 shadow-md  my-5 dark:bg-slate-700 mt-[20vh] container">
        <form onSubmit={formikObje.handleSubmit}>
          <div className="relative z-0 w-full mb-5 group text-slate-500">
            <input
              type="text"
              name="details"
              value={formikObje.values.details}
              onChange={formikObje.handleChange}
              onBlur={formikObje.handleBlur}
              id="floating_details"
              className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="floating_details"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y- scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Details
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group text-black">
            <input
              type="tel"
              name="phone"
              value={formikObje.values.phone}
              onChange={formikObje.handleChange}
              onBlur={formikObje.handleBlur}
              id="floating_phone"
              className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="floating_phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y- scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone
            </label>
          </div>
          {formikObje.errors.phone && formikObje.touched.phone && (
            <p className="text-red-400 text-center font-semibold">
              {formikObje.errors.phone}
            </p>
          )}

          <div className="relative z-0 w-full mb-5 group text-black">
            <input
              type="text"
              name="city"
              value={formikObje.values.city}
              onChange={formikObje.handleChange}
              onBlur={formikObje.handleBlur}
              id="floating_city"
              className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="floating_city"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y- scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              City
            </label>
          </div>

          <div className="flex items-center justify-center gap-2.5">
            <button
              onClick={() => setPayment("cash")}
              type="submit"
              className="mt-6 transition-all duration-300  cursor-pointer w-full rounded-md bg-main hover:bg-green-600 py-1.5 font-medium text-white"
            >
              Cash
            </button>

            <button
              onClick={() => setPayment("online")}
              type="submit"
              className="mt-6 transition-all duration-300  cursor-pointer w-full rounded-md bg-slate-300 py-1.5 font-medium text-slate-600 hover:text-white hover:bg-main"
            >
              Online
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
