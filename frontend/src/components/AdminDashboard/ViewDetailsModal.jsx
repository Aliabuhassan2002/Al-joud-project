import React from "react";

const ViewDetailsModal = ({ isOpen, onClose, user, beneficiary }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center p-4 z-50 transition-opacity duration-300"
      onClick={onClose}
    >
      {/* Modal Content */}
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col text-right animate-fadeIn transform transition-all"
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gradient-to-l from-blue-50 to-white rounded-t-2xl">
          <h3 className="text-2xl font-bold text-gray-800">تفاصيل المستفيد</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none transition-colors"
            aria-label="إغلاق"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body: make it scrollable */}
        <div className="px-6 py-6 overflow-y-auto flex-1 space-y-8">
          {user && beneficiary ? (
            <>
              {/* USER SECTION */}
              <div className="space-y-6">
                {/* User Header with Image */}
                <div className="flex items-start space-x-4 space-x-reverse">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt="صورة المستخدم"
                      className="w-20 h-20 rounded-full object-cover border-2 border-blue-100 shadow-sm"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 text-2xl font-bold">
                      {user.email && user.email[0].toUpperCase()}
                    </div>
                  )}
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-800 mb-1">{user.email}</h4>
                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {user.role}
                    </div>
                  </div>
                </div>

                {/* User Details Card */}
                <div className="bg-gray-50 rounded-xl p-4 shadow-sm border border-gray-100">
                  <h5 className="text-lg font-medium text-gray-800 mb-3 border-b border-gray-200 pb-2">
                    بيانات المستخدم
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-1">
                      <p className="flex justify-between">
                        <span className="font-medium text-gray-700">رقم المستخدم:</span>
                        <span className="text-gray-600">{user.id}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="font-medium text-gray-700">البريد الإلكتروني:</span>
                        <span className="text-gray-600">{user.email}</span>
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="flex justify-between">
                        <span className="font-medium text-gray-700">رقم الهاتف:</span>
                        <span className="text-gray-600">{user.phone || "غير متوفر"}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="font-medium text-gray-700">العنوان:</span>
                        <span className="text-gray-600">{user.address || "غير متوفر"}</span>
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
                      <p>
                        <span className="font-medium">تاريخ الإنشاء:</span>{" "}
                        {new Date(user.created_at).toLocaleString("ar-SA")}
                      </p>
                      <p>
                        <span className="font-medium">آخر تحديث:</span>{" "}
                        {new Date(user.updated_at).toLocaleString("ar-SA")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* BENEFICIARY SECTION */}
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                  <h4 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">
                    معلومات المستفيد
                  </h4>

                  {/* Status Badge */}
                  <div className="mb-4">
                    <div
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        beneficiary.verified === null
                          ? "bg-yellow-100 text-yellow-800"
                          : beneficiary.verified
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full mr-2 ${
                        beneficiary.verified === null
                          ? "bg-yellow-400"
                          : beneficiary.verified
                          ? "bg-green-400"
                          : "bg-red-400"
                      }`}></span>
                      {beneficiary.verified === null ? "قيد الانتظار" : beneficiary.verified ? "موافَق عليه" : "مرفوض"}
                    </div>
                  </div>

                  {/* Debt Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <p className="text-sm text-blue-600 font-medium mb-1">إجمالي الدين</p>
                      <p className="text-2xl font-bold text-blue-700 ltr:text-left rtl:text-right">
                        {(+beneficiary.total_debt).toLocaleString("ar-SA")}
                        <span className="text-sm font-normal mr-1">دينار</span>
                      </p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <p className="text-sm text-green-600 font-medium mb-1">المتبقي من الدين</p>
                      <p className="text-2xl font-bold text-green-700 ltr:text-left rtl:text-right">
                        {(+beneficiary.remaining_debt).toLocaleString("ar-SA")}
                        <span className="text-sm font-normal mr-1">دينار</span>
                      </p>
                    </div>
                  </div>

                  {/* Basic Beneficiary Fields */}
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-gray-700 font-medium mb-1">رقم المستفيد:</p>
                      <p className="text-gray-600 bg-gray-50 p-2 rounded">{beneficiary.id}</p>
                    </div>
                    <div>
                      <p className="text-gray-700 font-medium mb-1">رقم المستخدم المرتبط:</p>
                      <p className="text-gray-600 bg-gray-50 p-2 rounded">{beneficiary.user_id}</p>
                    </div>
                  </div>

                  {/* Reason / Additional Fields */}
                  {beneficiary.reason && (
                    <div className="mb-4">
                      <p className="text-gray-700 font-medium mb-1">السبب:</p>
                      <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{beneficiary.reason}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 text-xs text-gray-500 mb-4 pt-2 border-t border-gray-100">
                    <div>
                      <p className="font-medium mb-1">تاريخ الإنشاء:</p>
                      <p>{new Date(beneficiary.created_at).toLocaleString("ar-SA")}</p>
                    </div>
                    <div>
                      <p className="font-medium mb-1">آخر تحديث:</p>
                      <p>{new Date(beneficiary.updated_at).toLocaleString("ar-SA")}</p>
                    </div>
                  </div>

                  {/* Identity Image */}
                  {beneficiary.identity_image && (
                    <div className="mt-5">
                      <p className="font-medium text-gray-700 mb-2">صورة الهوية</p>
                      <div className="border-2 border-gray-100 rounded-lg p-1 shadow-sm">
                        <img
                          src={beneficiary.identity_image}
                          alt="صورة الهوية"
                          className="rounded-lg w-full max-w-md object-cover mx-auto hover:scale-105 transition-transform cursor-zoom-in"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            // Loading
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-3" />
              <p className="text-gray-500">جاري تحميل البيانات...</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 flex justify-end space-x-3 space-x-reverse bg-gray-50 rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-white text-gray-700 hover:text-gray-900 font-medium 
            rounded-lg hover:bg-gray-100 transition-colors shadow-sm border border-gray-200"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewDetailsModal;