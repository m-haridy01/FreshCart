import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DisplayProducts from "../DisplayProducts/DisplayProducts";
import ToHome from "../ToHome/ToHome";
import toast from "react-hot-toast";

export default function SpecificBrands() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  let [newBrands, SetNewBrands] = useState(null);

  async function GetSameBrands() {
    setLoading(true);
    try {
      let { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/products?brand=${id}`
      );
      SetNewBrands(data.data);
    } catch (err) {
      toast.error(err)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    GetSameBrands();
  }, []);

  if (loading) {
    return (
      <div className="container py-10 mt-[20vh]">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 my-10 animate-pulse ">
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
      </div>
    );
  }

  return (
    <>
      <div>
        {newBrands?.length === 0 ? (
          <div className="container">
            <h2 className="py-15  text-4xl text-center font-semibold text-green-600 my-[20vh] ">
            <ToHome />
              No Products For This Brand
            </h2>
          </div>
        ) : (
          <div className="my-[20vh] container">
            <ToHome/>
            <DisplayProducts products={newBrands} />
          </div>
        )}
      </div>
    </>
  );
}
