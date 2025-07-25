import axios from "axios";
import { Eye, Heart, ShoppingCart, Star } from "lucide-react";
import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import RelatedProducts from "../RelatedProducts/RelatedProducts";
import { cartContext } from "../../../Context/CartContextProvider";
import { useQuery } from "@tanstack/react-query";
import WishlistProvider, {
  WishlistContext,
} from "../../../Context/WishlistProvider";

export default function ProductDeteails() {
  document.title = 'Product Deteails'

  let { addToCart } = useContext(cartContext);
  let { inWishList, reamoveProduct, addToWishlist } =
    useContext(WishlistContext);
  let { id } = useParams();

  async function getProductDetails() {
    return await axios.get(
      `${import.meta.env.VITE_BASE_URL}/products/${id}`
    );
  }

  let { data, isLoading } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: getProductDetails,
  });

  if (isLoading) {
    return (
      <div className="container py-10 animate-pulse mt-[20vh]">
        <div className="grid grid-cols-[1fr_2fr] gap-5 items-center space-y-2.5 ">
          <div>
            <div className="h-64 bg-gray-200 rounded" />
          </div>

          <div>
            <div className="h-6 bg-gray-200 rounded w-1/2 my-2" />
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="h-6 bg-gray-200 rounded w-full my-2" />

            <div className="flex justify-between items-center mt-2.5">
              <span className="flex items-center justify-center gap-2.5">
                <div className="h-4 bg-gray-200 rounded w-1/3 inline-block" />
              </span>
            </div>

            <div className="flex items-center justify-center gap-5 my-5">
              <div className="px-5 py-2.5 bg-gray-200 rounded cursor-pointer transition-all duration-100" />
              <div className="px-5 py-2.5 bg-gray-200 rounded cursor-pointer transition-all duration-100" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container py-10 mt-[20vh]">
        <div className=" flex justify-between gap-5 items-center flex-col md:flex-row space-y-2.5 ">
          <div className="md:w-[30%]">
            <img
              src={data?.data.data.imageCover}
              className="w-full rounded-2xl dark:shadow-slate-700 shadow-xl"
              alt=""
            />
          </div>

          <div className="md:w-[70%]">
            <h2 className="text-2xl font-semibold text-slate-500">
              {data?.data.data.title}
            </h2>

            <h3 className="text-green-500 text-md my-2.5">
              {data?.data.data.category.name} | {data?.data.data.brand.name}
            </h3>

            <p className="my-2.5 text-slate-600 ">
              {data?.data.data.description}
            </p>

            <div className="flex justify-between items-center mt-2.5 ">
              {data?.data.data.priceAfterDiscount ? (
                <div className="space-x-2.5">
                  <span className="text-sm text-green-800 font-semibold ">
                    {data?.data.data.priceAfterDiscount} EGP
                  </span>
                  <span className="text-sm line-through text-red-500">
                    {data?.data.data.price}
                  </span>
                </div>
              ) : (
                <span className="text-green-800 font-semibold">
                  {data?.data.data.price} EGP
                </span>
              )}

              <span className="flex items-center justify-center gap-2.5 dark:text-slate-500">
                <Star size={16} className="text-yellow-500 text-sm" />
                {data?.data.data.ratingsAverage}
              </span>
            </div>

            <div className="flex md:items-center justify-between flex-col md:flex-row gap-5 my-5">
              {/* Add To WishLis */}
              <div
                className={
                  inWishList
                    ? inWishList?.includes(data?.data.data._id)
                      ? "size-10 hover:bg-red-600/50 bg-red-600 group/icon transition-all duration-300 cursor-pointer  rounded-full flex items-center justify-center"
                      : "size-10 bg-green-600/50 hover:bg-green-600 group/icon transition-all duration-300 cursor-pointer  rounded-full flex items-center justify-center"
                    : "size-10 bg-green-600/50 hover:bg-green-600 group/icon transition-all duration-300 cursor-pointer  rounded-full flex items-center justify-center"
                }
              >
                <Heart
                  onClick={() =>
                    inWishList?.includes(data?.data.data._id)
                      ? reamoveProduct(data?.data.data._id)
                      : addToWishlist(data?.data.data._id)
                  }
                  size={20}
                  className="text-white "
                />
              </div>

              <div className=" flex items-center gap-5 grow">
                {/* Payment */}
                <Link to={"/payment"}>
                  <button className="px-5 py-2.5 bg-green-700 text-white  hover:bg-green-800  rounded-md grow cursor-pointer transition-all duration-100">
                    Buy Now
                  </button>
                </Link>

                {/* Add To Cart */}
                <button
                  onClick={() => {
                    addToCart(data?.data.data._id);
                  }}
                  className="px-5 py-2.5 hover:bg-green-800 hover:text-white  bg-slate-300 text-green-500 rounded-md grow cursor-pointer transition-all duration-100"
                >
                  Add To Cart
                </button>
              </div>
            </div>

            <div className="flex  items-center justify-center gap-5 container flex-wrap  mt-10">
              {data?.data.data.images.map((image)=>(
                <img src={image} className="w-[100px] h-[100px] object-cover"></img>
              ))}
            </div>

          </div>
        </div>
      </div>

      <hr className="text-slate-500 container " />

      <RelatedProducts />
    </>
  );
}