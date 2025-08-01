import axios from "axios";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";
import TokenContext, { AuthContext } from "./TokenContext";

export let cartContext = createContext();

export default function CartContextProvider({ children }) {
  const { token } = useContext(AuthContext);
  const [cart, setCart] = useState(null);
  const [cartId, setCartId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [disableBtnCart, setDisableBtnCart] = useState(false);
  const [numOfCartItems, setNumberOfCarts] = useState(null);

  const getUserCart = useCallback(async (showLoading = true) => {
    if (showLoading) setLoading(true);
    try {
      let { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/cart`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setCartId(data.cartId);
      setCart(data?.data);
      setNumberOfCarts(data.numOfCartItems);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  const addToCart = useCallback(
    async (productId) => {
      let loadingTest = toast.loading("Loading...");
      setDisableBtnCart(true);
      try {
        await axios.post(
          `${import.meta.env.VITE_BASE_URL}/cart`,
          {
            productId,
          },
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        await getUserCart(false);
        toast.success("The product has been added successfully.");
      } catch (err) {
        toast.error(err.message);
      } finally {
        toast.dismiss(loadingTest);
        setDisableBtnCart(false);
      }
    },
    [getUserCart]
  );

  const removeCartItem = useCallback(
    async (id) => {
      let loadingTest = toast.loading("Loading...");
      setDisableBtnCart(true);
      try {
        await axios.delete(`${import.meta.env.VITE_BASE_URL}/cart/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        await getUserCart(false);
        toast.success("The product has been successfully deleted.");
      } catch (err) {
        toast.error(err.message);
      } finally {
        toast.dismiss(loadingTest);
        setDisableBtnCart(false);
      }
    },
    [getUserCart]
  );

  const clearCart = useCallback(async () => {
    let loadingTest = toast.loading("Loading...");
    setDisableBtnCart(true);

    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/cart`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      await getUserCart(false);
      toast.success("All products have been successfully removed.");
    } catch (err) {
      toast.error(err.message);
    } finally {
      toast.dismiss(loadingTest);
      setDisableBtnCart(false);
    }
  }, [getUserCart]);

  const updateCartItem = useCallback(
    async (cartId, count) => {
      let loadingTest = toast.loading("Loading...");
      setDisableBtnCart(true);
      try {
        await axios.put(
          `${import.meta.env.VITE_BASE_URL}/cart/${cartId}`,
          {
            count,
          },
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        await getUserCart(false);
        toast.success("Modified successfully ✔");
      } catch (err) {
        toast.error(err.response.data.message);
      } finally {
        setDisableBtnCart(false);
        toast.dismiss(loadingTest);
      }
    },
    [getUserCart]
  );

  useEffect(() => {
    if (token) getUserCart();
  }, [token]);

  return (
    <cartContext.Provider
      value={{
        cartId,
        disableBtnCart,
        // setDisableBtn,
        updateCartItem,
        addToCart,
        getUserCart,
        cart,
        numOfCartItems,
        loading,
        removeCartItem,
        clearCart,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
