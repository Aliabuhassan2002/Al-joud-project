import React, { useState, useEffect } from "react";
import axios from "axios";
import { UserCheck, Search, Loader2, AlertCircle } from "lucide-react";
import ViewDonorDetailsModal from "./ViewDonorDetailsModal";

const DonorManagement = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search and Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [minDonation, setMinDonation] = useState("");
  const [maxDonation, setMaxDonation] = useState("");

  // For refresh/spinner
  const [refreshing, setRefreshing] = useState(false);

  // Modal states
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch donors from /api/admin/donors
  const fetchDonors = async () => {
    try {
      setRefreshing(true);
      const response = await axios.get("http://localhost:5000/api/admin/donors");
      if (Array.isArray(response.data)) {
        setDonors(response.data);
        setError(null);
      } else {
        setError("تنسيق غير متوقع للبيانات من الخادم.");
      }
    } catch (err) {
      setError("حدث خطأ أثناء جلب بيانات المتبرعين.");
      console.error("Error fetching donors:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  // Filter & Search
  const filteredDonors = donors.filter((donor) => {
    const fullName = donor.User?.full_name?.toLowerCase() || "";
    const userIdStr = String(donor.user_id);
    const total = parseFloat(donor.total_donated || 0);

    // 1) Search check
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      const matchUserId = userIdStr.includes(lower);
      const matchFullName = fullName.includes(lower);
      if (!matchUserId && !matchFullName) {
        return false;
      }
    }

    // 2) Min Donation
    if (minDonation) {
      const minVal = parseFloat(minDonation);
      if (total < minVal) {
        return false;
      }
    }

    // 3) Max Donation
    if (maxDonation) {
      const maxVal = parseFloat(maxDonation);
      if (total > maxVal) {
        return false;
      }
    }

    return true;
  });

  // open details: calls donors/:id and users/:userId for more fields
  const openDetailsModal = async (donorId, userId) => {
    try {
      const [donorRes, userRes] = await Promise.all([
        axios.get(`http://localhost:5000/api/admin/donors/${donorId}`),
        axios.get(`http://localhost:5000/api/admin/users/${userId}`)
      ]);
      setSelectedDonor(donorRes.data);
      setSelectedUser(userRes.data);
      setIsDetailsModalOpen(true);
    } catch (err) {
      console.error("Error fetching donor/user details:", err);
    }
  };

  const closeModals = () => {
    setIsDetailsModalOpen(false);
    setSelectedDonor(null);
    setSelectedUser(null);
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
              <h1 className="text-2xl font-bold text-white">إدارة المتبرعين</h1>
              <p className="text-white/90 mt-1">عرض بيانات المتبرعين</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Input */}
            <div className="relative col-span-1 md:col-span-2">
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Search size={20} />
              </div>
              <input
                type="text"
                placeholder="ابحث بالإسم أو معرف المستخدم..."
                className="w-full pr-12 py-3 border border-gray-200 rounded-xl bg-gray-50
                  focus:ring-2 focus:ring-[#2d665f] focus:border-[#2d665f] transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Range Filter */}
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="حد أدنى للتبرع"
                className="w-1/2 border border-gray-200 rounded-xl py-3 px-4 bg-gray-50 focus:ring-2 focus:ring-[#2d665f]"
                value={minDonation}
                onChange={(e) => setMinDonation(e.target.value)}
              />
              <input
                type="number"
                placeholder="حد أقصى للتبرع"
                className="w-1/2 border border-gray-200 rounded-xl py-3 px-4 bg-gray-50 focus:ring-2 focus:ring-[#2d665f]"
                value={maxDonation}
                onChange={(e) => setMaxDonation(e.target.value)}
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
                  <th className="px-6 py-5 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    الإجراءات
                  </th>
                  <th className="px-6 py-5 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    إجمالي التبرع
                  </th>
                  <th className="px-6 py-5 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    اسم المتبرع
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredDonors.map((donor) => (
                  <tr key={donor.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <button
                        onClick={() => openDetailsModal(donor.id, donor.user_id)}
                        className="px-4 py-2 bg-[#727D73] text-white rounded-lg hover:bg-[#1f4d47] transition-colors flex items-center gap-2"
                      >
                        <UserCheck size={16} />
                        التفاصيل
                      </button>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-700">
                      {Number(donor.total_donated || 0).toLocaleString("ar-SA")} ريال
                    </td>
                    {/* Show user’s full_name directly */}
                    <td className="px-6 py-4 font-semibold text-[#2d665f]">
                      {donor.User?.full_name || "غير معروف"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredDonors.length === 0 && !loading && (
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
            <p className="text-gray-600">جاري تحميل بيانات المتبرعين...</p>
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
      <ViewDonorDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={closeModals}
        donor={selectedDonor}
        user={selectedUser}
      />
    </div>
  );
};

export default DonorManagement;
