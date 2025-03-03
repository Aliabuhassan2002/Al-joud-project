import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loadedImages, setLoadedImages] = useState({});

  const slides = [
    {
      image: "https://i.pinimg.com/736x/ca/da/db/cadadb25f9f16b5fe4304b0494e3ea22.jpg",
      title: "عون السجناء",
      subtitle: "حرية تبدأ من عطائك"
    },

    {
      image: "https://i.pinimg.com/736x/64/d3/f8/64d3f8e028de02e05a5ef553223753e2.jpg",
      title: "سداد الدين",
      subtitle: "فرج هم المدينين، وكن سببًا في سعادتهم"
    },

    {
      image: "https://ehsanbaner.s3.me-south-1.amazonaws.com/CAMPAIGN2web+copy.png",
      title: "بناء المستقبل",
      subtitle: "نضيء الدرب لمن فقد الأمل"
    },

    {
      image: "https://i.pinimg.com/736x/0f/af/91/0faf91e1e24b142622131198561ab21d.jpg",
      title: "صدقة تفريج الهموم",
      subtitle: "أثر يبقى في حياة المستضعفين"
    },

    {
      image: "https://i.pinimg.com/736x/d6/80/49/d68049a8fbbe4da6311950869421ea31.jpg",
      title: "معًا للعطاء",
      subtitle: "يدًا بيد، نصنع الفرق"
    }
  ];

  useEffect(() => {
    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
      img.onload = () => {
        setLoadedImages((prev) => ({ ...prev, [slide.image]: true }));
      };
    });
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <div
    className="relative w-full h-160 flex items-center justify-center overflow-hidden bg-cover bg-center transition-opacity duration-700"
    style={{
      backgroundImage: loadedImages[slides[currentSlide].image]
        ? `url(${slides[currentSlide].image})`
        : "none",
    }}
  >
    <div className="absolute inset-0 bg-black/40"></div>

    {/* Slider content */}
    <div className="relative w-full max-w-6xl px-8 flex items-center justify-end">
      {/* Text content */}
      <div className="w-1/2 text-white text-right ml-auto pr-12">
        <h2 className="text-5xl font-bold mb-2 tracking-wide">{slides[currentSlide].title}</h2>
        <p className="text-2xl font-light">{slides[currentSlide].subtitle}</p>
        <button className="mt-8 bg-navy-800 text-white px-6 py-2 rounded-md bg-[#AAB99A] hover: transform hover:scale-105 transition duration-300">
        تبرَّع الآن
        </button>
      </div>
    </div>

    {/* Navigation buttons */}
    <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
      <button onClick={prevSlide} className="w-12 h-12 border border-white flex items-center justify-center text-white rounded-md">
        <ChevronLeft size={24} />
      </button>
      <div className="flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-8 h-2 rounded-full transition-all ${index === currentSlide ? "bg-white" : "bg-white/30"}`}
          ></button>
        ))}
      </div>
      <button onClick={nextSlide} className="w-12 h-12 border border-white flex items-center justify-center text-white rounded-md">
        <ChevronRight size={24} />
      </button>
    </div>
  </div>
  );
}

export default Home;




