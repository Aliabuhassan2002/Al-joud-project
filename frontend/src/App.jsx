// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Use Routes instead of Switch
import Navbar from './components/Navbar/Navbar';

import About from './components/About/About';
import Admin from './components/AdminDashboard/Admin';
import Announcements from './components/Announcements/Announcements';
import Contact from './components/Contact/Contact';
import BenficiaryProfile from './components/BenficiaryProfile/BenficiaryProfile';
import DonorProfile from './components/DonorProfile/DonorProfile';
import Home from './components/Home/Home';
import Login from './components/LogIn/Login';
import OrdersHistory from './components/OrdersHistory/OrdersHistory';
import Payment from './components/Payment/Payment';
import RegisterBenficiary from './components/RegisterBenficiary/RegisterBenficiary';
import RegisterDonor from './components/RegisterDonor/RegisterDonor';
import SinglePage from './components/SinglePage/SinglePage';
import ZakahCalculator from './components/ZakahCalculator/ZakahCalculator';
import Footer from './components/Footer/Footer';
import TopDonors from './components/TopDontions/TopDonors';
// import RegisterBeneficiary from ''
const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/beneficiary-profile" element={<BenficiaryProfile />} />
          <Route path="/donor-profile" element={<DonorProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/orders-history" element={<OrdersHistory />} />
          <Route path="/payment" element={<Payment />} />
          <Route
            path="/register-beneficiary"
            element={<RegisterBenficiary />}
          />
          <Route path="/register-donor" element={<RegisterDonor />} />
          <Route path="/single-page/:id" element={<SinglePage />} />
          <Route path="/top-donations" element={<TopDonors />} />
          <Route path="/zakah-calculator" element={<ZakahCalculator />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
