import React from 'react'
import { Link } from 'react-router-dom';


function Categories() {

  /////////// For Categories section//////////////////
  const categories = [
    {
      id: 1,
      title: "فك كربة السجناء",
      description: "المساهمة في سداد الديون عن السجناء.",
      image: "https://i.pinimg.com/736x/ca/da/db/cadadb25f9f16b5fe4304b0494e3ea22.jpg",
    },
    {
      id: 2,
      title: "مساعدة المرضى",
      description: "تقديم الدعم المالي للمرضى .",
      image: "https://i.pinimg.com/736x/ff/65/a9/ff65a955b40f9344e8efaa78517aec17.jpg",
    },
    {
      id: 3,
      title: "سداد ديون الأسر المحتاجة",
      description: "دعم العائلات التي تعاني من أزمات مالية .",
      image: "https://static.srpcdigital.com/styles/1037xauto/public/2025-01/932568.jpeg.webp",
    },
    {
      id: 4,
      title: "سداد ديون التعليم",
      description: "مساعدة الطلاب في سداد الرسوم المتراكمة.",
      image: "https://images.squarespace-cdn.com/content/v1/60c71940484f1a0d167f4151/729b86cf-27f5-4b26-b45a-606324797f61/unsplash-image-4nKOEAQaTgA.jpg",
    }
  ];


  /////////////////////////////////////////////////////////


  return (
    <>
      <div className="bg-white mb-20 p-8 font-sans flex flex-col items-center" dir="rtl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#AAB99A] flex items-center justify-center">
            مجالات الإحسان
            <span className="ml-2">
              <svg className="w-6 h-6 text-[#AAB99A]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 6.25C12 6.25 8.5 8.5 8.5 12C8.5 15.5 12 17.75 12 17.75C12 17.75 15.5 15.5 15.5 12C15.5 8.5 12 6.25 12 6.25Z" fill="#AAB99A" />
                <path d="M12 6.25C11.5 5 10.5 2 14 2C17.5 2 20 4 20 4C20 4 22 6 22 9.5C22 13 20 15 20 15" stroke="#AAB99A" strokeWidth="1.5" />
                <path d="M12 6.25C12.5 5 13.5 2 10 2C6.5 2 4 4 4 4C4 4 2 6 2 9.5C2 13 4 15 4 15" stroke="#AAB99A" strokeWidth="1.5" />
              </svg>
            </span>
          </h1>
          <p className="text-black mt-2">فرص للعطاء في مختلف المجالات الخيرية</p>
        </div>

        {/* Grid of Categories */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 justify-center max-w-8xl mx-auto">
          {categories.map((category) => (
            <div key={category.id} className="bg-white w-full h-72 rounded-lg overflow-hidden shadow-lg transition-transform hover:shadow-xl hover:-translate-y-2">
              <div className="relative h-full">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-white text-2xl font-bold">{category.title}</h3>
                  <p className="text-white text-base">{category.description}</p>
                </div>

                {/* Action Button */}
                <Link to="/ Announcements" className="absolute top-4 right-4 bg-[#AAB99A] hover:bg-[#727D73] text-white w-10 h-10 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </Link>

              </div>
            </div>
          ))}
        </div>
      </div>

    </>
  )
}

export default Categories
