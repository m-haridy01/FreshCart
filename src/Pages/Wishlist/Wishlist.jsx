import React, { useContext, useEffect } from "react";
import { WishlistContext } from "../../../Context/WishlistProvider";
import { Heart } from "lucide-react";
import { cartContext } from "../../../Context/CartContextProvider";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import ToHome from "../../Components/ToHome/ToHome";
export default function Wishlist() {
  let { getUserWishList, Wishlist, reamoveProduct, removeAll, loading } =
    useContext(WishlistContext);
  let { addToCart } = useContext(cartContext);

  useEffect(() => {
    getUserWishList();
  }, []);

  useEffect(() => {
    document.title = "Wishlist";
  }, []);

  if (loading) {
    return (
      <div className="mt-[20vh] mb-[5vh] container bg-gray-100 rounded-xl p-5 dark:bg-gray-700 animate-pulse">
        <div className="flex items-center gap-3">
          <div className="h-6 bg-gray-200 rounded w-3/12" />
          <div className="size-6 rounded-full flex items-center justify-center bg-main">
            <div className="h-8 w-8 bg-gray-200 rounded-full" />
          </div>
        </div>
        <div className="flex items-center justify-between flex-col lg:flex-row gap-5 not-last-of-type:border-b border-gray-600 py-5">
          <div className="flex items-center gap-3">
            <div className="image bg-gray-200 rounded-2xl w-[100px] h-[100px] md:w-[150px] md:h-[200px] shadow-xl border border-gray-300" />
            <div className="space-y-1.5">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
            </div>
          </div>
          <div className="ml-auto">
            <div className="flex items-center gap-2">
              <div className="h-8 w-24 bg-gray-200 rounded" />
              <div className="h-8 w-24 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mt-[20vh] mb-[5vh] container bg-slate-100 rounded-xl p-5 dark:bg-slate-700">
        {Wishlist?.length === 0 && (
          <p className="text-center text-gray-500 font-semibold my-10">
            Your wishlist is empty 
          </p>
        )}
        {/* top */}
        <div className="flex items-center gap-3">
          <ToHome />
          <h2 className="text-main text-2xl font-semibold ">
            Favorite Products
          </h2>
          <span className="size-6 rounded-full flex items-center justify-center bg-main">
            <Heart size={12} className="text-white " />
          </span>
        </div>

        <div>
          {Wishlist?.map((product) => (
            <div
              key={product?._id}
              data-aos="zoom-out-up"
              className="flex items-center justify-between flex-col lg:flex-row gap-5 not-last-of-type:border-b border-slate-600 py-5 "
            >
              {/* Left */}
              <div className="flex items-center gap-3">
                <div className="image bg-white rounded-2xl w-[100px] h-[100px] md:w-[150px] md:h-[200px] shadow-xl border border-slate-300">
                  <LazyLoadImage
                    src={product?.imageCover}
                    alt={product?.title}
                    effect="blur"
                    className="w-full rounded-2xl"
                  />
                </div>

                <div className="space-y-1.5">
                  <p className="text-main font-black ">
                    {product?.title?.split(" ", 3).join(" ")}
                  </p>
                  <p className="text-main font-bold text-sm ">
                    Rate :
                    <span className="text-main font-medium">
                      {product?.ratingsAverage}
                    </span>
                  </p>
                  <p className="text-main font-bold text-sm ">
                    Price :
                    <span className="text-main font-medium">
                      {product?.price} EGP
                    </span>
                  </p>
                  <p className="text-slate-400 font-bold text-sm ">
                    {product?.category?.name} | {product?.brand?.name} |
                    <span className="text-main">
                      {product?.quantity <= 0 ? " Not Available" : " Available"}
                    </span>
                  </p>
                </div>
              </div>

              {/* Right */}
              <div className="ml-auto ">
                <div className="flex items-center gap-2 ">
                  <button
                    disabled={loading}
                    onClick={() => addToCart(product?._id)}
                    className="bg-main p-2 px-5 rounded-full text-sm  text-white cursor-pointer "
                  >
                    Add To Cart
                  </button>
                  <button
                    onClick={() => reamoveProduct(product?._id)}
                    className="bg-red-500 p-2 px-5 rounded-full text-sm  text-white cursor-pointer "
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            className="bg-red-500 text-white py-3 px-5 rounded-full cursor-pointer "
            onClick={removeAll}
          >
            Clear My Wish List
          </button>
        </div>
      </div>
    </>
  );
}
