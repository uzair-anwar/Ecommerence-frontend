import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../Components/Account/Login";
import Signup from "../Components/Account/Signup";
import Navbar from "../Components/Navbar/Navbar";
import Home from "../Pages/Home";
import Profile from "../Pages/Profile/Profile";
import ProtectedRoute from "./ProtectedRoutes";
import UndefineRoutes from "./UndefinedRoutes";
import CreateProduct from "../Pages/Products/CreateProduct";
import UpdatePassword from "../Components/Account/UpdatePassword";
import EditProduct from "../Pages/Products/EditProduct";
import SearchProduct from "../Components/Products/SearchProduct";
import Cart from "../Pages/Cart/Cart";
import Checkout from "../Pages/Checkout";
import PersonalInfo from "../Components/Profile/PersonalInfo";
import Products from "../Components/Profile/Products";
import Orders from "../Components/Profile/Orders";
const BasicRoutes = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/searchProduct" element={<SearchProduct />} />
        <Route path="/cart" element={<Cart />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />}>
            <Route path="/profile" element={<PersonalInfo />} />
            <Route path="/profile/infomation" element={<PersonalInfo />} />
            <Route path="/profile/products" element={<Products />} />
            <Route path="/profile/addproduct" element={<CreateProduct />} />
            <Route path="/profile/orders" element={<Orders />} />
            <Route
              path="/profile/updatePassword"
              element={<UpdatePassword />}
            />
            <Route path="/profile/product/:id/edit" element={<EditProduct />} />
          </Route>
          <Route path="/payment" element={<Checkout />} />
        </Route>
        <Route path="*" element={<UndefineRoutes />} />
      </Routes>
    </BrowserRouter>
  );
};

export default BasicRoutes;
