import { Routes, Route } from "react-router-dom";
import Home from "./pages/";
import Product from "./pages/Product/[id]";
import ProductForm from "./pages/Product/register";
import UserRegister from "./pages/User/register";
import UserLogin from "./pages/User/sign";

export default function () {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/product/register" element={<ProductForm />} />
      <Route path="/user/register" element={<UserRegister />} />
      <Route path="/user/sign" element={<UserLogin />} />
    </Routes>
  );
}
