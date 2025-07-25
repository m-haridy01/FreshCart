import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let WishlistContext = createContext();

export default function WishlistProvider({ children }) {
  const [Wishlist, setWishlist] = useState(null);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [inWishList, setInWishList] = useState(null);

  async function addToWishlist(productId) {
    setLoading(true);
    try {
      let { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/wishlist`,
        { productId },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setCount(data.data.length)
      setInWishList(data.data);
      localStorage.setItem("MyWishList", JSON.stringify(data.data));
      toast.success(data.message + "  💚");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function getUserWishList() {
    setLoading(true);
    try {
      let { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/wishlist`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setWishlist(data.data);
      setCount(data.count);
      const ids = data.data.map((item) => item._id);
      setInWishList(ids);
      localStorage.setItem("MyWishList", JSON.stringify(ids));
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function reamoveProduct(id) {
    setLoading(true);
    try {
      let { data } = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/wishlist/${id}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      getUserWishList();
      setInWishList(data.data)
      setCount(data.data.length)
      localStorage.setItem("MyWishList", JSON.stringify(data.data));
      toast.success("Removed From WishList");
    } catch (err) {
      toast.error(err?.response?.data?.message || "An error occurred while deleting This product .❌");
    } finally {
      setLoading(false);
    }
  }

  async function removeAll() {
    try {
      setLoading(true);
      for (let item of Wishlist) {
        await axios.delete(
          `${import.meta.env.VITE_BASE_URL}/wishlist/${item._id}`,
          {
            headers: { token: localStorage.getItem("token") },
          }
        );
      }
      toast.success("All products have been successfully removed From WishList.");
      getUserWishList();
      setInWishList([]);
      localStorage.setItem("MyWishList", JSON.stringify([]));
    } catch (err) {
      toast.error(err?.response?.data?.message || "An error occurred while deleting all products.❌");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
  const saved = localStorage.getItem("MyWishList");
  if (saved) {
    setInWishList(JSON.parse(saved));
  } else {
    getUserWishList();
  }
}, []);

  return (
    <WishlistContext.Provider
      value={{
        addToWishlist,
        getUserWishList,
        reamoveProduct,
        removeAll,
        inWishList,
        Wishlist,
        count,
        loading,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
