import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import ToHome from "../../Components/ToHome/ToHome";
import toast from "react-hot-toast";
import { useEffect } from "react";
export default function Orders() {
  async function getOrders() {
    return await axios.get(
      `${import.meta.env.VITE_BASE_URL}/orders/user/${localStorage.getItem(
        "userId"
      )}`
    );
  }

  let { data, isLoading, isError, error } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  useEffect(() => {
    document.title = "All Orders";
  }, []);

  if (isError) {
    toast.error(error?.message || "Something went wrong");
  }

  if (isLoading) {
    return (
      <div className="container mt-[20vh] animate-pulse">
        <div className="text-2xl bg-gray-200 rounded w-1/2 h-6 mb-6" />
        <div className="w-full border dark:bg-slate-700 dark:border-slate-700 border-main border-dashed rounded-xl mb-6 p-3 sm:p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-sm sm:text-base items-start border-b border-slate-100 dark:border-slate-600 pb-3 dark:text-slate-400">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 py-5">
            <div className="flex flex-col sm:flex-row items-center gap-3 text-main">
              <div className="w-full sm:w-32 h-auto bg-gray-200 rounded" />
              <div className="w-full space-y-2 text-sm sm:text-base text-center sm:text-left">
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          </div>

          <div className="space-y-1 flex items-center flex-wrap gap-5">
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
          <div className="h-6 bg-gray-200 rounded w-1/2 mt-5" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mt-[20vh]">
        <ToHome />
        <h2 className="text-2xl text-main font-bold my-6">Track your orders</h2>

        {data?.data.length === 0 && (
          <p className="text-center text-lg text-gray-500">
            You have no orders yet.
          </p>
        )}

        {data?.data.map((currOrder) => (
          <div
            data-aos="fade-up"
            key={currOrder.id}
            className="w-full border dark:bg-slate-700 dark:border-slate-700 border-main border-dashed rounded-xl mb-6 p-3 sm:p-5"
          >
            {/* Top Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-sm sm:text-base items-start border-b border-slate-100 dark:border-slate-600 pb-3 dark:text-slate-400">
              <p>
                Transaction #:
                <span className="font-semibold"> {currOrder.id}</span>
              </p>
              <p>
                Placed on:
                {new Date(currOrder.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <p>Payment: {currOrder.paymentMethodType}</p>
              <Link
                to="/products"
                className="bg-main text-center text-white py-2 px-4 rounded-lg text-sm"
              >
                Add New Item
              </Link>
            </div>

            {/* Cart Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 py-5">
              {currOrder?.cartItems?.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row items-center gap-3 text-main"
                >
                  <LazyLoadImage
                    src={item?.product?.imageCover}
                    alt={item?.product?.title}
                    effect="blur"
                    className="w-full sm:w-32 h-auto object-cover rounded"
                  />

                  <div className="w-full space-y-2 text-sm sm:text-base text-center sm:text-left">
                    <Link
                      className="hover:text-green-600 font-semibold block"
                      to={`/productDeteails/${item?.product?._id}/${item?.category?.name}`}
                    >
                      {item?.product?.title?.split(" ", 3).join(" ")}
                    </Link>
                    <p className="font-bold">
                      Price: <span className="font-black">{item?.price}</span>{" "}
                      EGP
                    </p>
                    <p>
                      Quantity:{" "}
                      <span className="font-light">{item?.count}</span>
                    </p>
                    <p className="text-xs text-slate-400">
                      {item?.product?.category?.name}
                    </p>
                    <p className="text-xs text-slate-400">
                      {item?.product?.brand?.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Summary */}
            <div className="space-y-1 flex items-center flex-wrap gap-5">
              <p className=" font-semibold text-xl text-main ">
                Products Quantity :
                <span className="text-green-700 dark:text-slate-400">
                  {currOrder?.cartItems?.length}
                </span>
              </p>
              <p className=" font-semibold text-xl text-main ">
                Shipping Price :
                <span className="text-green-700 dark:text-slate-400">
                  {currOrder?.shippingPrice} EGP
                </span>
              </p>
              <p className=" font-semibold text-xl text-main ">
                Taxes :
                <span className="text-green-700 dark:text-slate-400">
                  {currOrder?.taxPrice} EGP
                </span>
              </p>
            </div>
            <p className="  font-semibold text-xl text-main  mt-5">
              Total Order Price :
              <span className="text-green-700 dark:text-slate-400">
                {currOrder?.totalOrderPrice} EGP
              </span>
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
