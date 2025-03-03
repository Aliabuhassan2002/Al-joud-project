import React, { useState, useEffect } from "react";
import DonationDashboard from "./DonationDashboard";
import BeneficiaryManagement from "./BeneficiaryManagement";
import ReportGeneration from "./ReportGeneration";
import DonorManagement from "./DonorManagement";
import CreateUserAndBeneficiary from "./CreateUserAndBeneficiary"; // Import the new component
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import js-cookie for handling cookies
import ContactUsMessages from "./ContactUsMessages"; // Import the new component

export default function Admin() {
  const [activeTab, setActiveTab] = useState("donations");
  const [isAdmin, setIsAdmin] = useState(false); // State to track if the user is an admin
  const navigate = useNavigate(); // Hook to handle navigation

  useEffect(() => {
    // Check if the user is logged in and is an Admin
    const token = Cookies.get("token"); // Get the token from cookies

    if (!token) {
      navigate("/login"); // Redirect to login if not authenticated
    } else {
      // Verify if the user is an Admin
      axios
        .get("http://localhost:5000/api/admin/verify-admin", {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the Authorization header
          },
        })
        .then((response) => {
          if (response.data.role !== "Admin") {
            navigate("/"); // Redirect to home if not admin
          } else {
            setIsAdmin(true); // Set state to true if the user is an admin
          }
        })
        .catch((error) => {
          console.error("Error verifying admin:", error);
          navigate("/login"); // Redirect to login if there's an error verifying the user
        });
    }
  }, [navigate]);

  const renderTabContent = () => {
    if (!isAdmin) return <div>Loading...</div>; // Show a loading state while checking if user is an admin

    switch (activeTab) {
      case "donations":
        return <DonationDashboard />;
      case "donors":
        return <DonorManagement />;
      case "beneficiaries":
        return <BeneficiaryManagement />;
      case "reports":
        return <ReportGeneration />;
      case "create-beneficiary":
        return <CreateUserAndBeneficiary />;
        case "contact-us":
          return <ContactUsMessages />; // Render Contact Us Messages  
      default:
        return <DonationDashboard />; // Default to donation dashboard if no valid tab is selected
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Admin Header */}
          <div className="bg-gradient-to-r from-[#727D73] to-[#727D73] px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">لوحة التحكم الإدارية</h1>
          </div>

          {/* Admin Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex px-6 -mb-px">
              {/* Navigation buttons for the different tabs */}
              <button
                className={`py-4 px-6 font-medium text-sm transition-colors duration-200 ease-in-out ${
                  activeTab === "donations"
                    ? "border-b-2 border-green-500 text-green-900"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab("donations")}
              >
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                  التبرعات
                </span>
              </button>

              <button
                className={`py-4 px-6 font-medium text-sm transition-colors duration-200 ease-in-out ${
                  activeTab === "donors"
                    ? "border-b-2 border-green-500 text-green-900"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab("donors")}
              >
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  المتبرعون
                </span>
              </button>

              <button
                className={`py-4 px-6 font-medium text-sm transition-colors duration-200 ease-in-out ${
                  activeTab === "beneficiaries"
                    ? "border-b-2 border-green-500 text-green-900"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab("beneficiaries")}
              >
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  المستفيدون
                </span>
              </button>

              <button
                className={`py-4 px-6 font-medium text-sm transition-colors duration-200 ease-in-out ${
                  activeTab === "reports"
                    ? "border-b-2 border-green-500 text-green-900"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab("reports")}
              >
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  التقارير
                </span>
              </button>

              <button
                className={`py-4 px-6 font-medium text-sm transition-colors duration-200 ease-in-out ${
                  activeTab === "create-beneficiary"
                    ? "border-b-2 border-green-500 text-green-900"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab("create-beneficiary")}
              >
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  انشاء مستفيد
                </span>
              </button>
                            {/* Add the Contact Us Tab */}
              <button
                className={`py-4 px-6 font-medium text-sm transition-colors duration-200 ease-in-out ${
                  activeTab === "contact-us" ? "border-b-2 border-green-500 text-green-900" : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab("contact-us")}
              >
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  الرسائل
                </span>
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="p-6">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
}
