import { Link } from "react-router-dom";
import { useGetMainApis } from "../../Hooks/useGetMainApis";
import ToHome from "../../Components/ToHome/ToHome";
import toast from "react-hot-toast";
import { useEffect } from "react";

export default function Categories() {

  let { data, isLoading, isError, error } = useGetMainApis("categories");

    useEffect(() => {
  document.title = "Categories";
}, []);

  if (isError) {
    toast.error(error?.message || "Something went wrong");
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-5 my-5 animate-pulse mt-[20vh] container">
        <div className="border-4 border-gray-200 rounded-2xl">
          <div className="w-full h-[180px] bg-gray-200 rounded-2xl" />
          <div className="py-2.5 h-4 bg-gray-200 rounded w-full" />
        </div>
        <div className="border-4 border-gray-200 rounded-2xl">
          <div className="w-full h-[180px] bg-gray-200 rounded-2xl" />
          <div className="py-2.5 h-4 bg-gray-200 rounded w-full" />
        </div>
        <div className="border-4 border-gray-200 rounded-2xl">
          <div className="w-full h-[180px] bg-gray-200 rounded-2xl" />
          <div className="py-2.5 h-4 bg-gray-200 rounded w-full" />
        </div>
        <div className="border-4 border-gray-200 rounded-2xl">
          <div className="w-full h-[180px] bg-gray-200 rounded-2xl" />
          <div className="py-2.5 h-4 bg-gray-200 rounded w-full" />
        </div>
        <div className="border-4 border-gray-200 rounded-2xl">
          <div className="w-full h-[180px] bg-gray-200 rounded-2xl" />
          <div className="py-2.5 h-4 bg-gray-200 rounded w-full" />
        </div>
        <div className="border-4 border-gray-200 rounded-2xl">
          <div className="w-full h-[180px] bg-gray-200 rounded-2xl" />
          <div className="py-2.5 h-4 bg-gray-200 rounded w-full" />
        </div>
      </div>
    );
  }



  return (
    <>
      <div className="mt-[20vh] container">
        <div className="text-center  text-main  border-y border-slate-300 dark:bg-slate-700 py-2">
          Shop by category
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-5 my-5">
          {data?.data.data.map((category) => (
            <Link
              data-aos="zoom-out-up"
              to={`/relatedProducts/${category._id}/${category.name}`}
              key={category._id}
            >
              <div className="border-4 border-slate-100 rounded-2xl group">
                <img
                  src={category?.image}
                  className="w-full h-[180px] object-cover space-x-1.5 rounded-2xl group-hover:scale-105 transition-all duration-300"
                  alt={category?.name}
                />
              </div>
              <p className=" py-2.5 text-sm font-semibold pl-2.5 w-full text-main">
                {category?.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
