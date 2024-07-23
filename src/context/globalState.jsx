"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
const UserContext = createContext();

export const useGlobalContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  function tokenInLocal(data) {
    if (data) {
      localStorage.setItem("user", JSON.stringify(data));
      setLogin(true);
      return true;
    }
    return false;
  }

  function logout() {
    localStorage.removeItem("user");
    setLogin(false);
    setLoginModel(false);
  }
  const navigate = useRouter();
  const [limit, setLimit] = useState(5);
  const [logedUsername, setLogedUsername] = useState(null);
  const [login, setLogin] = useState(null);
  const [openLoginModel, setLoginModel] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [checkout, setCheckout] = useState(null);
  const [openCartDrawer, setOpenCartDrawer] = useState(false);
  const [productsAddedToCart, setProductsAddedToCart] = useState([]);
  const [openSignupModel, setSignupModel] = useState(false);
  const [openForgetModel, setForgetModel] = useState(false);
  const [openOtpModel, setOtpModel] = useState(false);
  const [openResetModel, setResetModel] = useState(false);
  const [otpReset, setOtpReset] = useState();
  const [dataForResetPassword, setDataForResetPassword] = useState({
    oldPassword: "",
    email: "",
    otp: "",
    newPassword: "",
  });
const [state,setState] = useState(false)
  const [cartDetail, setCartDetail] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    date_created: "",
    postcode: "",
    phone: "",
    address1: "",
    city: "",
    country: "",
  });
  const [customerID, setCustomerID] = useState(null);
  const [loggedUser, setLoggedUser] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState({
    price: null,
    features: [],
  });
  const [cart, showCart] = useState(false);
  const toggleSidebar = () => {
    setMobileSidebarOpen((prev) => !prev);
  };
  const fetchWooCommerceData = async (endpoint, config = {}) => {
    try {
      const response = await axios.get("/api/woocommerce", {
        params: {
          endpoint,
          config: JSON.stringify(config),
        },
      });
      return response.data;
    } catch (error) {
      toast.error("Network error please try again later", {
        position: "top-right",
      });
    }
  };

  const CreateWooCommerceData = async (endpoint, data) => {
    try {
      const response = await axios.post("/api/woocommerce", {
        endpoint,
        data,
      });
      return response.data;
    } catch (error) {
      toast.error("Network error please try again later", {
        position: "top-right",
      });
    }
  };

  const updateWooCommerceData = async (endpoint, itemId, data) => {
    try {
      const response = await axios.put("/api/woocommerce", {
        endpoint,
        itemId,
        data,
      });
      return response.data;
    } catch (error) {
      console.error("Network error please try again later", {
        position: "top-right",
      });
    }
  };
  useEffect(() => {
    const customerID = localStorage.getItem("customerID");
    if (customerID) {
      setCustomerID(customerID);
      fetchWooCommerceData(`wc/v3/customers/${customerID}`).then((data) => {
        setCustomerDetails({
          username: data?.data?.username || "",
          first_name: data?.data?.first_name || "",
          last_name: data?.data?.last_name || "",
          email: data?.data?.email || "",
          postcode: data?.data?.billing?.postcode || "",
          phone: data?.data?.billing?.phone || "",
          address1: data?.data?.billing?.address_1 || "",
          city: data?.data?.billing?.city || "",
          country: data?.data?.billing?.country || "",
          date_created: data?.data?.date_created || "",
        });
      });
    }
  }, [navigate]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        setLoggedUser(parsedUser?.user);
        setCustomerDetails({
          ...customerDetails,
          username: parsedUser?.user?.fullName,
          email: parsedUser?.user?.email,
        });
      } catch (error) {
        console.error(error);
      }
    }
  }, [navigate]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    if (data) {
      // console.log(login, "globaly");
      setLogin(data);
    } else {
      setLogin(false);
    }
  }, []);

  useEffect(() => {
    if (!cartCount) {
      const storedProducts =
        JSON.parse(localStorage.getItem("productsAddedToCart")) || [];
      setCartCount(storedProducts?.length);
    }
  }, [cartCount]);

  return (
    <UserContext.Provider
      value={{
        login,
        setLogin,
        openLoginModel,
        setLoginModel,
        tokenInLocal,
        logout,
        mobileSidebarOpen,
        toggleSidebar,
        setMobileSidebarOpen,
        fetchWooCommerceData,
        CreateWooCommerceData,
        updateWooCommerceData,
        cartCount,
        setCartCount,
        loggedUser,
        setLoggedUser,
        checkout,
        productsAddedToCart,
        setProductsAddedToCart,
        setCheckout,
        openCartDrawer,
        setOpenCartDrawer,
        openSignupModel,
        setSignupModel,
        openForgetModel,
        setForgetModel,
        openOtpModel,
        setOtpModel,
        openResetModel,
        setResetModel,
        otpReset,
        setOtpReset,
        customerID,
        setCustomerID,
        dataForResetPassword,
        setDataForResetPassword,
        customerDetails,
        setCustomerDetails,
        dataForResetPassword,
        setDataForResetPassword,
        cart,
        showCart,

        logedUsername,
        setLogedUsername,
        selectedPlan,
        setSelectedPlan,
        limit,
        setLimit,
        state,
        setState,
        cartDetail,
        setCartDetail,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
