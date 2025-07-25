import { Link } from "react-router-dom";
import { useGetMainApis } from "../../Hooks/useGetMainApis";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import ToHome from "../../Components/ToHome/ToHome";
import toast from "react-hot-toast";
import { useEffect } from "react";
export default function Brands() {
  let { data, isLoading, isError, error } = useGetMainApis("brands");

  useEffect(() => {
    document.title = "Brands";
  }, []);

  if (isError) {
    toast.error(error?.message || "Something went wrong");
  }

  if (isLoading) {
    return (
      <div className="container mx-auto my-10 mt-[20vh] animate-pulse">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
          <div className="h-35 w-35 bg-gray-200 ml-5 rounded-full shadow-2xl" />
          <div className="h-35 w-35 bg-gray-200 ml-5 rounded-full shadow-2xl" />
          <div className="h-35 w-35 bg-gray-200 ml-5 rounded-full shadow-2xl" />
          <div className="h-35 w-35 bg-gray-200 ml-5 rounded-full shadow-2xl" />
          <div className="h-35 w-35 bg-gray-200 ml-5 rounded-full shadow-2xl" />
          <div className="h-35 w-35 bg-gray-200 ml-5 rounded-full shadow-2xl" />
          <div className="h-35 w-35 bg-gray-200 ml-5 rounded-full shadow-2xl" />
          <div className="h-35 w-35 bg-gray-200 ml-5 rounded-full shadow-2xl" />
          <div className="h-35 w-35 bg-gray-200 ml-5 rounded-full shadow-2xl" />
          <div className="h-35 w-35 bg-gray-200 ml-5 rounded-full shadow-2xl" />
          <div className="h-35 w-35 bg-gray-200 ml-5 rounded-full shadow-2xl" />
          <div className="h-35 w-35 bg-gray-200 ml-5 rounded-full shadow-2xl" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto my-10 mt-[20vh]">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 items-center justify-center">
          {data?.data.data.map((brand) => (
            <Link
              className="w-fit hover:-translate-y-5 hover:scale-[1.2] transition-all duration-500 cursor-pointer"
              key={brand._id}
              to={`/specificBrands/${brand._id}/${brand.name}`}
            >
              <LazyLoadImage
                src={brand.image}
                alt={brand.name}
                effect="blur"
                className="size-35  bg-white  ml-5 rounded-full shadow-2xl object-contain "
              />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
