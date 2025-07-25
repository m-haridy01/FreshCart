import React, { useEffect, useState } from "react";
import DisplayProducts from "../../Components/DisplayProducts/DisplayProducts";
import CategoriesSlider from "../../Components/CategoriesSlider/CategoriesSlider";
import MainSlider from "../../Components/MainSlider/MainSlider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";
import toast from "react-hot-toast";

export default function Home() {
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);

  async function GetAllProducts(page) {
    return await axios.get(
      `${import.meta.env.VITE_BASE_URL}/products?page=${page}`
    );
  }

  function setChangePage(x) {
    setPage(x);
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products", page],
    queryFn: () => GetAllProducts(page),
    keepPreviousData: true,
  });

  useEffect(() => {
    if (data?.data?.metadata) {
      setPagination(data.data.metadata);
    }
  }, [data]);

  useEffect(() => {
    document.title = "Home";
  }, []);

  if (isError) {
    toast.error(error?.response?.data?.message || "Something went wrong");
    return (
      <div className="text-red-500 text-center mt-10">
        Error In loading products
      </div>
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="">
        <div className="container">
          <MainSlider />

          <CategoriesSlider />

          <div className="px-10 border-b-4 text-main  border-green-700 text-3xl  font-medium w-fit mx-auto text-center py-2 my-10 ">
            Shope Now By Popular Products
          </div>

          <DisplayProducts products={data?.data.data} />

          {/* pagination */}
          <div className="my-5 flex items-center justify-center gap-5 ">
            {[...Array(pagination?.numberOfPages)].map((item, index) => (
              <button
                key={index + 1}
                onClick={() => {
                  setChangePage(index + 1);
                }}
                className="size-8 cursor-pointer text-center text-white bg-green-500 dark:bg-slate-700 rounded-full hover:bg-main transition-all duration-500"
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
