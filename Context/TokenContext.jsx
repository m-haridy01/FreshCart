import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let AuthContext = createContext();

export default function TokenContext({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));

  async function verifyToken() {
    if (token) {
      try {
        let { data } = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/auth/verifyToken`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        localStorage.setItem("userId", data.decoded.id);
      } catch (err) {
        console.log(err);
        setToken(null);
        localStorage.removeItem("token");
      }
    }
  }

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken, verifyToken }}>
      {children}
    </AuthContext.Provider>
  );
}
