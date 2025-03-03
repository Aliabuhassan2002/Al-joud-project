import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div dir="rtl"> {/* تفعيل الاتجاه من اليمين لليسار */}
      <section className="py-10 bg-[#AAB99A] sm:pt-16 lg:pt-10">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-16 gap-x-12 text-right flex flex-row-reverse">
            
            {/* الشعار والوصف - جهة اليمين */}
            <div className="col-span-2 md:col-span-3 lg:col-span-2 lg:pr-8">
              <h3 className="font-bold text-3xl">الجود</h3>
              <p className="text-base leading-relaxed text-[black] mt-7">
                منصة خيرية تهدف إلى مساعدة المحتاجين وتسديد ديونهم، لتوفير حياة كريمة للأفراد والعائلات الذين يمرون بظروف صعبة.
              </p>
              
            </div>

            {/* باقي المحتوى - جهة اليسار */}
            <div className="col-span-4 flex flex-wrap gap-y-16">
              
              {/* روابط الموقع */}
              <div className="w-1/3">
                <p className="text-sm font-bold tracking-widest text-[black] uppercase">روابط مهمة</p>
                <ul className="mt-6 space-y-4">
                  <li><Link to="/" className="text-base text-black transition-all duration-200">الرئيسية</Link></li>
                  <li><Link to="/donate" className="text-base text-black transition-all duration-200">التبرعات</Link></li>
                  <li><Link to="/contact" className="text-base text-black transition-all duration-200">الدعم الفني</Link></li>
                  <li><Link to="/about" className="text-base text-black transition-all duration-200">من نحن</Link></li>
                </ul>
              </div>

              {/* المساعدة */}
              <div className="w-1/3">
                <p className="text-sm font-bold tracking-widest text-[black] uppercase">المساعدة</p>
                <ul className="mt-6 space-y-4">
                  <li><Link to="/faq" className="text-base text-black transition-all duration-200">الأسئلة الشائعة</Link></li>
                  <li><Link to="/support" className="text-base text-black transition-all duration-200">مركز المساعدة</Link></li>
                  <li><Link to="/terms" className="text-base text-black transition-all duration-200">الشروط والأحكام</Link></li>
                  <li><Link to="/privacy" className="text-base text-black transition-all duration-200">سياسة الخصوصية</Link></li>
                </ul>
              </div>

              {/* الاشتراك في النشرة البريدية */}
              <div className="w-1/3">
                <p className="text-sm font-semibold tracking-widest text-[black] uppercase">اشترك في النشرة البريدية</p>
                <form action="#" method="POST" className="mt-6">
                  <div>
                    <label htmlFor="email" className="sr-only">البريد الإلكتروني</label>
                    <input type="email" name="email" id="email" placeholder="أدخل بريدك الإلكتروني"
                      className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-[#AAB99A]"
                    />
                  </div>
                  <button type="submit"
                    className="inline-flex items-center justify-center px-6 py-4 mt-3 font-semibold text-black transition-all duration-200 bg-[#D0DDD0] rounded-md hover:bg-[#AAB99A]">
                    اشترك
                  </button>
                </form>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
