import React from 'react'

function Statistics() {
  return (
   <>
   <div className="py-10 flex flex-col items-center">
  {/* Header */}
  <div className="text-center text-black mb-10">
    <h1 className="text-5xl font-bold mb-4">إحسانكم لعام 2025</h1>
    <p className="text-xl text-[#AAB99A]">إحصائيات تعكس تبرعاتكم عبر منصتنا لعام 2025</p>
  </div>

  {/* Stats Cards */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-9xl mr-10 pl-10">
    {/* Total Donations */}
    <div className="bg-[#D0DDD0] rounded-1xl overflow-hidden shadow-lg">
      <img src="https://i.pinimg.com/736x/9b/d3/59/9bd359ed785227092e008b4c476bb07f.jpg" alt="إجمالي التبرعات" className="w-full h-40 object-cover" />
      <div className="p-6 text-center text-white">
        <h2 className="text-2xl font-semibold mb-3">إجمالي التبرعات</h2>
        <p className="text-5xl font-bold mb-2">349,3 ألف</p>
        <p className="text-lg">دينار أردني</p>
      </div>
    </div>

    {/* Beneficiaries */}
    <div className="bg-[#D0DDD0] rounded-1xl overflow-hidden shadow-lg">
      <img src="https://i.pinimg.com/736x/92/37/dd/9237ddfde4af49f20ad7f19c3fc0a012.jpg" alt="عدد المستفيدين" className="w-full h-40 object-cover" />
      <div className="p-6 text-center text-white">
        <h2 className="text-2xl font-semibold mb-3">عدد المستفيدين</h2>
        <p className="text-5xl font-bold mb-2">213,7 ألف</p>
        <p className="text-lg">مستفيد</p>
      </div>
    </div>

    {/* Donation Count */}
    <div className="bg-[#D0DDD0] rounded-1xl overflow-hidden shadow-lg">
      <img src="https://i.pinimg.com/736x/1c/c1/9e/1cc19efb2f069b229b6e5c580e47cc86.jpg" alt="عدد عمليات التبرع" className="w-full h-40 object-cover" />
      <div className="p-6 text-center text-white">
        <h2 className="text-2xl font-semibold mb-3">عدد عمليات التبرع</h2>
        <p className="text-5xl font-bold mb-2">1,9 مليون</p>
        <p className="text-lg">عملية تبرع</p>
      </div>
    </div>

    {/* Donors Count */}
    <div className="bg-[#D0DDD0] rounded-1xl overflow-hidden shadow-lg">
      <img src="https://i.pinimg.com/736x/0f/1a/20/0f1a20dc85c69c3ce2ce0650694d751d.jpg" alt="عدد المتبرعين" className="w-full h-40 object-cover" />
      <div className="p-6 text-center text-white">
        <h2 className="text-2xl font-semibold mb-3">عدد المتبرعين</h2>
        <p className="text-5xl font-bold mb-2">578,4 ألف</p>
        <p className="text-lg">متبرع</p>
      </div>
    </div>
  </div>
</div>


   </>
  )
}

export default Statistics
