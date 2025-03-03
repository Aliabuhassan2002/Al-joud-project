import React from 'react'
import { Link } from "react-router-dom";

function BenficiarySection() {
  return (
    <>
      <div className="w-full px-8 py-20 flex flex-col items-center">
        <div className="max-w-6xl text-center">
          <h2 className="text-5xl font-extrabold text-gray-900 mb-8">
            كيفية التقديم كمستفيد
          </h2>

          <p className="max-w-6xl mx-auto text-xl leading-relaxed text-gray-700 mb-12">
            إذا كنت بحاجة إلى المساعدة، يمكنك تقديم طلب للاستفادة من خدماتنا
            بسهولة. قم بملء النموذج عبر منصتنا، وسنتواصل معك بعد مراجعة طلبك
            للتحقق من التفاصيل والتأكد من وصول الدعم إلى من يستحقه. نحن هنا
            لمساعدتك في تجاوز الأزمات المالية بكرامة وأمان.
          </p>

          <Link
            to="/register-beneficiary"
            className="inline-flex items-center gap-x-2 bg-[#AAB99A] px-6 py-3 text-lg font-bold text-white shadow-md transition duration-300 hover:bg-[#91A288] transform hover:scale-105"
          >
            <span>قدّم الآن</span>
            <svg
              className="h-5 w-5 rtl:rotate-180"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L15.586 10l-3.293-3.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}

export default BenficiarySection
