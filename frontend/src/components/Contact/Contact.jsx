import React, { useState } from "react";
import axios from "axios";
import {
  FaCheckCircle,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaUsers,
  FaHandsHelping,
  FaBuilding,
} from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

export default function Contact() {
  const [formStatus, setFormStatus] = useState(null);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      "http://localhost:5000/api/contact/submit", // Make sure this is correct
      formData
    );
    setFormStatus("success");
    console.log(response.data.message);
  } catch (error) {
    console.error("There was an error!", error);
    setFormStatus("error");
  }
};


  return (
    <div dir="rtl" className="min-h-screen bg-white flex flex-col">
      <div className="max-w-6xl w-full mx-auto px-6 mt-20 mb-20">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-5">
            <div className="p-8 md:p-10 col-span-3 border-b md:border-b-0 md:border-r border-gray-200">
              <h2 className="text-2xl font-bold mb-8 text-[#AAB99A]">
                أرسل لنا رسالة
              </h2>

              {formStatus === "success" ? (
                <div className="bg-[#D0DDD0] border border-[#D0DDD0] rounded-lg p-6 text-center">
                  <FaCheckCircle className="w-12 h-12 mx-auto mb-4 text-[#AAB99A]" />
                  <h3 className="text-xl font-medium mb-2 text-[#AAB99A]">
                    شكراً لك!
                  </h3>
                  <p className="text-[#AAB99A]">
                    تم استلام رسالتك. سنعاود الاتصال بك قريباً.
                  </p>
                  <button
                    onClick={() => setFormStatus(null)}
                    className="mt-4 px-4 py-2 rounded-md font-medium text-white bg-[#AAB99A] hover:bg-[#D0DDD0]"
                  >
                    إرسال رسالة أخرى
                  </button>
                </div>
              ) : (
                <form className="space-y-5 mt-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-[#AAB99A]">
                        الاسم الأول
                      </label>
                      <input
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        className="block w-full px-4 py-3 rounded-md border border-[#D0DDD0] focus:outline-none focus:ring-2 focus:ring-[#AAB99A]"
                        placeholder="اسمك الأول"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-[#AAB99A]">
                      البريد الإلكتروني
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full px-4 py-3 rounded-md border border-[#D0DDD0] focus:outline-none focus:ring-2 focus:ring-[#AAB99A]"
                      placeholder="بريدك الإلكتروني"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-[#AAB99A]">
                      الرسالة
                    </label>
                    <textarea
                      rows="4"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="block w-full px-4 py-3 rounded-md border border-[#D0DDD0] focus:outline-none focus:ring-2 focus:ring-[#AAB99A]"
                      placeholder="أخبرنا كيف تود المشاركة..."
                      required
                    ></textarea>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 px-4 rounded-md text-white font-medium bg-[#AAB99A] hover:bg-[#D0DDD0] focus:outline-none focus:ring-2 focus:ring-[#AAB99A]"
                    >
                      إرسال رسالتك
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Contact Info Section */}
            <div className="col-span-2 p-8 md:p-10 bg-gray-50">
              <h3 className="text-xl font-bold mb-6 text-[#AAB99A]">
                كيف تساعد مساهمتك؟
              </h3>

              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full mr-4 bg-[#D0DDD0]">
                    <FaUsers className="w-6 h-6 text-[#AAB99A]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#AAB99A]">5,000+</h4>
                    <p className="text-sm text-[#AAB99A]">
                      أشخاص يتم مساعدتهم سنوياً
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full mr-4 bg-[#D0DDD0]">
                    <FaHandsHelping className="w-6 h-6 text-[#AAB99A]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#AAB99A]">200+</h4>
                    <p className="text-sm text-[#AAB99A]">متطوعين نشطين</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full mr-4 bg-[#D0DDD0]">
                    <FaBuilding className="w-6 h-6 text-[#AAB99A]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#AAB99A]">15</h4>
                    <p className="text-sm text-[#AAB99A]">مراكز مجتمعية</p>
                  </div>
                </div>

                <hr className="border-gray-200" />

                {/* Contact Information */}
                <div>
                  <h3 className="text-xl font-bold mb-4 text-[#AAB99A]">
                    تواصل معنا
                  </h3>
                  <div className="space-y-3 text-[#AAB99A]">
                    <div className="flex items-start">
                      <FaPhone className="w-5 h-5 mt-1 ml-3" />
                      <span>(123) 456-7890</span>
                    </div>

                    <div className="flex items-start">
                      <HiOutlineMail className="w-5 h-5 mt-1 ml-3" />
                      <span>contact@yourcharity.org</span>
                    </div>

                    <div className="flex items-start">
                      <FaMapMarkerAlt className="w-5 h-5 mt-1 ml-3" />
                      <span>
                        شارع الجمعية 123
                        <br />
                        اسم المدينة، الرمز 12345
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
