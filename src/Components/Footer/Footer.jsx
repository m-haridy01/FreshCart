import React from "react";
import amazonLogo from "../../assets/images/amazon-pay.png";
import American from "../../assets/images/American-Express-Color.png";
import mastercard from "../../assets/images/mastercard.webp";
import paypal from "../../assets/images/paypal.png";
import appleStore from "../../assets/images/get-apple-store.png";
import googleStore from "../../assets/images/get-google-play.png";
export default function Footer() {
  return (
    <footer className=" py-10 bg-slate-300 dark:bg-slate-800">
      <div className="container space-y-5 ">
        <div>
          <h2 className="text-2xl text-slate-600 font-semibold ">
            Get The FreshCart App
          </h2>
          <p className="text-slate-400 my-2">
            We Will Send You a Link Open It In Your Phone To Download The App
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pl-10">
          <input
            className="px-2 py-1.5 rounded-md focus:outline-0 sm:grow-1 dark:border-0 border-2 border-slate-200 bg-white dark:bg-slate-400"
            type="email"
            placeholder="Email..."
          />
          <button className="bg-main py-2 text-sm cursor-pointer px-3 text-white rounded-md ">
            Share App Link
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2   gap-3 justify-center lg:justify-between items-center">
          <div className="flex flex-col md:flex-row items-center gap-5">
            <p className="text-slate-600 dark:text-slate-300">Payment Partnes </p>
            <div className="flex  items-center gap-5">
              <img className="w-15 md:w-18 lg:w-21" src={amazonLogo} alt="" />
              <img className="w-15 md:w-18 lg:w-21" src={American} alt="" />
              <img className="w-15 md:w-18 lg:w-21" src={mastercard} alt="" />
              <img className="w-15 md:w-18 lg:w-21" src={paypal} alt="" />
            </div>
          </div>

          <div className="flex flex-col md:flex-row  items-center gap-5">
            <p className="text-slate-600 dark:text-slate-300">Get Deliveries With FreshCart</p>
            <div className="flex  items-center gap-5">
              <img className="w-21" src={appleStore} alt="" />
              <img className="w-21" src={googleStore} alt="" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
