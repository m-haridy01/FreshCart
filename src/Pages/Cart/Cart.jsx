import { useContext, useEffect } from "react";
import { cartContext } from "../../../Context/CartContextProvider";
import CartItem from "../../Components/CartItem/CartItem";
import Payment from "../../Components/Payment/Payment";
import ToHome from "../../Components/ToHome/ToHome";

export default function Cart() {

  let { cart, getUserCart, loading, clearCart } = useContext(cartContext);

  useEffect(() => {
    getUserCart();
  }, []);

useEffect(() => {
  document.title = "Cart";
}, []);

  if (loading) {
    return (
      <div className="bg-gray-100 py-20 mt-[10vh] dark:bg-slate-900 animate-pulse">
        
        <div className="flex flex-col lg:flex-row justify-center gap-5 px-4 sm:px-6 md:px-10">
          <div className="w-full lg:w-2/3">
            <div className="h-20 bg-gray-200 rounded w-full my-2" />
            <div className="h-20 bg-gray-200 rounded w-full my-2" />
            <div className="h-20 bg-gray-200 rounded w-full my-2" />
          </div>

          <div className="mt-6 h-full lg:w-1/3 rounded-lg border bg-white p-6 shadow-md  my-5 dark:bg-slate-700">
            <div className="h-5 bg-gray-200 rounded w-full mb-2.5" />
            <hr className="my-4 text-slate-500" />
            <div className="flex justify-between">
              <div className="h-5 bg-gray-200 rounded w-1/2" />
              <div className="h-5 bg-gray-200 rounded w-1/4" />
            </div>
            <div className="h-10 bg-gray-200 rounded w-full my-2" />
          </div>
        </div>

      </div>
    );
  }

  return (
    <>
      <div className=" bg-gray-100 pt-20 mt-[10vh] dark:bg-slate-900 ">
        <h1 className="mb-10 text-center container text-4xl font-black text-main flex items-center justify-start gap-5">
          <ToHome />
          Cart Items
        </h1>

        <div className="flex flex-col lg:flex-row justify-center gap-5 px-4 sm:px-6 md:px-10">
          {/* Cart Items */}
          <div className="w-full lg:w-2/3">
            {cart?.products.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          </div>

          {/* PayMent */}
          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md  my-5 dark:bg-slate-700">
            <button
              onClick={() => clearCart()}
              className="mb-2.5 cursor-pointer w-full rounded-md  py-1.5 font-medium dark:bg-slate-500 bg-slate-200  hover:bg-red-500 transition-all duration-300 "
            >
              Clear My Cart
            </button>
            <hr className="my-4 text-slate-500" />
            <div className="flex justify-between">
              <p className="text-lg font-bold text-slate-500 dark:text-slate-200">
                Total
              </p>
              <div>
                <p className="mb-1 text-lg font-bold text-slate-500 dark:text-slate-200">
                  {cart?.totalCartPrice} EGP
                </p>
              </div>
            </div>

            <Payment />
          </div>
        </div>
      </div>
    </>
  );
}
