import React from "react";
import { useLocation } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios"; // For making HTTP requests
import Cookies from "js-cookie"; // For accessing cookies

const PaymentPage = () => {
  const location = useLocation();
  const { id: debtor_id, amount } = location.state || {};

  // PayPal client ID (replace with your actual PayPal client ID)
  const paypalClientId =
    "AQO_lrXGFsV-gcb9dl11jWIu-BW84qeQbOxa31FnSsbeJj_fpHAMK3sb-c2aJjJSnjuaN4CDAxvT3tL1";

  // PayPal SDK options
  const initialOptions = {
    "client-id": paypalClientId,
    currency: "USD", // Change to your desired currency
    intent: "capture",
  };

  // Function to send donation data to the backend
  const sendDonationData = async (paymentDetails) => {
    try {
      // Get the token from cookies
      const token = Cookies.get("token"); // Replace "token" with your actual cookie name

      if (!token) {
        throw new Error("No authentication token found in cookies.");
      }

      // Prepare the request body
      const requestBody = {
        debtor_id: debtor_id, // From location.state
        amount: amount, // From location.state
        payment_method: "Paypal", // Hardcoded as PayPal
        payment_status: "Pending", // Default status
      };

      // Make the POST request to the API
      const response = await axios.post(
        "http://localhost:5000/api/donations",
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      );

      console.log("Donation data sent successfully:", response.data);
      alert("تم تسجيل التبرع بنجاح!");
    } catch (error) {
      console.error("Error sending donation data:", error);
      alert("فشل تسجيل التبرع. يرجى المحاولة مرة أخرى.");
    }
  };

  // Handle PayPal payment approval
  const handleApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      console.log("Payment completed:", details);

      // Log to confirm sendDonationData is called
      console.log("Calling sendDonationData...");

      // Send donation data to the backend after successful payment
      sendDonationData(details);

      alert("تمت عملية الدفع بنجاح!");
    });
  };

  return (
    <div
      className="bg-[#F0F0D7] min-h-screen flex items-center justify-center p-4 font-sans"
      dir="rtl"
    >
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full overflow-hidden">
        {/* Header */}
        <div className="bg-[#727D73] text-white p-6 text-center">
          <h1 className="text-2xl font-bold">صفحة الدفع</h1>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Payment Details */}
          <div className="bg-[#D0DDD0] rounded-lg p-5">
            <h2 className="text-xl font-bold text-[#727D73] mb-3">
              تفاصيل الدفع
            </h2>
            <div className="border-b border-[#AAB99A] py-2 flex justify-between">
              <span className="font-semibold">رقم المستفيد:</span>
              <span>{debtor_id}</span>
            </div>
            <div className="py-2 flex justify-between">
              <span className="font-semibold">المبلغ:</span>
              <span className="text-lg">{amount} دولار</span>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h2 className="text-xl font-bold text-[#727D73] mb-4">
              اختر طريقة الدفع
            </h2>

            {/* PayPal Container */}
            <div className="border-2 border-[#AAB99A] rounded-lg p-5">
              <PayPalScriptProvider options={initialOptions}>
                <PayPalButtons
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: amount, // Use the amount passed from the previous page
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={handleApprove}
                  onError={(err) => {
                    console.error("PayPal error:", err);
                    alert("فشلت عملية الدفع. يرجى المحاولة مرة أخرى.");
                  }}
                />
              </PayPalScriptProvider>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#D0DDD0] p-4 text-center text-[#727D73] text-sm">
          <p>جميع المعاملات آمنة ومشفرة</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
