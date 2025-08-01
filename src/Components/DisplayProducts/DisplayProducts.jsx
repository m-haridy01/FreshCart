import axios from "axios";
import { Eye, Heart, ShoppingCart, Star } from "lucide-react";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../../../Context/CartContextProvider";
import { WishlistContext } from "./../../../Context/WishlistProvider";
import { useQuery } from "@tanstack/react-query";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import toast from "react-hot-toast";

export default function DisplayProducts({ products }) {
  let { addToCart, disableBtnCart } = useContext(cartContext);
  let { addToWishlist, reamoveProduct, inWishList, disableBtn } =
    useContext(WishlistContext);

  async function GetAllProducts(page) {
    return await axios.get(
      `${import.meta.env.VITE_BASE_URL}/products?page=${page}`
    );
  }

  const { isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: () => GetAllProducts(),
    keepPreviousData: true,
  });

  if (isError) {
    toast.error(error?.response?.data?.message || "Something went wrong");
    return (
      <p className="text-red-500 text-center mt-4">
        Error In loading products.
      </p>
    );
  }

  if (isLoading) {
    return (
      <div className="container grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 my-10 animate-pulse ">
        <div className="shadow relative p-2.5 space-y-2.5">
          <div className="h-32 bg-gray-200" />
          <div className="h-4 bg-gray-200 w-8 rounded absolute top-1.5 left-1.5" />
          <div className="h-4 bg-gray-200 mx-4" />
          <div className="h-4 bg-gray-200 mx-4" />
          <div className="flex justify-between items-center mt-2.5 ">
            <div className="h-4 bg-gray-200 w-16" />
            <div className="flex items-center justify-center gap-2.5">
              <div className="h-4 bg-gray-200 w-6" />
            </div>
          </div>
        </div>
        <div className="shadow relative p-2.5 space-y-2.5">
          <div className="h-32 bg-gray-200" />
          <div className="h-4 bg-gray-200 w-8 rounded absolute top-1.5 left-1.5" />
          <div className="h-4 bg-gray-200 mx-4" />
          <div className="h-4 bg-gray-200 mx-4" />
          <div className="flex justify-between items-center mt-2.5 ">
            <div className="h-4 bg-gray-200 w-16" />
            <div className="flex items-center justify-center gap-2.5">
              <div className="h-4 bg-gray-200 w-6" />
            </div>
          </div>
        </div>
        <div className="shadow relative p-2.5 space-y-2.5">
          <div className="h-32 bg-gray-200" />
          <div className="h-4 bg-gray-200 w-8 rounded absolute top-1.5 left-1.5" />
          <div className="h-4 bg-gray-200 mx-4" />
          <div className="h-4 bg-gray-200 mx-4" />
          <div className="flex justify-between items-center mt-2.5 ">
            <div className="h-4 bg-gray-200 w-16" />
            <div className="flex items-center justify-center gap-2.5">
              <div className="h-4 bg-gray-200 w-6" />
            </div>
          </div>
        </div>
        <div className="shadow relative p-2.5 space-y-2.5">
          <div className="h-32 bg-gray-200" />
          <div className="h-4 bg-gray-200 w-8 rounded absolute top-1.5 left-1.5" />
          <div className="h-4 bg-gray-200 mx-4" />
          <div className="h-4 bg-gray-200 mx-4" />
          <div className="flex justify-between items-center mt-2.5 ">
            <div className="h-4 bg-gray-200 w-16" />
            <div className="flex items-center justify-center gap-2.5">
              <div className="h-4 bg-gray-200 w-6" />
            </div>
          </div>
        </div>
        <div className="shadow relative p-2.5 space-y-2.5">
          <div className="h-32 bg-gray-200" />
          <div className="h-4 bg-gray-200 w-8 rounded absolute top-1.5 left-1.5" />
          <div className="h-4 bg-gray-200 mx-4" />
          <div className="h-4 bg-gray-200 mx-4" />
          <div className="flex justify-between items-center mt-2.5 ">
            <div className="h-4 bg-gray-200 w-16" />
            <div className="flex items-center justify-center gap-2.5">
              <div className="h-4 bg-gray-200 w-6" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* DisplayProducts */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 my-10  ">
        {products?.map((product) => (
          <div
            data-aos="zoom-out-up"
            className="shadow relative py-4 px-3 dark:bg-slate-700 rounded-xl  "
            key={product.id}
          >
            {/* overLay */}
            <div className="hover:bg-black/20 group transition-all duration-300 absolute w-full h-full top-0 left-0 flex justify-center items-center gap-2.5 z-10 rounded-xl">
              {/* Add To WishLis */}
              <div
                className={
                  inWishList
                    ? inWishList?.includes(product._id)
                      ? "size-10   hover:bg-red-600/50 bg-red-600 group/icon transition-all duration-300 cursor-pointer   opacity-0 group-hover:opacity-100 rounded-full flex items-center justify-center"
                      : "size-10   bg-green-600/50 hover:bg-green-600 group/icon transition-all duration-300 cursor-pointer   opacity-0 group-hover:opacity-100 rounded-full flex items-center justify-center"
                    : "size-10   bg-green-600/50 hover:bg-green-600 group/icon transition-all duration-300 cursor-pointer   opacity-0 group-hover:opacity-100 rounded-full flex items-center justify-center"
                }
              >
                <button
                  disabled={disableBtn}
                  className="disabled:cursor-not-allowed cursor-pointer"
                >
                  <Heart
                    onClick={() =>
                      inWishList?.includes(product._id)
                        ? reamoveProduct(product._id)
                        : addToWishlist(product._id)
                    }
                    size={20}
                    className="text-white  "
                  />
                </button>
              </div>

              {/* Add To Cart */}
              <div
                onClick={() => {
                  addToCart(product._id);
                }}
                className="size-10  group/icon transition-all duration-300 cursor-pointer  opacity-0 group-hover:opacity-100  rounded-full bg-green-600/50 hover:bg-green-600 text-white flex items-center justify-center"
              >
                <button
                  disabled={disableBtnCart}
                  className="disabled:cursor-not-allowed cursor-pointer"
                >
                  <ShoppingCart size={20} className="text-white " />
                </button>
              </div>

              {/* Go To Product Details */}
              <Link
                to={`/productDeteails/${product._id}/${product.category.name}`}
              >
                <div className="size-10  group/icon transition-all duration-300 cursor-pointer opacity-0 group-hover:opacity-100  rounded-full bg-green-600/50 hover:bg-green-600 text-white flex items-center justify-center">
                  <Eye size={20} className="text-white " />
                </div>
              </Link>
            </div>

            <LazyLoadImage
              src={product.imageCover}
              alt={product.title}
              effect="blur" // فيه تأثيرات تانية زي opacity أو black-and-white
              className="w-full h-auto rounded-lg"
            />

            {/* Discount */}
            {product.priceAfterDiscount ? (
              <span className="bg-green-700 text-white text-[12px] px-2.5 size-12 flex flex-col items-center justify-center absolute top-1.5 left-1.5 sale">
                <p className="text-amber-500 font-semibold">
                  {Math.floor(
                    ((product.price - product.priceAfterDiscount) /
                      product.price) *
                      100
                  )}
                  %
                </p>
                <p className="text-main font-semibold">Sale</p>
              </span>
            ) : null}

            <div className="z-50">
              <span className="text-green-600 text-[14px] font-semibold  tracking-tighter mb-2.5 ">
                {product.title.split(" ", 2).join(" ")}
              </span>
              <h3 className="text-green-600 text-[14px] tracking-tighter">
                {product.category.name}
              </h3>
              <div className="flex justify-between items-center mt-2.5 ">
                {product.priceAfterDiscount ? (
                  <div className="space-x-2.5">
                    <span className="text-sm text-main font-black dark:text-slate-500 ">
                      {product.priceAfterDiscount} EGP
                    </span>
                    <span className="text-sm line-through text-red-500">
                      {product.price}
                    </span>
                  </div>
                ) : (
                  <span className="dark:text-slate-500 text-main font-black text-sm">
                    {product.price} EGP
                  </span>
                )}

                <span className="flex items-center justify-center gap-2.5 text-main dark:text-slate-500">
                  <Star size={16} className="text-yellow-500 text-sm " />
                  {product.ratingsAverage}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
