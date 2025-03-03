import React from "react";

/**
 * @param {boolean}  isOpen
 * @param {function} onClose
 * @param {object}   donor       - The donor record from the backend
 * @param {object}   user        - The user record (if included)
 */
const ViewDonorDetailsModal = ({ isOpen, onClose, donor, user }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 p-4 transition-all duration-300"
      onClick={onClose}
      dir="rtl"
    >
      <div
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 relative border border-gray-100 animate-in fade-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative Element */}
        <div className="absolute -left-1 top-8 bottom-8 w-1 bg-gradient-to-b from-[#F0F0D7] to-[#F0F0D7] rounded-full"></div>

        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <span className="text-[#AAB99A]">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </span>
            تفاصيل المتبرع
          </h2>
          <button
            className="text-gray-500 hover:bg-gray-100 p-2 rounded-full transition-all duration-200 hover:text-red-500"
            onClick={onClose}
            aria-label="إغلاق"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        {donor && user ? (
          <>
            {/* Donor Info */}
            <div className="bg-green-100 rounded-xl p-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-3">
                <span className="text-green-600 text-sm bg-green-100 p-1 rounded">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                </span>
                بيانات المتبرع
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <p className="text-xs text-gray-500">معرف المتبرع</p>
                  <p className="text-sm font-bold text-gray-800 mt-1 font-mono">{donor.id}< /p>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <p className="text-xs text-gray-500">إجمالي التبرع</p>
                  <p className="text-sm font-bold text-green-600 mt-1">
                    {Number(donor.total_donated || 0).toLocaleString("ar-SA")} ريال
                  </p>
                </div>
              </div>
            </div>

            {/* User Info */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-3">
                <span className="text-green-600 text text-sm bg-green-100 p-1 rounded">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </span>
                معلومات المستخدم
              </h3>
              <div className="space-y-3">
                <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                  <span className="text-gray-400 mr-2">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs text-gray-500">الاسم الكامل</p>
                    <p className="text-sm font-medium text-gray-800">{user.full_name}</p>
                  </div>
                </div>
                
                <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                  <span className="text-gray-400 mr-2">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs text-gray-500">البريد الإلكتروني</p>
                    <p className="text-sm font-medium text-gray-800">{user.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                  <span className="text-gray-400 mr-2">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs text-gray-500">العنوان</p>
                    <p className="text-sm font-medium text-gray-800">{user.address || "غير متوفر"}</p>
                  </div>
                </div>
                
                <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                  <span className="text-gray-400 mr-2">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs text-gray-500">رقم الهاتف</p>
                    <p className="text-sm font-medium text-gray-800 dir-ltr text-right">{user.phone || "غير متوفر"}</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="py-12 flex flex-col items-center justify-center">
            <div className="animate-spin mb-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="text-[#AAB99A]"
              >
                <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
              </svg>
            </div>
            <p className="text-center text-gray-500">
              يتم جلب البيانات...
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gradient-to-r from-[#727D73] to-[#727D73] text-white rounded-lg hover:from-[#AAB99A] hover:to-[#AAB99A] transition-all duration-300 font-medium shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewDonorDetailsModal;