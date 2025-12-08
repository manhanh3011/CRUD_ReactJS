import { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import List from "./pages/List";
import Add from "./pages/Add";
import Edit from "./pages/Edit";
import Detail from "./pages/Detail";
import Register from "./pages/Register";
import Login from "./pages/Login";


function App() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Load user info from localStorage
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <>
      {/* HEADER - Navbar Tailwind */}
      <nav className="bg-blue-600 text-white shadow">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Brand */}
          <a href="#" className="text-xl font-semibold">
            <strong>Tour App</strong>
          </a>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden block focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Menu desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-gray-200">
              Trang chủ
            </Link>
            <Link to="/list" className="hover:text-gray-200">
              Danh sách
            </Link>
            <Link to="/add" className="hover:text-gray-200">
              Thêm mới
            </Link>
            <Link to="/detail/1" className="hover:text-gray-200">
              Chi tiết
            </Link>
          </div>

          {/* Right menu desktop */}
          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-white">
                  Xin chào, <span className="font-semibold">{user.email}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                >
                  Đăng xuất
                </button>
              </div>
            ) : (
              <>
                <Link to="/register" className="hover:text-gray-200">
                  Đăng ký
                </Link>
                <Link to="/login" className="hover:text-gray-200">
                  Đăng nhập
                </Link>
              </>
            )}
          </div>
        </div>
        
      </nav>

      {/* MAIN CONTENT */}
      
        <Routes>
            <Route path="/list" element={<List />} />
            <Route path="/add" element={<Add />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
        </Routes>
      <Toaster />
    </>
  );
}

export default App;
