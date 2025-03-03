import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const CardDB = () => {
  const [cardsData, setCardsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/home/beneficiaries");
        setCardsData(response.data.slice(0, 3)); // ✅ عرض أول 3 كروت فقط
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

    <div className=" mb-12 w-full flex items-center justify-center" dir="rtl">
      <div className="p-6 w-[90%] ">
        <h2 className="text-4xl font-bold text-black text-center mb-10">حالات للتبرع</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cardsData.length > 0 ? (
            cardsData.map((cardData) => {
              const totalDebt = parseFloat(cardData.total_debt || 0);
              const remainingDebt = parseFloat(cardData.remaining_debt || 0);
              const collectionPercentage =
                Math.round((1 - remainingDebt / totalDebt) * 100) || 0;

              return (
                <div
                  key={cardData.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="bg-[#AAB99A] p-4 relative">
                    <div className="bg-white rounded-lg p-4 mt-2 mb-6">
                      <p className="text-center font-medium text-gray-800">
                        {cardData.reason}
                      </p>
                    </div>
                    <div
                      className="absolute bottom-0 left-0 h-2 bg-[#D0DDD0]"
                      style={{ width: `${collectionPercentage}%` }}
                    ></div>
                    <div className="absolute bottom-0 right-0 bg-[#727D73] px-2 rounded-tl-md text-white text-sm">
                      {collectionPercentage}%
                    </div>
                  </div>
                  <div className="flex justify-between items-center px-4 py-2 border-b">
                    <div className="text-gray-700">رقم الفاتورة: {cardData.id}</div>
                  </div>
                  <div className="flex justify-between items-center p-4">
                    <div className="text-right">
                      <p className="text-gray-500 mb-1">تم جمع</p>
                      <p className="font-bold text-lg">% {((cardData.remaining_debt / cardData.total_debt) * 100).toFixed()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-500 mb-1">المبلغ المتبقي</p>
                      <p className="font-bold text-lg">
                        أ.د {remainingDebt.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex p-4 gap-2">
                    <button className="bg-[#8da474] hover:bg-[#7c9364] text-white px-4 py-2 rounded-md w-1/3">
                      تبرع الآن
                    </button>
                    <div className="flex border rounded-md w-2/3">
                      <input
                        type="number"
                        className="w-full px-3 py-2 text-right outline-none"
                        placeholder="مبلغ التبرع"
                      />
                      <span className="bg-gray-100 px-3 py-2 text-gray-600 border-l">
                        د.أ
                      </span>
                    </div>
                  </div>
                  <div className="p-4 text-center border-t">
                    <Link
                      to="/Announcements"
                      className="text-gray-500 font-bold hover:cursor-pointer hover:text-gray-800"
                    >
                      عرض التفاصيل
                    </Link>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-3 text-center py-12 text-gray-500">
              لا توجد بيانات متاحة
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardDB;
