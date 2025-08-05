
import Loading from "../../Components/Loading/Loading.jsx";
import Products from "../Products/Products.jsx";
import MainSlider from "./../../Components/MainSlider/MainSlider";
import CategoriesSlider from "../../Components/CategoriesSlider/CategoriesSlider.jsx";
import DisplayProducts from "../../Components/DisplayProducts/DisplayProducts.jsx";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);

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
    document.title = "Home";
  }, []);

  if (isError) {
    toast.error(error?.response?.data?.message || "Something went wrong");
    return (
      <p className="text-red-500 text-center mt-4">
        Error In loading products.
      </p>
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container overflow-hidden">
      <MainSlider />
      <CategoriesSlider />
      <DisplayProducts products={data?.data.data} />

      <div className="my-5 flex items-center justify-center gap-5 ">
        <div className="my-5 flex items-center justify-center gap-5 ">
          {[...Array(pagination?.numberOfPages)].map((item, index) => (
            <button
              key={index + 1}
              onClick={() => {
                setChangePage(index + 1);
              }}
              className="size-8 cursor-pointer text-center text-white hover:bg-green-800 dark:hover:bg-main bg-green-500 dark:bg-slate-700 rounded-full transition-all duration-300"
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
