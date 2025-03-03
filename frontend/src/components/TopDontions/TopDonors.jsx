// TopDonors.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const TopDonors = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make sure the URL matches the backend route
        const donorRes = await axios.get("http://localhost:5000/api/top/donors"); 
        setDonors(donorRes.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("فشل في تحميل البيانات. يرجى المحاولة لاحقًا.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center py-6">جاري التحميل...</div>;
  if (error) return <div className="text-center py-6 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen mb-20 bg-white font-sans" dir="rtl">
      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-4 pt-15">
        {/* Title Section */}
        <div className="text-right mb-8">
          <h1 className="text-3xl font-bold text-[#727D73] mb-2">قائمة أبرز المحسنين</h1>
          <p className="text-black">قائمة الجهات والأفراد الذين تبرعوا في مختلف مجالات الخير والعطاء.</p>
        </div>

        {/* Donors List */}
        <div className="border rounded-lg overflow-hidden" dir="rtl">
          <div className="bg-white">
            {donors.map((donor, index) => (
              <div key={donor.id} className="flex flex-row-reverse justify-between p-4 border-b">
                <div className="text-left"> {/* اسم المتبرع */}
                  <div className="text-lg font-bold">{donor.User?.full_name || "غير معروف"}</div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-[#AAB99A] flex items-center justify-center rounded-full text-white font-bold">
                    {index + 1}
                  </div> {/* الترتيب */}
                  <div className="text-right font-bold mr-4">
                    {(donor.total_donated || 0).toLocaleString()}{" "}
                    <span className="text-[#AAB99A]">دينار أردني</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TopDonors;
