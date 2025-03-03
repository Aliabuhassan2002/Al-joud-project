import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerDonor, resetState } from "../../redux/donorSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function RegisterDonor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, success, error } = useSelector((state) => state.donor);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirm_password: "",
    address: "",
    phone: "",
    image: null,
  });

  // Handle text input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image upload
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password match
    if (formData.password !== formData.confirm_password) {
      Swal.fire({
        title: "خطأ!",
        text: "كلمات المرور غير متطابقة.",
        icon: "error",
        confirmButtonColor: "#AAB99A",
      });
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("full_name", formData.full_name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("phone", formData.phone);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    dispatch(registerDonor(formDataToSend));
  };

  // Handle success message & navigation
  if (success) {
    Swal.fire({
      title: "تم التسجيل بنجاح!",
      text: "تم إنشاء الحساب بنجاح، يمكنك الآن تسجيل الدخول.",
      icon: "success",
      confirmButtonColor: "#AAB99A",
      confirmButtonText: "حسناً",
    }).then(() => {
      dispatch(resetState());
      navigate("/login");
    });
  }

  return (
    <div className="flex min-h-screen bg-[#F0F0D7]">
      {/* Left side decorative panel - visible on medium screens and up */}
      <div className="hidden md:flex md:w-1/3 bg-[#D0DDD0] flex-col justify-center items-center p-8">
        <div className="w-32 h-32 rounded-full bg-[#AAB99A] mb-8 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-16 h-16"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-[#727D73] mb-4 text-center">
          مرحباً بكم
        </h1>
        <p className="text-[#727D73] text-center text-lg mb-6">
          انضم إلينا كمتبرع وساهم في مساعدة الآخرين
        </p>
        <div className="w-full max-w-xs">
          <div className="h-1 bg-[#AAB99A] w-full mb-4 rounded-full"></div>
          <div className="h-1 bg-[#AAB99A] w-2/3 mb-4 rounded-full"></div>
          <div className="h-1 bg-[#AAB99A] w-1/2 rounded-full"></div>
        </div>
      </div>

      {/* Right side form */}
      <div className="w-full md:w-2/3 flex justify-center items-center p-4">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#D0DDD0] rounded-bl-full opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#AAB99A] rounded-tr-full opacity-20"></div>

          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-center mb-2 text-[#727D73]">
              إنشاء حساب متبرع جديد
            </h2>
            <p className="text-center text-[#727D73] mb-8">
              املأ المعلومات التالية لإنشاء حسابك
            </p>

            {error && (
              <div className="mb-6 p-4 rounded-lg text-center bg-red-100 text-red-600 border-r-4 border-red-600">
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5" dir="rtl">
              <div className="grid md:grid-cols-2 gap-5">
                {/* الاسم الكامل */}
                <div className="space-y-2">
                  <label className="block text-right font-medium text-[#727D73] text-sm">
                    الاسم الكامل
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#AAB99A]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#AAB99A] focus:border-transparent bg-gray-50"
                      placeholder="أدخل اسمك الكامل"
                    />
                  </div>
                </div>

                {/* البريد الإلكتروني */}
                <div className="space-y-2">
                  <label className="block text-right font-medium text-[#727D73] text-sm">
                    البريد الإلكتروني
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#AAB99A]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </span>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#AAB99A] focus:border-transparent bg-gray-50"
                      placeholder="أدخل بريدك الإلكتروني"
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                {/* كلمة المرور */}
                <div className="space-y-2">
                  <label className="block text-right font-medium text-[#727D73] text-sm">
                    كلمة المرور
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#AAB99A]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#AAB99A] focus:border-transparent bg-gray-50"
                      placeholder="أدخل كلمة المرور"
                    />
                  </div>
                </div>

                {/* تأكيد كلمة المرور */}
                <div className="space-y-2">
                  <label className="block text-right font-medium text-[#727D73] text-sm">
                    تأكيد كلمة المرور
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#AAB99A]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <input
                      type="password"
                      name="confirm_password"
                      value={formData.confirm_password}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#AAB99A] focus:border-transparent bg-gray-50"
                      placeholder="أعد إدخال كلمة المرور"
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                {/* العنوان */}
                <div className="space-y-2">
                  <label className="block text-right font-medium text-[#727D73] text-sm">
                    العنوان
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#AAB99A]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#AAB99A] focus:border-transparent bg-gray-50"
                      placeholder="أدخل عنوانك"
                    />
                  </div>
                </div>

                {/* الهاتف */}
                <div className="space-y-2">
                  <label className="block text-right font-medium text-[#727D73] text-sm">
                    رقم الهاتف
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#AAB99A]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#AAB99A] focus:border-transparent bg-gray-50"
                      placeholder="أدخل رقم هاتفك"
                    />
                  </div>
                </div>
              </div>

              {/* تحميل صورة */}
              <div className="space-y-2">
                <label className="block text-right font-medium text-[#727D73] text-sm">
                  تحميل صورة
                </label>
                <label
                  htmlFor="image-upload"
                  className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 text-center border-[#AAB99A] bg-gray-50 cursor-pointer hover:bg-[#F0F0D7] transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-[#AAB99A] mb-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-[#727D73] font-medium">
                    {formData.image
                      ? formData.image.name
                      : "انقر لتحميل صورة أو اسحب الملف هنا"}
                  </span>
                  <input
                    id="image-upload"
                    type="file"
                    name="image"
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
                className="w-full py-4 rounded-lg mt-8 text-white font-medium bg-[#AAB99A] hover:bg-[#97A788] transition-colors shadow-md relative overflow-hidden group"
              >
                <span className="relative z-10">
                  {loading ? "جاري التسجيل..." : "إنشاء الحساب"}
                </span>
                <span className="absolute top-0 left-0 w-0 h-full bg-[#727D73] transition-all duration-300 group-hover:w-full"></span>
              </button>

              {/* Login link */}
              <div className="text-center mt-4">
                <p className="text-[#727D73]">
                  لديك حساب بالفعل؟{" "}
                  <a
                    href="/login"
                    className="text-[#AAB99A] font-medium hover:underline"
                  >
                    تسجيل الدخول
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
