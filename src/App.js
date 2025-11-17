import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";

// Public pages
import Home from "./pages/Home.jsx";
import AboutUs from "./pages/AboutUs.jsx";

import BookAppointment from "./pages/BookAppointment.jsx";
import UserPaymentForm from "./pages/UserPaymentForm.jsx";

// Layouts
import MainLayout from "./layouts/MainLayout.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import AdminTabLayout from "./layouts/AdminTabLayout.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

import AccountTemplate from "./pages/AccountCreation/AccountTemplate.jsx";
import Login from "./pages/AccountCreation/Login.jsx";
import Register from "./pages/AccountCreation/Register.jsx";
import CreateNewPassword from "./pages/AccountCreation/CreateNewPassword.jsx";
import ForgotPassword from "./pages/AccountCreation/ForgotPassword.jsx";
import OTPVerificcation from "./pages/AccountCreation/OTPVerificcation.jsx";
import OurProgram from "./pages/OurProgram.jsx";
import Service from "./pages/Service.jsx";
import Blog from "./pages/Blog.jsx";
// import Footer from '';
// import Program from '';
// import ContactUs from '';
// import Login from '';
// import Register from '';

// Admin pages
import Dashboard from "./pages/admin/Dashboard.jsx";
import Members from "./pages/admin/Members.jsx";
import AddNewMember from "./pages/admin/Trainers.jsx";

//  detox food pages
import CreateDetoxFood from "./pages/admin/detox-food/CreateDetoxFood.jsx";
import ViewDetoxFood from "./pages/admin/detox-food/ViewDetoxFood.jsx";
import ListDetoxFood from "./pages/admin/detox-food/ListDetoxFood.jsx";

// trainer pages
import TrainersList from "./pages/admin/trainers/TrainersList.jsx";
import TrainerDetail from "./pages/admin/trainers/TrainerDetail.jsx";
import TrainerVideos from "./pages/admin/trainers/TrainerVideos.jsx";
import AddNewTrainer from "./pages/admin/trainers/AddNewTrainer.jsx";
import VideoUpload from "./pages/admin/trainers/VideoUpload.jsx";

import AppointmentList from "./pages/admin/AppointmentList.jsx";
import AdminPaymentList from "./pages/admin/AdminPaymentList.jsx";
// import CardReading from "./pages/admin/CardReading.jsx";
// import Food from "./pages/admin/Food.jsx";
// import Settings from "./pages/admin/Settings.jsx";
// import Videos from "./pages/admin/Videos.jsx";
// // User Pages
// import UserDashboard from './#';
import UserProfile from "./pages/UserProfile.jsx";
// import UserRegisterForm './#r';

// // Admin Pages
// import AdminDashboard from '#';
// import UserManagement from '#';
// import AdminSettings from '#';

// // Simple auth check (real app >> backend >> check )
// const isAuthenticated = true;
// const isAdmin = true;
import { testBackendConnection } from "./config/testApi.js";

function App() {
  const [apiStatus, setApiStatus] = React.useState({
    loading: true,
    data: null,
    error: null,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await testBackendConnection();
        setApiStatus({ loading: false, data: response, error: null });
      } catch (error) {
        setApiStatus({ loading: false, data: null, error: error });
        console.error("Error testing backend connection:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <Router>
      {/* Temporary UI for API connection test */}
      <div
        style={{
          position: "fixed",
          bottom: "10px",
          right: "10px",
          padding: "10px",
          background: "rgba(0, 0, 0, 0.8)",
          color: "white",
          borderRadius: "8px",
          zIndex: 9999,
          maxWidth: "300px",
        }}
      >
        <h4 style={{ margin: "0 0 5px 0", borderBottom: "1px solid #555" }}>
          API Connection Test
        </h4>
        {apiStatus.loading && <p>Loading...</p>}
        {apiStatus.error && (
          <p style={{ color: "#ff8a8a" }}>
            Error: {apiStatus.error.message}
          </p>
        )}
        {apiStatus.data && (
          <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
            {JSON.stringify(apiStatus.data, null, 2)}
          </pre>
        )}
      </div>
      <ScrollToTop behavior="smooth" />
      <Routes>
        {/* Public routes with main layout (Navbar and Footer) */}
        {/* Routes with the main Navbar and Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
          <Route path="/payment" element={<UserPaymentForm />} />
          <Route path="/programs" element={<OurProgram />} />
          <Route path="/services" element={<Service />} />
          <Route path="/blog" element={<Blog />} />
        </Route>

        {/* Admin routes with sidebar layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="appointments" element={<AppointmentList />} />
          <Route path="payments" element={<AdminPaymentList />} />

          {/* members routes */}
          <Route path="members">
            <Route index element={<Members />} />
          </Route>

          {/* trainers routes */}
          <Route path="trainers">
            <Route index element={<TrainersList />} />
            <Route path=":id" element={<TrainerDetail />} />
            <Route path=":id/videos" element={<TrainerVideos />} />
          </Route>

          {/* detox-food routes */}
          <Route path="detox-food">
            <Route path="view/:item_id" element={<ViewDetoxFood />} />
            <Route path=":user_id/lists" element={<ListDetoxFood />} />
          </Route>

          {/* Tabbed admin add routes (use AdminTabLayout) */}
          <Route element={<AdminTabLayout />}>
            <Route path="trainers/videos/upload" element={<VideoUpload />} />
            <Route path="trainers/add" element={<AddNewTrainer />} />
            <Route path="members/add" element={<AddNewMember />} />
            <Route path="detox-food/create" element={<CreateDetoxFood />} />
          </Route>
        </Route>

        {/* Routes for Account Creation */}
        <Route path="" element={<AccountTemplate />}>
          <Route path="/signin" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<OTPVerificcation />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/create-new-password" element={<CreateNewPassword />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
