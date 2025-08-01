import React, { useEffect, useState } from "react";
import DisplayProducts from "../../Components/DisplayProducts/DisplayProducts";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export default function Products() {
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [searchLetter, setSearchLetter] = useState(null);
  const [searchedProducts, setSearchedProducts] = useState(null);

  async function GetAllProducts(page) {
    return await axios.get(
      `${import.meta.env.VITE_BASE_URL}/products?page=${page}`
    );
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products", page],
    queryFn: () => GetAllProducts(page),
    keepPreviousData: true,
  });

  function setChangePage(x) {
    setPage(x);
  }

  useEffect(() => {
    if (data?.data?.metadata) {
      setPagination(data.data.metadata);
    }
  }, [data]);

  useEffect(() => {
    if (searchLetter?.trim()) {
      const filtered = data?.data?.data?.filter((product) =>
        product.title.toLowerCase().includes(searchLetter.toLowerCase())
      );
      setSearchedProducts(filtered);
    } else {
      setSearchedProducts(null);
    }
  }, [searchLetter, data]);

  useEffect(() => {
    document.title = "Products";
  }, []);

  if (isError) {
    toast.error(error?.message || "Something went wrong");
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
      <div className="container mt-[20vh]">
        <div className="flex items-center justify-evenly  ">
          <input
            type="text"
            onInput={(e) => setSearchLetter(e.target.value)}
            value={searchLetter || ""}
            placeholder="Search..."
            className="bg-slate-300 py-2 px-10 lg:px-20  rounded-full placeholder:text-slate-500 focus:outline-0"
          />
        </div>

        {searchedProducts ? (
          searchedProducts.length === 0 ? (
            <h2 className="py-25  text-4xl text-center font-semibold text-green-600">
              No Products For This Search
            </h2>
          ) : (
            <DisplayProducts products={searchedProducts} />
          )
        ) : (
          <DisplayProducts products={data?.data.data} />
        )}

        {/* pagination */}
        {!searchedProducts && (
          <div className="my-5 flex items-center justify-center gap-5 ">
            <div className="my-5 flex items-center justify-center gap-5 ">
              {[...Array(pagination?.numberOfPages)].map((item, index) => (
                <button
                  key={index + 1}
                  onClick={() => {
                    setChangePage(index + 1);
                  }}
                  className="size-8 cursor-pointer text-center text-white bg-green-500 dark:bg-slate-700 rounded-full "
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
