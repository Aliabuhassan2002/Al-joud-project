import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const ContactUsMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) {
          setError("لا يوجد رمز تحقق، يرجى تسجيل الدخول");
          setLoading(false);
          return;
        }
        const response = await axios.get("http://localhost:5000/api/admin/contact-us", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessages(response.data);
      } catch (err) {
        console.error("Error fetching contact us messages:", err);
        setError("حدث خطأ أثناء جلب رسائل التواصل.");
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  const filteredMessages = messages.filter(message => 
    message.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('ar-JO', options);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-600"></div>
        <span className="mr-4 text-gray-600 text-lg">جاري التحميل...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-r-4 border-red-500 p-6 rounded-lg shadow-md">
        <div className="flex items-center">
          <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span className="mr-3 text-red-700 text-lg font-medium">{error}</span>
        </div>
        <div className="mt-4">
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-6xl mx-auto" dir="rtl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 border-b pb-4">
        <div className="flex items-center">
          <div className="bg-[#D0DDD0] p-3 rounded-full">
            <svg className="h-8 w-8 text-[#727D73]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <div className="mr-4">
            <h2 className="text-2xl font-bold text-gray-900">رسائل التواصل</h2>
            <p className="text-gray-600">إدارة رسائل اتصل بنا</p>
          </div>
        </div>
        <div className="mt-4 sm:mt-0 w-full sm:w-1/3">
          <div className="relative">
            <input
              type="text"
              placeholder="بحث عن رسائل..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 px-4 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <svg className="h-5 w-5 text-gray-400 absolute left-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-[#F0F0D7] p-5 rounded-xl shadow-sm">
          <div className="text-lg text-gray-900 font-semibold">إجمالي الرسائل</div>
          <div className="text-3xl font-bold mt-2">{messages.length}</div>
        </div>
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-5 rounded-xl shadow-sm">
          <div className="text-lg text-emerald-800 font-semibold">الرسائل الجديدة</div>
          <div className="text-3xl font-bold mt-2">{messages.filter(m => new Date(m.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}</div>
        </div>
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-5 rounded-xl shadow-sm">
          <div className="text-lg text-amber-800 font-semibold">آخر رسالة</div>
          <div className="text-lg font-bold mt-2">
            {messages.length > 0 ? formatDate(messages[0].created_at) : "لا توجد رسائل"}
          </div>
        </div>
      </div>

      {/* Messages Table */}
      <div className="overflow-x-auto rounded-xl shadow border">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gradient-to-r from-[#AAB99A] to-[#AAB99A] text-white">
              <th className="px-6 py-4 text-right font-semibold">الاسم</th>
              <th className="px-6 py-4 text-right font-semibold">البريد الإلكتروني</th>
              <th className="px-6 py-4 text-right font-semibold hidden md:table-cell">التاريخ</th>
              <th className="px-6 py-4 text-right font-semibold">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredMessages.length > 0 ? (
              filteredMessages.map((message, index) => (
                <tr 
                  key={message.id} 
                  className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                >
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900">{message.full_name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-indigo-600 hover:underline">{message.email}</div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <div className="text-gray-600">{formatDate(message.created_at)}</div>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => setSelectedMessage(message)}
                      className="px-4 py-2 bg-[#F0F0D7] text-gray-900 rounded-md hover:bg-[#AAB99A] transition-colors"
                    >
                      عرض الرسالة
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center px-6 py-10">
                  <div className="flex flex-col items-center justify-center">
                    <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <span className="mt-4 text-lg font-medium text-gray-600">لا توجد رسائل.</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredMessages.length > 0 && (
        <div className="flex justify-center mt-6">
          <nav className="flex items-center space-x-2 space-x-reverse">
            <button className="px-4 py-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200">السابق</button>
            <button className="px-3 py-2 rounded-md bg-[#727D73] text-white hover:bg-[#D0DDD0] ml-2">1</button>
            <button className="px-3 py-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200">التالي</button>
          </nav>
        </div>
      )}

      {/* Message Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full mx-4 max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">تفاصيل الرسالة</h3>
                <button 
                  onClick={() => setSelectedMessage(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500">الاسم</div>
                  <div className="font-semibold text-lg">{selectedMessage.full_name}</div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500">البريد الإلكتروني</div>
                  <div className="font-semibold text-lg text-indigo-600">{selectedMessage.email}</div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500">تاريخ الإرسال</div>
                  <div className="font-semibold">{formatDate(selectedMessage.created_at)}</div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500">الرسالة</div>
                  <div className="mt-2 text-gray-800 whitespace-pre-line leading-relaxed">{selectedMessage.message}</div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end space-x-2 space-x-reverse">
                <button 
                  onClick={() => window.open(`mailto:${selectedMessage.email}`)}
                  className="px-4 py-2 bg-[#727D73] ml-5 text-white rounded-md hover:bg-[#AAB99A]"
                >
                  رد عبر البريد
                </button>
                <button 
                  onClick={() => setSelectedMessage(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactUsMessages;