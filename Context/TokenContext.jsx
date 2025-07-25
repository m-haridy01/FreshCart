import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let AuthContext = createContext();

export default function TokenContext({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));


  async function verifyToken() {
    try {
      let { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/auth/verifyToken`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      localStorage.setItem('userId', data.decoded.id)      
    } catch (err) {
      toast.error(err.response.data.message );
      setToken(null)
      localStorage.removeItem('token')
    }
  }

  useEffect(()=> {
    verifyToken()
  }, [])

  return (
    <AuthContext.Provider value={{ token, setToken}}>
      {children}
    </AuthContext.Provider>
  );
}
