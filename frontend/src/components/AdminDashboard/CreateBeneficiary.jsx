// CreateBeneficiary.jsx
import React, { useState } from "react";
import axios from "axios";

const CreateBeneficiary = () => {
  const [totalDebt, setTotalDebt] = useState("");
  const [reason, setReason] = useState("");
  const [category, setCategory] = useState("");
  const [identityImage, setIdentityImage] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("total_debt", totalDebt);
    formData.append("reason", reason);
    formData.append("category", category);
    if (identityImage) {
      formData.append("identity_image", identityImage);
    }

    try {
      const response = await axios.post("http://localhost:5000/api/admin/beneficiaries", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccessMessage(response.data.message);
      setError(null); // Reset error message
    } catch (err) {
      setError("حدث خطأ أثناء إنشاء المستفيد");
      setSuccessMessage(null); // Reset success message
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">إنشاء مستفيد جديد</h1>

      {error && <div className="text-red-600 mb-4">{error}</div>}
      {successMessage && <div className="text-green-600 mb-4">{successMessage}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="totalDebt">إجمالي الديون</label>
          <input
            type="number"
            id="totalDebt"
            value={totalDebt}
            onChange={(e) => setTotalDebt(e.target.value)}
            required
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="reason">سبب المساعدة</label>
          <textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
            className="px-4 py-2 border border-gray-300 rounded-lg"
          ></textarea>
        </div>

        <div className="flex flex-col">
          <label htmlFor="category">الفئة</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="فك كربة السجناء">فك كربة السجناء</option>
            <option value="مساعدة المرضى">مساعدة المرضى</option>
            <option value="سداد ديون الأسر المحتاجة">سداد ديون الأسر المحتاجة</option>
            <option value="سداد ديون التعليم">سداد ديون التعليم</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="identityImage">رفع صورة الهوية</label>
          <input
            type="file"
            id="identityImage"
            onChange={(e) => setIdentityImage(e.target.files[0])}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-2 rounded-lg"
        >
          إنشاء مستفيد
        </button>
      </form>
    </div>
  );
};

export default CreateBeneficiary;
