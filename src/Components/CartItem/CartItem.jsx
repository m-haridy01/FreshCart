import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../../../Context/CartContextProvider";
import { Star, Trash } from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function CartItem({ item }) {
  let { removeCartItem, updateCartItem, disableBtnCart } =
    useContext(cartContext);
  const [count, setCount] = useState(item?.count);

  function updateCount() {
    if (count == item?.count) {
      return;
    }
    updateCartItem(item.product._id, count);
  }

  useEffect(() => {
    setCount(item?.count);
  }, [item.count]);

  return (
    <>
      <div
        data-aos="zoom-out-left"
        className="flex flex-col md:flex-row items-center md:items-start justify-between gap-5 mb-6 rounded-lg bg-white p-6 shadow-md dark:bg-slate-700"
      >
        <LazyLoadImage
          src={item?.product.imageCover}
          alt={item?.product.title}
          effect="blur"
          className="w-[200px] rounded-lg"
        />

        <div className="">
          <div className="mt-5 space-y-1.5">
            <h2 className="text-md mb-2 text-main font-black">
              {item?.product.title.split(" ", 3).join(" ")}
            </h2>
            <p className="font-extrabold text-main flex items-center gap-1.5 ">
              Rate: <Star size={15} className="text-yellow-400" />
              <span className="font-light text-sm text-green-500">
                {item?.product.ratingsAverage}
              </span>
            </p>

            <p className="font-extrabold text-main flex items-center gap-1.5 ">
              Price:
              <span className="font-light text-sm text-green-500">
                {item.price * item.count} EGP
              </span>
            </p>

            <p className="my-2.5 text-xs text-gray-400">
              {item?.product?.category?.name} | {item?.product?.brand?.name} |{" "}
              <span className="text-main">
                {item?.product?.quantity <= 0 ? " Not Available" : " Available"}
              </span>
            </p>
          </div>
          {/* Updating */}
          <div className="mt-4 flex flex-col space-y-5 sm:flex-row justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
            <div className="flex items-center">
              <button
                disabled={disableBtnCart}
                onClick={() => {
                  updateCartItem(item?.product?._id, item.count - 1);
                }}
                className=" cursor-pointer disabled:cursor-not-allowed rounded-l bg-slate-100 dark:bg-slate-400 py-1 px-3.5 duration-100 hover:bg-main hover:text-blue-50"
              >
                -
              </button>
              <input
                className="h-8 w-20 bg-white text-center text-xs outline-none dark:bg-slate-400"
                type="number"
                value={count}
                min={1}
                onChange={(e) => {
                  const newCount = parseInt(e.target.value);
                  if (!isNaN(newCount) && newCount > 0) {
                    setCount(newCount);
                  }
                }}
                onBlur={updateCount}
              />
              <button
                disabled={disableBtnCart}
                onClick={() => {
                  updateCartItem(item?.product?._id, item.count + 1);
                }}
                className="cursor-pointer disabled:cursor-not-allowed  rounded-r bg-gray-100 dark:bg-slate-400 py-1 px-3 duration-100 hover:bg-main hover:text-blue-50"
              >
                +
              </button>
            </div>
            
            <button
              onClick={() => removeCartItem(item.product._id)}
              disabled={disableBtnCart}
              className="flex items-center gap-1 cursor-pointer duration-150 disabled:cursor-not-allowed
              text-red-600 hover:text-red-500"
            >
              <span>Delete</span>
              <Trash />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
