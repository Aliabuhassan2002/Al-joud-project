import React, { useState } from "react";
import axios from "axios";

const ModifyStatusModal = ({ isOpen, onClose, beneficiary, onUpdate }) => {
  const [status, setStatus] = useState(beneficiary?.verified);

  if (!isOpen || !beneficiary) return null; // Don't render if not open

  // Handle status change
  const handleStatusChange = async () => {
    try {
      await axios.put(`http://localhost:5000/api/admin/beneficiaries/${beneficiary.id}`, {
        verified: status,
      });
      onUpdate(beneficiary.id, status); // Update state in parent
      onClose(); // Close modal
    } catch (error) {
      console.error("Error updating verification status:", error);
    }
  };

  // Status option labels in Arabic
  const statusLabels = {
    true: "موافق عليه",
    false: "مرفوض"
  };

  return (
    <div dir="rtl" className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 font-sans">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md border border-emerald-100">
        {/* Header with Arabic-inspired design */}
        <div className="p-6 border-b border-emerald-100 flex justify-between items-center bg-emerald-50 rounded-t-3xl">
          <h3 className="text-xl font-bold text-emerald-800">تعديل حالة التحقق</h3>
          <button onClick={onClose} className="p-2 hover:bg-emerald-100 rounded-full text-emerald-500 hover:text-emerald-700 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Content area */}
        <div className="p-6 space-y-5">
          <p className="text-gray-700">تغيير حالة التحقق للمستفيد <strong className="text-emerald-700">{beneficiary.user_id}</strong>:</p>
          
          <div className="relative">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value === "true" ? true : e.target.value === "false" ? false : null)}
              className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 border-emerald-200 bg-white text-right appearance-none pr-4"
            >
              <option value="true">{statusLabels.true}</option>
              <option value="false">{statusLabels.false}</option>
            </select>
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Footer with Arabic-styled buttons */}
        <div className="p-6 border-t border-emerald-100 flex justify-start space-x-0 space-x-reverse space-x-4">
          <button 
            onClick={handleStatusChange} 
            className="px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors shadow-sm"
          >
            حفظ التغييرات
          </button>
          <button 
            onClick={onClose} 
            className="px-6 py-3 text-emerald-700 hover:text-emerald-800 font-medium rounded-xl hover:bg-emerald-50 border border-emerald-200 transition-colors"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModifyStatusModal;