import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const DonationDashboard = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // For CSV Export
  const [refreshing, setRefreshing] = useState(false);

  // إحصائيات
  const [stats, setStats] = useState({
    totalDonations: 0,
    averageDonation: 0,
    completedDonations: 0,
  });

  // الفلاتر
  const [statusFilter, setStatusFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        // Get the token from cookies
        const token = Cookies.get("token");

        if (!token) {
          setError("No token found, please log in.");
          setLoading(false);
          return;
        }

        // Fetch donations from the API
        const response = await axios.get("http://localhost:5000/api/admin/donations", {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token in the header
          },
        });

        if (Array.isArray(response.data)) {
          setDonations(response.data);

          // حساب الإحصائيات
          const totalCount = response.data.length;
          const totalAmount = response.data.reduce((sum, d) => sum + parseFloat(d.amount || 0), 0);
          const completedCount = response.data.filter((d) => d.payment_status === "Completed").length;

          setStats({
            totalDonations: totalCount,
            averageDonation: totalCount ? (totalAmount / totalCount).toFixed(2) : 0,
            completedDonations: completedCount,
          });
        } else {
          console.log(response.data);
          setError("تنسيق غير متوقع للبيانات من الخادم.");
        }
      } catch (err) {
        setError("حدث خطأ أثناء جلب بيانات التبرعات.");
        console.error("Error fetching donations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);


  // تطبيق الفلاتر والبحث
  const filteredDonations = donations.filter((donation) => {
    // 1) الفلترة حسب الحالة
    if (statusFilter !== "all" && donation.payment_status !== statusFilter) {
      return false;
    }

    // 2) الفلترة حسب طريقة الدفع
    if (methodFilter !== "all" && donation.payment_method !== methodFilter) {
      return false;
    }

    // 3) الفلترة حسب التاريخ
    const donationDate = new Date(donation.payment_date);
    if (startDate) {
      const start = new Date(startDate);
      if (donationDate < start) return false;
    }
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      if (donationDate > end) return false;
    }

    // 4) البحث (مثال: البحث في donor_id أو المبلغ أو الحالة)
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      const matchDonorId = String(donation.donor_id).includes(lower);
      const matchAmount = String(donation.amount).includes(lower);
      const matchStatus = donation.payment_status.toLowerCase().includes(lower);

      if (!matchDonorId && !matchAmount && !matchStatus) {
        return false;
      }
    }

    return true;
  });

  // تصدير البيانات إلى ملف CSV
  const handleExportData = () => {
    if (!filteredDonations.length) {
      alert("لا توجد بيانات للتصدير بناءً على الفلاتر الحالية.");
      return;
    }

    const headers = ["معرف المتبرع", "المبلغ", "طريقة الدفع", "الحالة", "التاريخ"];

    const rows = filteredDonations.map((d) => [
      d.donor_id,
      `${d.amount} دينار`,
      d.payment_method,
      d.payment_status,
      new Date(d.payment_date).toLocaleDateString("en-GB"), // تنسيق dd/mm/yyyy
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      headers.join(",") +
      "\n" +
      rows.map((r) => r.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.href = encodedUri;
    link.download = "التبرعات_المفلترة.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // شاشات التحميل والأخطاء
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64" dir="rtl">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="bg-red-50 border-r-4 border-red-500 p-4 rounded" dir="rtl">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-right" dir="rtl">
      {/* إحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
        <div className="bg-white p-6 rounded-lg shadow border-r-4 border-blue-500">
          <p className="text-gray-500 text-sm">عدد التبرعات</p>
          <p className="font-bold text-2xl">{stats.totalDonations}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border-r-4 border-green-500">
          <p className="text-gray-500 text-sm">متوسط التبرع</p>
          <p className="font-bold text-2xl">{stats.averageDonation} دينار</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border-r-4 border-purple-500">
          <p className="text-gray-500 text-sm">المدفوعات المكتملة</p>
          <p className="font-bold text-2xl">{stats.completedDonations}</p>
        </div>
      </div>

      {/* الفلاتر */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 space-y-4">
        <h2 className="text-lg font-bold text-gray-700 mb-2">فلاتر التبرعات</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* فلترة الحالة */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">حالة الدفع</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="block w-full border border-gray-200 rounded px-3 py-2"
            >
              <option value="all">الكل</option>
              <option value="Completed">مكتملة</option>
              <option value="Pending">قيد التنفيذ</option>
              <option value="Failed">فشلت</option>
            </select>
          </div>

          {/* فلترة طريقة الدفع */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">طريقة الدفع</label>
            <select
              value={methodFilter}
              onChange={(e) => setMethodFilter(e.target.value)}
              className="block w-full border border-gray-200 rounded px-3 py-2"
            >
              <option value="all">الكل</option>
              <option value="Online">أونلاين</option>
              <option value="Bank Transfer">حوالة بنكية</option>
              <option value="Cash">نقدًا</option>
              <option value="Paypal">باي بال</option>
            </select>
          </div>

          {/* مربع البحث */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              البحث (معرف المتبرع، المبلغ، أو الحالة)
            </label>
            <input
              type="text"
              placeholder="مثال: 1 أو 100 أو Completed..."
              className="block w-full border border-gray-200 rounded px-3 py-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* نطاق التاريخ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">تاريخ البداية</label>
            <input
              type="date"
              className="block w-full border border-gray-200 rounded px-3 py-2"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">تاريخ النهاية</label>
            <input
              type="date"
              className="block w-full border border-gray-200 rounded px-3 py-2"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* العنوان وزر التصدير */}
      <div className="flex justify-between items-center mt-4">
        <h2 className="text-xl font-bold text-gray-800">التبرعات بعد الفلترة</h2>
        <button
          onClick={handleExportData}
          className="bg-[#727D73] hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 flex items-center"
        >
          تصدير البيانات
        </button>
      </div>

      {/* الجدول */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                المتبرع
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                المبلغ
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                طريقة الدفع
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                الحالة
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                التاريخ
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredDonations.length > 0 ? (
              filteredDonations.map((donation) => (
                <tr key={donation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      معرف المتبرع: {donation.donor_id}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-medium">{donation.amount} دينار</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{donation.payment_method}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        donation.payment_status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : donation.payment_status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {donation.payment_status === "Completed"
                        ? "مكتملة"
                        : donation.payment_status === "Pending"
                        ? "قيد التنفيذ"
                        : "فشلت"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(donation.payment_date).toLocaleDateString("en-GB")}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-10 text-center text-sm text-gray-500"
                >
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20 13V6a2 2 0 
                      00-2-2H6a2 2 0 
                      00-2 2v7m16 0v5a2 
                      2 0 01-2 2H6a2 
                      2 0 01-2-2v-5m16 
                      0h-2.586a1 1 0 
                      00-.707.293l-2.414
                      2.414a1 1 0 
                      01-.707.293h-3.172
                      a1 1 0 01-.707-.293
                      l-2.414-2.414A1 
                      1 0 006.586 13H4"
                    />
                  </svg>
                  <p className="mt-2 font-medium">لا توجد تبرعات مطابقة للفلاتر المحددة</p>
                  <p className="mt-1">حاول تغيير البحث أو تعديل الفلاتر.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DonationDashboard;
