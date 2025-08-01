import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Slider from "react-slick";

export default function CategoriesSlider() {
  async function getAllCategories() {
    return await axios.get(`${import.meta.env.VITE_BASE_URL}/categories`);
  }

  let { data, isLoading, isError, error } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    loop: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (isError) {
    toast.error(error?.response?.data?.message || "Something went wrong");
    return <p className="text-red-500">Failed to load categories.</p>;
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 my-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="w-full h-[250px] bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 mt-2 w-3/4 rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="slider-container container">
        <Slider {...settings} className="my-8 ">
          {data?.data.data.map((category) => (
            <Link
              to={`/relatedProducts/${category._id}/${category.name}`}
              key={category._id}
            >
              <div>
                <img
                  src={category?.image}
                  className="w-full h-[250px] object-cover space-x-1.5"
                  alt={category?.name}
                />
                <p className="bg-slate-200 dark:bg-slate-700 py-2.5 text-sm font-semibold pl-2.5 w-full text-main">
                  {category?.name}
                </p>
              </div>
            </Link>
          ))}
        </Slider>
      </div>
    </>
  );
}
