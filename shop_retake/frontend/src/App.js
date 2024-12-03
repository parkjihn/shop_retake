import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./components/pages/HomePage/HomePage";
import NotFoundPage from "./components/pages/NotFoundPage/NotFoundPage";
import CategoriesPage from "./components/pages/CategoriesPage/CategoriesPage";
import AllProductsPage from "./components/pages/AllProductsPage/AllProductsPage";
import AllSalesPage from "./components/pages/AllSalesPage/AllSalesPage";
import CartPage from "./components/pages/CartPage/CartPage";
import CategoryPage from "./components/pages/CategoryPage/CategoryPage.";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/categories" element={<CategoriesPage />} />
      <Route path="/products/all" element={<AllProductsPage />} />
      <Route path="/sales" element={<AllSalesPage />} />
      <Route path="/cart" element={<CartPage/>} />
      <Route path="/categories/:categoryId" element={<CategoryPage/>}></Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
