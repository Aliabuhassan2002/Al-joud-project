import React from 'react'

function SuccessStory() {
  return (
    <>
    <div className="py-10 text-center">
  <h2 className="text-4xl font-bold mb-6 text-black">شهادات المتبرعين والمستفيدين</h2>
  <p className="text-lg text-[#AAB99A] mb-12">آراء وقصص نجاح من المستخدمين</p>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
    {/* Testimonial 1 */}
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <p className="text-black mb-4">
        "كانت تجربتي مع المنصة مذهلة، سهولة في التبرع ووصول مباشر لمن يحتاج."
      </p>
      <div className="flex items-center gap-4">
        <img src="https://i.pinimg.com/736x/ab/b2/ab/abb2ab6821c0f87c168986c5e8fce5d4.jpg" alt="User" className="w-12 h-12 rounded-full" />
        <div>
          <h3 className="text-lg font-semibold text-[#AAB99A]">أحمد خالد</h3>
          <p className="text-sm text-black">متبرع</p>
        </div>
      </div>
    </div>

    {/* Testimonial 2 */}
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <p className="text-black mb-4">
        "الحمد لله، تلقيت المساعدة من خلال هذه المنصة وتمكنت من تسديد ديني."
      </p>
      <div className="flex items-center gap-4">
        <img src="https://i.pinimg.com/736x/54/3b/17/543b1709de6fc0ae7d3ba89832025c5c.jpg" alt="User" className="w-12 h-12 rounded-full" />
        <div>
          <h3 className="text-lg font-semibold text-[#AAB99A]">محمد علي</h3>
          <p className="text-sm text-black">مستفيد</p>
        </div>
      </div>
    </div>

    {/* Testimonial 3 */}
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <p className="text-black mb-4">
        "أشعر بالفخر لمساهمتي في دعم العائلات المحتاجة عبر هذه المنصة الموثوقة."
      </p>
      <div className="flex items-center gap-4">
        <img src="https://i.pinimg.com/736x/fa/d2/e4/fad2e4a427cdd875ba67a980bd2d6697.jpg" alt="User" className="w-12 h-12 rounded-full" />
        <div>
          <h3 className="text-lg font-semibold text-[#AAB99A]">سارة محمود</h3>
          <p className="text-sm text-black">متبرعة</p>
        </div>
      </div>
    </div>
  </div>
</div>



    </>
  )
}

export default SuccessStory
