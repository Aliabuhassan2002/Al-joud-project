import React, { useState } from "react";
import Cookies from "js-cookie"; // Import js-cookie for handling cookies

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/users/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token in HTTP-only cookie
        Cookies.set("token", data.token, { expires: 1 }); // Expires in 1 day

        setMessage("Login successful! Redirecting...");
        setTimeout(() => {
          window.location.href = "/"; // Redirect to the dashboard
        }, 1500);
      } else {
        setMessage(data.message || "Login failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error logging in.");
    }

    setLoading(false);
  };

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
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-[#727D73] mb-4 text-center">
          مرحباً بعودتك
        </h1>
        <p className="text-[#727D73] text-center text-lg mb-6">
          نحن سعداء برؤيتك مرة أخرى. سجل دخولك للوصول إلى حسابك.
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
              تسجيل الدخول
            </h2>
            <p className="text-center text-[#727D73] mb-8">
              أدخل بيانات حسابك للوصول إلى لوحة التحكم
            </p>

            {message && (
              <div
                className={`mb-6 p-4 rounded-lg text-center ${
                  message.includes("successful")
                    ? "bg-[#D0DDD0]/30 text-[#727D73] border-r-4 border-[#AAB99A]"
                    : "bg-red-100 text-red-600 border-r-4 border-red-600"
                }`}
              >
                <p>{message}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6" dir="rtl">
              {/* البريد الإلكتروني */}
              <div className="space-y-2">
                <label className="block text-right font-medium text-[#727D73] text-sm">
                  البريد الإلكتروني
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#AAB99A]">
                    
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

              {/* Remember me & Forgot password */}
              <div className="flex justify-between items-center">
                <a
                  href="/forgot-password"
                  className="text-sm text-[#AAB99A] hover:underline"
                >
                  نسيت كلمة المرور؟
                </a>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 text-[#AAB99A] focus:ring-[#AAB99A] border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember"
                    className="mr-2 text-sm text-[#727D73]"
                  >
                    تذكرني
                  </label>
                </div>
              </div>

              {/* زر تسجيل الدخول */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-lg mt-6 text-white font-medium bg-[#AAB99A] hover:bg-[#97A788] transition-colors shadow-md relative overflow-hidden group"
              >
                <span className="relative z-10">
                  {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
                </span>
                <span className="absolute top-0 left-0 w-0 h-full bg-[#727D73] transition-all duration-300 group-hover:w-full"></span>
              </button>

              {/* Divider */}
              <div className="relative flex items-center justify-center mt-8">
                <div className="w-full border-t border-gray-200"></div>
                <div className="px-4 bg-white text-sm text-[#727D73]">أو</div>
                <div className="w-full border-t border-gray-200"></div>
              </div>

              {/* Social login buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className="py-3 px-4 bg-blue-500 text-white rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  فيسبوك
                </button>
                <button
                  type="button"
                  className="py-3 px-4 bg-red-500 text-white rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <svg
                    className="w-5 h-5 ml-2"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="M12.48 10.92v3.28h4.92c-.2 1.26-1.1 2.34-2.3 2.9v2.42h3.72c2.2-2 3.46-4.92 3.46-8.42 0-.8-.08-1.56-.2-2.3h-9.6v2.12z"
                      fill="#4285F4"
                    />
                    <path
                      d="M5.3 14.13l-.78 2.91 2.84.06c-1.15 2.14-3.36 3.6-5.88 3.6-3.52 0-6.38-2.86-6.38-6.38s2.86-6.38 6.38-6.38c1.58 0 3.01.58 4.12 1.54l2.12-2.12C6.01 5.62 3.8 4.7 1.48 4.7c-4.84 0-8.74 3.92-8.74 8.76 0 4.84 3.92 8.74 8.74 8.74 4.56 0 8.6-3.38 8.6-8.14 0-.56-.06-1.1-.16-1.62H5.3z"
                      fill="#34A853"
                    />
                  </svg>
                  جوجل
                </button>
              </div>

              {/* Register link */}
              <div className="text-center mt-6">
                <p className="text-[#727D73]">
                  ليس لديك حساب؟{" "}
                  <a
                    href="/register-donor"
                    className="text-[#AAB99A] font-medium hover:underline"
                  >
                    إنشاء حساب جديد
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