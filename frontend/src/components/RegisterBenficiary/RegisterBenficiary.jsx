import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerBeneficiary, resetState } from "../../redux/beneficiarySlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function RegisterBeneficiary() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, success, error } = useSelector((state) => state.beneficiary);

  const [formData, setFormData] = useState({
    total_debt: "",
    reason: "",
    category: "",
    identity_image: null, // File object
  });

  const categories = [
    "فك كربة السجناء",
    "مساعدة المرضى",
    "سداد ديون الأسر المحتاجة",
    "سداد ديون التعليم",
  ];

  // Handle text input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData({ ...formData, identity_image: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("total_debt", formData.total_debt);
    formDataToSend.append("reason", formData.reason);
    formDataToSend.append("category", formData.category);
    if (formData.identity_image) {
      formDataToSend.append("identity_image", formData.identity_image);
    }

    dispatch(registerBeneficiary(formDataToSend));
  };

  // Handle success message & navigation
  if (success) {
    Swal.fire({
      title: "تم التسجيل بنجاح!",
      text: "تم تسجيل المستفيد بنجاح.",
      icon: "success",
      confirmButtonColor: "#AAB99A",
      confirmButtonText: "حسناً",
    }).then(() => {
      dispatch(resetState()); // Reset Redux state
      navigate("/"); // Redirect to home
    });
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#F0F0D7] to-[#E8E8D0]">
      {/* Left side decorative panel - visible on medium screens and up */}
      <div className="hidden md:flex md:w-1/3 bg-gradient-to-br from-[#D0DDD0] to-[#C0D0C0] flex-col justify-center items-center p-8 shadow-inner">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#AAB99A] to-[#97A788] mb-6 flex items-center justify-center shadow-lg transform hover:scale-105 transition-all duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-12 h-12"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"></path>
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-[#556456] mb-4 text-center tracking-tight">
          تسجيل المستفيد
        </h1>
        <p className="text-[#556456] text-center text-lg mb-8 leading-relaxed">
          سجل بياناتك للحصول على الدعم والمساعدة من المتبرعين
        </p>
        <div className="w-full max-w-xs">
          <div className="h-1.5 bg-gradient-to-r from-[#AAB99A] to-[#97A788] w-full mb-3 rounded-full shadow-sm"></div>
          <div className="h-1.5 bg-gradient-to-r from-[#AAB99A] to-[#97A788] w-2/3 mb-3 rounded-full shadow-sm"></div>
          <div className="h-1.5 bg-gradient-to-r from-[#AAB99A] to-[#97A788] w-1/2 rounded-full shadow-sm"></div>
        </div>
      </div>

      {/* Right side form */}
      <div className="w-full md:w-2/3 flex justify-center items-center p-6">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl p-8 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#D0DDD0] rounded-bl-full opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#AAB99A] rounded-tr-full opacity-20"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#F0F0D7] rounded-full opacity-10 animate-pulse"></div>

          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-center mb-2 text-[#556456] tracking-tight">
              تسجيل مستفيد جديد
            </h2>
            <p className="text-center text-[#727D73] mb-10">
              أدخل المعلومات التالية للتسجيل كمستفيد
            </p>

            {error && (
              <div className="mb-8 p-4 rounded-lg text-center bg-red-50 text-red-600 border-r-4 border-red-600 shadow-sm">
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6" dir="rtl">
              {/* إجمالي الدين */}
              <div className="space-y-2">
                <label className="block text-right font-medium text-[#556456] text-sm">
                  إجمالي الدين
                </label>
                <div className="relative group">
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#AAB99A] group-hover:text-[#556456] transition-colors duration-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <input
                    type="number"
                    name="total_debt"
                    value={formData.total_debt}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#AAB99A] focus:border-transparent bg-gray-50 hover:bg-white transition-colors duration-200 shadow-sm"
                    placeholder="أدخل مبلغ الدين"
                  />
                </div>
              </div>

              {/* سبب الدين */}
              <div className="space-y-2">
                <label className="block text-right font-medium text-[#556456] text-sm">
                  سبب الدين
                </label>
                <div className="relative group">
                  <span className="absolute top-3 right-3 text-[#AAB99A] group-hover:text-[#556456] transition-colors duration-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <textarea
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#AAB99A] focus:border-transparent bg-gray-50 hover:bg-white transition-colors duration-200 min-h-32 resize-none shadow-sm"
                    placeholder="أدخل تفاصيل سبب الدين"
                  ></textarea>
                </div>
              </div>

              {/* الفئة */}
              <div className="space-y-2">
                <label className="block text-right font-medium text-[#556456] text-sm">
                  الفئة
                </label>
                <div className="relative group">
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#AAB99A] group-hover:text-[#556456] transition-colors duration-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path
                        fillRule="evenodd"
                        d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#AAB99A] focus:border-transparent bg-gray-50 hover:bg-white transition-colors duration-200 appearance-none shadow-sm"
                    style={{
                      backgroundImage:
                        'url(\'data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="%23AAB99A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>\')',
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "left 1rem center",
                    }}
                  >
                    <option value="">اختر الفئة</option>
                    {categories.map((cat, index) => (
                      <option key={index} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* تحميل صورة الهوية */}
              <div className="space-y-2">
                <label className="block text-right font-medium text-[#556456] text-sm">
                  صورة الهوية
                </label>
                <label
                  htmlFor="identity-upload"
                  className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 text-center border-[#AAB99A] bg-gray-50 cursor-pointer hover:bg-[#F0F0D7] transition-all duration-300 group shadow-sm"
                >
                  <div className="w-16 h-16 rounded-full bg-[#F0F0D7] flex items-center justify-center mb-3 group-hover:bg-[#E0E0C7] transition-colors duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-[#AAB99A] group-hover:text-[#556456] transition-colors duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 7v5.22a2 2 0 0 0 1 1.74l3 1.83a1 1 0 0 1-1.23 1.7L14.54 16a2 2 0 0 1-1.21-2.36 2 2 0 0 1 1.67-1.36m1-2.28a3 3 0 0 0-3 3v4c0 1.1.9 2 2 2h7a2 2 0 0 0 2-2v-1"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 7 L15 7"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 15h6m0 0-2-2m2 2-2 2"
                      />
                    </svg>
                  </div>
                  <span className="text-[#556456] font-medium group-hover:text-[#3A4A3B] transition-colors duration-300">
                    {formData.identity_image
                      ? formData.identity_image.name
                      : "انقر لتحميل صورة الهوية أو اسحب الملف هنا"}
                  </span>
                  <input
                    id="identity-upload"
                    type="file"
                    name="identity_image"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* زر التسجيل */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-lg mt-10 text-white font-medium bg-gradient-to-r from-[#AAB99A] to-[#97A788] hover:from-[#97A788] hover:to-[#7A8A6B] transition-all duration-300 shadow-lg relative overflow-hidden group"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#556456] to-[#3A4A3B] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                <span className="relative z-10 flex items-center justify-center">
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      جاري التسجيل...
                    </>
                  ) : (
                    "تسجيل المستفيد"
                  )}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
