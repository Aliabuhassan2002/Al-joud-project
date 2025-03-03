import React, { useState } from 'react';
import axios from 'axios';

const CreateUserAndBeneficiary = () => {
  const [full_name, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('beneficiary');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [total_debt, setTotalDebt] = useState('');
  const [reason, setReason] = useState('');
  const [category, setCategory] = useState('');
  const [identity_image, setIdentityImage] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageName, setImageName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData();
    formData.append('full_name', full_name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('role', role);
    formData.append('address', address);
    formData.append('phone', phone);
    formData.append('total_debt', total_debt);
    formData.append('reason', reason);
    formData.append('category', category);
    if (identity_image) {
      formData.append('identity_image', identity_image);
    }
  
    try {
      const response = await axios.post('http://localhost:5000/api/admin/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccessMessage(response.data.message);
      setError('');
      // Clear form fields after successful submission
      resetForm();
    } catch (err) {
      setError('حدث خطأ أثناء إنشاء المستفيد');
      setSuccessMessage('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFullName('');
    setEmail('');
    setPassword('');
    setAddress('');
    setPhone('');
    setTotalDebt('');
    setReason('');
    setCategory('');
    setIdentityImage(null);
    setImageName('');
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setIdentityImage(e.target.files[0]);
      setImageName(e.target.files[0].name);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8" dir="rtl">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="bg-[#D0DDD0] py-6 px-8 ">
          <h1 className="text-2xl font-bold text-black">إنشاء مستفيد جديد</h1>
          <p className="text-black mt-1">قم بإدخال بيانات المستفيد لإنشاء حساب جديد</p>
        </div>

        {error && (
          <div className="bg-red-50 border-r-4 border-red-500 p-4 mx-6 mt-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="mr-3">
                <p className="text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        {successMessage && (
          <div className="bg-green-50 border-r-4 border-green-500 p-4 mx-6 mt-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="mr-3">
                <p className="text-green-800">{successMessage}</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col space-y-2">
              <label htmlFor="full_name" className="text-gray-700 font-medium">الاسم الكامل</label>
              <input
                type="text"
                id="full_name"
                value={full_name}
                onChange={(e) => setFullName(e.target.value)}
                required
                placeholder="أدخل الاسم الكامل"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="email" className="text-gray-700 font-medium">البريد الإلكتروني</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="example@example.com"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="password" className="text-gray-700 font-medium">كلمة المرور</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="********"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="phone" className="text-gray-700 font-medium">رقم الهاتف</label>
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="05xxxxxxxx"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="address" className="text-gray-700 font-medium">العنوان</label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                placeholder="المدينة، الحي، الشارع"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="total_debt" className="text-gray-700 font-medium">إجمالي الديون</label>
              <input
                type="number"
                id="total_debt"
                value={total_debt}
                onChange={(e) => setTotalDebt(e.target.value)}
                required
                placeholder="0.00"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div className="flex flex-col space-y-2 md:col-span-2">
              <label htmlFor="category" className="text-gray-700 font-medium">الفئة</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">اختر الفئة</option>
                <option value="فك كربة السجناء">فك كربة السجناء</option>
                <option value="مساعدة المرضى">مساعدة المرضى</option>
                <option value="سداد ديون الأسر المحتاجة">سداد ديون الأسر المحتاجة</option>
                <option value="سداد ديون التعليم">سداد ديون التعليم</option>
              </select>
            </div>

            <div className="flex flex-col space-y-2 md:col-span-2">
              <label htmlFor="reason" className="text-gray-700 font-medium">سبب المساعدة</label>
              <textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
                placeholder="يرجى توضيح سبب طلب المساعدة بالتفصيل..."
                rows="4"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              ></textarea>
            </div>

            <div className="flex flex-col space-y-2 md:col-span-2">
              <label htmlFor="identity_image" className="text-gray-700 font-medium">رفع صورة الهوية</label>
              <div className="flex items-center">
                <label className="flex items-center justify-center px-4 py-2 bg-white text-[#727D73] rounded-lg border border-[#AAB99A] cursor-pointer hover:bg-green-50 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
                  </svg>
                  <span>اختيار ملف</span>
                  <input
                    type="file"
                    id="identity_image"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                <span className="mr-3 text-gray-500 text-sm">{imageName || 'لم يتم اختيار ملف'}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-between items-center border-t border-gray-200 mt-8">
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              إعادة تعيين
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-[#F0F0D7] text-gray-900 px-8 py-2 rounded-lg shadow-md hover:bg-[#D0DDD0] transition-colors flex items-center ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 ml-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  جاري الإنشاء...
                </>
              ) : (
                'إنشاء مستفيد جديد'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserAndBeneficiary;