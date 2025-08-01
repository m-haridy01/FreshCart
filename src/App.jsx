import React, { Suspense, useContext, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const Layout = React.lazy(() => import("./Components/Layout/Layout"));
const Home = React.lazy(() => import("./Pages/Home/Home"));
const Cart = React.lazy(() => import("./Pages/Cart/Cart"));
const Brands = React.lazy(() => import("./Pages/Brands/Brands"));
const Products = React.lazy(() => import("./Pages/Products/Products"));
const Categories = React.lazy(() => import("./Pages/Categories/Categories"));
const Login = React.lazy(() => import("./Pages/Login/Login"));
const Register = React.lazy(() => import("./Pages/Register/Register"));
const ProductDeteails = React.lazy(() =>
  import("./Components/ProductDeteails/ProductDeteails")
);
const RelatedProducts = React.lazy(() =>
  import("./Components/RelatedProducts/RelatedProducts")
);
const Wishlist = React.lazy(() => import("./Pages/Wishlist/Wishlist"));
const SpecificBrands = React.lazy(() =>
  import("./Components/SpecificBrands/SpecificBrands")
);
const Payment = React.lazy(() => import("./Components/Payment/Payment"));
const AllOrders = React.lazy(() => import("./Pages/AllOrders/AllOrders"));

import ForgetPassword from "./Pages/ForgetPassword/ForgetPassword";
import VerifyRestCode from "./Pages/ForgetPassword/VerifyRestCode";
import RestNewPassword from "./Pages/ForgetPassword/RestNewPassword";
import { Toaster } from "react-hot-toast";
import TokenContext from "../Context/TokenContext";
import ProtectedRoutes from "./ProtectedRoutes/ProtectedRoutes";
import ProtectedSigning from "./ProtectedRoutes/ProtectedSigning";
import CartContextProvider from "../Context/CartContextProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ThemeContextProvider, {
  HandleThemeContext,
} from "../Context/ThemeContextProvider";
import WishlistProvider from "../Context/WishlistProvider";
import Loading from "./Components/Loading/Loading";
import "animate.css";
import Aos from "aos";
import "aos/dist/aos.css";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";
import useOnlineStatus from "use-online-status";

AOS.init();
export default function App() {
  let { theme } = useContext(HandleThemeContext);
  const online = useOnlineStatus();
  const routes = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element:  (
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          ),
        },
        {
          path: "payment",
          element: (
            <ProtectedRoutes>
              <Payment />
            </ProtectedRoutes>
          ),
        },
        {
          path: "Wishlist",
          element: (
            <ProtectedRoutes>
              <Wishlist />
            </ProtectedRoutes>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoutes>
              <Brands />
            </ProtectedRoutes>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoutes>
              <Products />
            </ProtectedRoutes>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoutes>
              <Categories />
            </ProtectedRoutes>
          ),
        },
        {
          path: "productDeteails/:id/:categoryName",
          element: (
            <ProtectedRoutes>
              <ProductDeteails />
            </ProtectedRoutes>
          ),
        },
        {
          path: "relatedProducts/:id/:categoryName",
          element: (
            <ProtectedRoutes>
              <RelatedProducts />
            </ProtectedRoutes>
          ),
        },
        {
          path: "specificBrands/:id/:brandName",
          element: (
            <ProtectedRoutes>
              <SpecificBrands />
            </ProtectedRoutes>
          ),
        },
        {
          path: "allOrders",
          element: (
            <ProtectedRoutes>
              <AllOrders />
            </ProtectedRoutes>
          ),
        },
        {
          path: "login",
          element: (
            <ProtectedSigning>
              <Login />
            </ProtectedSigning>
          ),
        },
        {
          path: "register",
          element: (
            <ProtectedSigning>
              <Register />
            </ProtectedSigning>
          ),
        },
        {
          path: "forgetPassword",
          element: (
            <ProtectedSigning>
              <ForgetPassword />
            </ProtectedSigning>
          ),
        },
        {
          path: "verifyRestCode",
          element: (
            <ProtectedSigning>
              <VerifyRestCode />
            </ProtectedSigning>
          ),
        },
        {
          path: "restNewPassword",
          element: (
            <ProtectedSigning>
              <RestNewPassword />
            </ProtectedSigning>
          ),
        },
        {
          path: "*",
          element: <NotFoundPage />,
        },
      ],
    },
  ]);

  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);

  let client = new QueryClient();

  if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  return (
    <div className={`${theme} relative`}>
      <QueryClientProvider client={client}>
        <ReactQueryDevtools />
        <TokenContext>
          <CartContextProvider>
            <WishlistProvider>
              <Suspense fallback={<Loading />}>
                {!online && (
                  <h2 className="text-slate-300 fixed bottom-5 left-5 bg-red-500 text-center py-2 px-3 rounded-2xl z-50">
                    Network Issue
                  </h2>
                )}
                <RouterProvider router={routes} />
                <Toaster />
              </Suspense>
            </WishlistProvider>
          </CartContextProvider>
        </TokenContext>
      </QueryClientProvider>
    </div>
  );
}
