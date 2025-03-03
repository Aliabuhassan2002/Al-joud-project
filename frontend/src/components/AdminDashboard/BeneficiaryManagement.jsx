import React, { useState, useEffect } from "react";
import axios from "axios";
import ViewDetailsModal from "./ViewDetailsModal";
import ModifyStatusModal from "./ModifyStatusModal";
import { Edit, UserCheck, Search, Loader2, AlertCircle } from "lucide-react";

const BeneficiaryManagement = () => {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const statusStyles = {
    null: { text: "قيد الانتظار", color: "bg-amber-100 text-amber-800" },
    true: { text: "موافَق عليه", color: "bg-emerald-100 text-emerald-800" },
    false: { text: "مرفوض", color: "bg-rose-100 text-rose-800" }
  };

  const fetchBeneficiaries = async () => {
    try {
      setRefreshing(true);
      const response = await axios.get("http://localhost:5000/api/admin/beneficiaries");
      if (Array.isArray(response.data)) {
        setBeneficiaries(response.data);
        setError(null);
      } else {
        setError("تنسيق غير متوقع للبيانات من الخادم.");
      }
    } catch (error) {
      setError("حدث خطأ أثناء جلب بيانات المستفيدين.");
      console.error("Error fetching beneficiaries:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchBeneficiaries();
  }, []);

  const filteredBeneficiaries = beneficiaries.filter((beneficiary) => {
    if (filterStatus === "verified" && beneficiary.verified !== true) return false;
    if (filterStatus === "unverified" && beneficiary.verified !== null) return false;
    if (filterStatus === "rejected" && beneficiary.verified !== false) return false;
    if (searchTerm && !String(beneficiary.user_id).includes(searchTerm)) return false;
    return true;
  });

  const openDetailsModal = async (beneficiaryId, userId) => {
    try {
      const [beneficiaryRes, userRes] = await Promise.all([
        axios.get(`http://localhost:5000/api/admin/beneficiaries/${beneficiaryId}`),
        axios.get(`http://localhost:5000/api/admin/users/${userId}`)
      ]);
      setSelectedBeneficiary(beneficiaryRes.data);
      setSelectedUser(userRes.data);
      setIsDetailsModalOpen(true);
    } catch (err) {
      console.error("Error fetching details:", err);
    }
  };

  const openStatusModal = (beneficiary) => {
    setSelectedBeneficiary(beneficiary);
    setIsStatusModalOpen(true);
  };

  const closeModals = () => {
    setIsDetailsModalOpen(false);
    setIsStatusModalOpen(false);
    setSelectedBeneficiary(null);
    setSelectedUser(null);
  };

  const updateBeneficiaryStatus = (id, newStatus) => {
    setBeneficiaries(prev => prev.map(b => b.id === id ? {...b, verified: newStatus} : b));
  };

  return (
    <div className="space-y-6 text-right" dir="rtl">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#727D73] to-[#727D73] p-8 rounded-2xl shadow-lg mx-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/10 rounded-xl">
              <UserCheck className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">إدارة المستفيدين</h1>
              <p className="text-white/90 mt-1">إدارة طلبات المستفيدين وتعديل حالاتهم</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-[#2d665f] focus:border-[#2d665f] transition-all"
              >
                <option value="all">جميع الحالات</option>
                <option value="verified">الموافَق عليهم</option>
                <option value="rejected">المرفوضين</option>
              </select>
            </div>
            
            <div className="relative col-span-2">
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Search size={20} />
              </div>
              <input
                type="text"
                placeholder="ابحث باستخدام معرف المستفيد..."
                className="w-full pr-12 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-[#2d665f] focus:border-[#2d665f] transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#f8faf9] border-b border-gray-200">
                <tr>
                  <th className="px-6 py-5 text-sm font-semibold text-gray-600 uppercase tracking-wider">الإجراءات</th>
                  <th className="px-6 py-5 text-sm font-semibold text-gray-600 uppercase tracking-wider">الحالة</th>
                  <th className="px-6 py-5 text-sm font-semibold text-gray-600 uppercase tracking-wider">المتبقي</th>
                  <th className="px-6 py-5 text-sm font-semibold text-gray-600 uppercase tracking-wider">إجمالي الدين</th>
                  <th className="px-6 py-5 text-sm font-semibold text-gray-600 uppercase tracking-wider">المعرف</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredBeneficiaries.map((beneficiary) => (
                  <tr key={beneficiary.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex gap-3">
                        <button
                          onClick={() => openDetailsModal(beneficiary.id, beneficiary.user_id)}
                          className="px-4 py-2 bg-[#727D73] text-white rounded-lg hover:bg-[#1f4d47] transition-colors flex items-center gap-2"
                        >
                          <UserCheck size={16} />
                          التفاصيل
                        </button>
                        <button
                          onClick={() => openStatusModal(beneficiary)}
                          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                        >
                          <Edit size={16} />
                          التعديل
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusStyles[beneficiary.verified]?.color}`}>
                        {statusStyles[beneficiary.verified]?.text}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-700">
                      {Number(beneficiary.remaining_debt).toLocaleString("ar-SA")} دينار
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-700">
                      {Number(beneficiary.total_debt).toLocaleString("ar-SA")} دينار
                    </td>
                    <td className="px-6 py-4 font-semibold text-[#2d665f]">#{beneficiary.user_id}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredBeneficiaries.length === 0 && !loading && (
              <div className="py-12 text-center">
                <div className="text-gray-400 mb-4">لا توجد نتائج مطابقة</div>
                <Search className="mx-auto text-gray-300" size={40} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center">
            <Loader2 className="animate-spin text-[#2d665f] mb-4" size={32} />
            <p className="text-gray-600">جاري تحميل بيانات المستفيدين...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 mt-4">
          <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex items-center gap-2 text-red-700">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Modals */}
      <ViewDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={closeModals}
        beneficiary={selectedBeneficiary}
        user={selectedUser}
      />
      <ModifyStatusModal
        isOpen={isStatusModalOpen}
        onClose={closeModals}
        beneficiary={selectedBeneficiary}
        onUpdate={updateBeneficiaryStatus}
      />
    </div>
  );
};

export default BeneficiaryManagement;