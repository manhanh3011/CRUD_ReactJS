import { Toaster } from "react-hot-toast";
<<<<<<< HEAD
import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import List from "./pages/List";
import Add from "./pages/Add";
import Edit from "./pages/Edit";
import Layout from "./pages/Layout";
=======
>>>>>>> d3a148964c28ba6b0b06d4979e39878a08bee0b5

function App() {
  return (
    <>
      <nav className="bg-blue-600 text-white shadow">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="#" className="text-xl font-semibold">
            <strong>WEB501 App</strong>
          </a>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/layout" className="hover:text-gray-200">
              Trang chủ
            </Link>
            <Link to="/list" className="hover:text-gray-200">
              Danh sách
            </Link>
            <Link to="/add" className="hover:text-gray-200">
              Thêm mới
            </Link>
            <Link to="/edit" className="hover:text-gray-200">
              Sửa
            </Link>
          </div>

<<<<<<< HEAD
          {/* Right menu desktop */}
          {/* <div className="hidden md:flex items-center space-x-6">
=======
          <div className="hidden md:flex items-center space-x-6">
>>>>>>> d3a148964c28ba6b0b06d4979e39878a08bee0b5
            <a href="#" className="hover:text-gray-200">
              Đăng nhập
            </a>
            <a href="#" className="hover:text-gray-200">
              Đăng ký
            </a>
          </div> */}
        </div>
<<<<<<< HEAD
        
=======
>>>>>>> d3a148964c28ba6b0b06d4979e39878a08bee0b5
      </nav>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto mt-10 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Chào mừng đến với WEB501</h1>
        <p className="text-lg text-gray-600">Ứng dụng quản lý dữ liệu</p>
      </div>
        <Routes>
            <Route path="/list" element={<List />} />
            <Route path="/add" element={<Add />} />
            <Route path="/edit" element={<Edit />} />
            <Route path="/layout" element={<Layout />} />
        </Routes>
      <Toaster />
    </>
  );
}

export default App;
