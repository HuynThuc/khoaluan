// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom'; 
import Home from './Page/Home.js';
import Service from './Page/Service.js';
//import Home from './component/Home/Home.js';
import HeroSection from './component/HeroSection/HeroSection.js';
import Login from './component/Login/Login.js';
import Register from './component/Register/Register.js';
import Header from './component/Header/Header.js';
import VideoPlayer from './component/video/video.js';
import { AuthProvider } from './Context/AuthContext'; // Import AuthProvider
import Footer from './component/Footer/Footer.js';
import ServiceDetail from './Page/ServiceDetail.js';
import DashboardPage from './Admin/DashboardPage.jsx';
import Checkout from './Page/Checkout.js'

const Layout = () => {
  const location = useLocation();
  const showHeaderFooter = !['/login', '/register',  '/admin-2',].includes(location.pathname);

  return (
    <>
      {showHeaderFooter && <Header />}
      <Outlet />
      {showHeaderFooter && <Footer />}
    </>
  );
};

function App() {
  return (
    <AuthProvider> {/* Bọc App bằng AuthProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/admin-2" element={<DashboardPage/>} />
            <Route path="/service" element={<Service />} />
            <Route path="/servicedetail/:id" element={<ServiceDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/payment" element={<Checkout />} />
            <Route path="/register" element={<Register />} />
            {/* Thêm các route khác nếu cần */}
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
