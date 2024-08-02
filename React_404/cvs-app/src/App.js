import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/member/login/Login";
import Signup from "./components/member/signup/Signup";
import Update from "./components/member/update/Update";
import Admin from "./components/member/admin/Admin";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage";
import InquiryBoard from "./inquiry/InquiryBoard";
import Product from "./productAdim/page/Product";
import ProductView from "./productAdim/page/ProductView";
import ProductAdd from "./productAdim/page/ProductAdd";
import ProductEdit from "./productAdim/page/ProductEdit";
import { Role } from "./productAdim/model/Role";
import AuthGuard from "./productAdim/guards/AuthGuard";
import Unauthorized from "./productAdim/page/UnAuthorized";
import ProductCart from "./productAdim/page/ProductCart";
import ProductPayment from "./productAdim/page/ProductPayment";
import InquiryView from './inquiry/InquiryView';
import { AuthProvider } from './context/AuthContext';
import ProductList from "./productAdim/components/ProductList";
import Payment from "./productAdim/components/Payment";
import CartList from "./cart/page/CartList";
import ReadPage from "./components/notice/ReadPage";
import NoticeList from "./components/notice/NoticeList";
import ModifyForm from "./components/notice/ModifyForm";
import RegisterForm from "./components/notice/RegisterForm";
import ReviewSave from "./pages/review/ReviewSave";
import "bootstrap/dist/css/bootstrap.min.css";
import Read from "./pages/review/Read";
import Modify from "./pages/review/Modify";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState("");
    const [loginMethod, setLoginMethod] = useState("");

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await axios.get("/members/checkLogin", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setIsLoggedIn(response.data.isLoggedIn);
                setLoginMethod(localStorage.getItem("loginMethod"));
                if (response.data.isLoggedIn) {
                    const userResponse = await axios.get("/members/me", {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    });
                    setRole(userResponse.data.role);
                }
            } catch (error) {
                setIsLoggedIn(false);
            }
        };

    checkLoginStatus();
  }, []);
  return (
    <AuthProvider>
    <Router>
      <Navbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        role={role}
        setRole={setRole}
        loginMethod={loginMethod}
        setLoginMethod={setLoginMethod}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/update" element={<Update />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/product/list" element={<Product role={role} />} />
        <Route path="/api/inquiries" element={<InquiryBoard />} />
        <Route path="/inquiries/:id" element={<InquiryView />} />
        <Route path="/product/list" element={<Product />} />
        <Route path="/productView/:id" element={<ProductView />} />
        <Route path="/productAdd" element={<ProductAdd />} />
        <Route path="/productView/:id" element={<ProductView role={role} />} />
        <Route
          path="/productAdd"
          element={<ProductAdd role={role} isLoggedIn={isLoggedIn} />}
        />
        <Route path="/productEdit/:id" element={<ProductEdit />} />

        <Route path='/review/add/:p_id' element={<ReviewSave />}></Route>
        <Route path='/review/read/:rno' element={<Read />}></Route>
        <Route path='/review/modify/:rno' element={<Modify />}></Route>

        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/productCart" element={<ProductCart />} />
        <Route path="/productPayment" element={<ProductPayment />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/cart" element={<CartList />} />
        <Route path="/notice/list" element={<NoticeList />} />
        <Route path="/notice/read/:bno" element={<ReadPage />} /> {/* 공지사항 읽기 페이지 */}
        <Route path="/notice/modify/:bno" element={<ModifyForm />} /> {/* 공지사항 읽기 페이지 */}
        <Route path="/notice/register" element={<RegisterForm />} />
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
    </AuthProvider>
  );
}

export default App;
