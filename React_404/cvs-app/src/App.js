import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/member/login/Login";
import Signup from "./components/member/signup/Signup";
import Update from "./components/member/update/Update";
import Admin from "./components/member/admin/Admin";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage";
import Product from "./productAdim/page/Product";
import ProductView from "./productAdim/page/ProductView";
import ProductAdd from "./productAdim/page/ProductAdd";
import ProductEdit from "./productAdim/page/ProductEdit";
import { Role } from "./productAdim/model/Role";
import AuthGuard from "./productAdim/guards/AuthGuard";
import Unauthorized from "./productAdim/page/UnAuthorized";
import ProductCart from "./productAdim/page/ProductCart";
import ProductPayment from "./productAdim/page/ProductPayment";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/update" element={<Update />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/productAdmin" element={<Product />} />
        <Route path="/productView/:id" element={<ProductView />} />
        <Route path="/productAdd" element={<ProductAdd />} />
        <Route path="/productEdit/:id" element={<ProductEdit />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/productCart" element={<ProductCart />} />
        <Route path="/productPayment" element={<ProductPayment />} />
        {/* <Route
              path="/productAdmin"
              element={
                <AuthGuard roles={[Role.ADMIN, Role.USER]}>
                  <Product />
                </AuthGuard>
              }
            /> */}
      </Routes>
    </Router>
  );
}

export default App;
