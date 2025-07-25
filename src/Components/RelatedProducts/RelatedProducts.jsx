import axios from "axios";
import { Eye, Heart, ShoppingCart, Star } from "lucide-react";
import React, {  useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DisplayProducts from "../DisplayProducts/DisplayProducts";
import ToHome from "../ToHome/ToHome";

export default function RelatedProducts() {
  const [loading, setLoading] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState(null);
  let { categoryName } = useParams();

  async function GetAllProducts() {
    setLoading(true);
    try {
      let { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/products`
      );
      let newProducts = data.data.filter((newProduct) => {
        return newProduct.category.name == categoryName;
      });
      setRelatedProducts(newProducts);
      console.log();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    GetAllProducts();
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
    <div className="container mt-[20vh]">
      <ToHome/>
      <h2 className="p-5 border-b-4 border-green-700 w-fit text-4xl font-semibold text-green-600">
        RELATED PRODUCTS
      </h2>
      
      <div>
        {relatedProducts?.length === 0 ? (
          <h2 className="py-15  text-4xl text-center font-semibold text-green-600">
            No Products For This Category
          </h2>
        ) : (
          <DisplayProducts products={relatedProducts}/>

          
        )}
      </div>
    </div>
  );
}
