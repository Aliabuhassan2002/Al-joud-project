import { useState } from "react";

export default function ZakahCalculator() {
  const [moneyAmount, setMoneyAmount] = useState(0);
  const [goldAmount, setGoldAmount] = useState(0);
  const [goldPrice, setGoldPrice] = useState(0);
  const [silverAmount, setSilverAmount] = useState(0);
  const [silverPrice, setSilverPrice] = useState(0);
  const [activeTab, setActiveTab] = useState("money");

  // حالة النتائج
  const [results, setResults] = useState({
    totalAssets: 0,
    moneyZakat: 0,
    goldZakat: 0,
    silverZakat: 0,
    totalZakat: 0,
    isEligible: false,
    nisabValue: 0,
  });

  // ثوابت حساب الزكاة
  const ZAKAT_RATE = 0.025; // 2.5%
  const GOLD_NISAB = 85; // 85 جرام من الذهب
  const SILVER_NISAB = 595; // 595 جرام من الفضة

  // تنسيق الأرقام كعملة
  const formatCurrency = (amount) => {
    return amount.toLocaleString("ar-EG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // حساب الزكاة
  const calculateZakat = (e) => {
    e.preventDefault();

    // حساب قيمة الأصول
    const moneyValue = parseFloat(moneyAmount) || 0;
    const goldValue =
      (parseFloat(goldAmount) || 0) * (parseFloat(goldPrice) || 0);
    const silverValue =
      (parseFloat(silverAmount) || 0) * (parseFloat(silverPrice) || 0);

    // إجمالي الأصول
    const totalAssets = moneyValue + goldValue + silverValue;

    // حساب النصاب
    const goldNisabValue = GOLD_NISAB * (parseFloat(goldPrice) || 0);
    const silverNisabValue = SILVER_NISAB * (parseFloat(silverPrice) || 0);

    // اختيار أقل نصاب (غالباً نصاب الفضة)
    const nisabValue = Math.min(goldNisabValue, silverNisabValue);

    // التحقق من بلوغ النصاب
    const isEligible = totalAssets >= nisabValue;

    // حساب الزكاة
    const moneyZakat = isEligible ? moneyValue * ZAKAT_RATE : 0;
    const goldZakat = isEligible ? goldValue * ZAKAT_RATE : 0;
    const silverZakat = isEligible ? silverValue * ZAKAT_RATE : 0;
    const totalZakat = moneyZakat + goldZakat + silverZakat;

    setResults({
      totalAssets,
      moneyZakat,
      goldZakat,
      silverZakat,
      totalZakat,
      isEligible,
      nisabValue,
    });
  };

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-b from-white-50 to-yellow-50 py-10">
        <div className="container mx-auto px-4">
          {/* الترويسة */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-emerald-800 mb-2">
              حاسبة الزكاة الإسلامية
            </h1>
            <p className="text-lg text-emerald-600 mb-6">
              حساب زكاة المال والذهب والفضة بطريقة سهلة وميسرة
            </p>
            <div className="w-24 h-1 bg-emerald-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* قسم أحكام الزكاة */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
                <h2 className="text-2xl font-bold text-emerald-700 mb-6 text-right">
                  أحكام الزكاة
                </h2>

                {/* أزرار التبويب */}
                <div className="flex flex-wrap mb-6 border-b justify-end">
                  <button
                    className={`px-4 py-2 text-lg font-medium border-b-2 transition-colors duration-200 ${
                      activeTab === "silver"
                        ? "border-emerald-500 text-emerald-700"
                        : "border-transparent text-gray-500 hover:text-emerald-700"
                    }`}
                    onClick={() => setActiveTab("silver")}
                  >
                    الفضة
                  </button>
                  <button
                    className={`px-4 py-2 text-lg font-medium border-b-2 transition-colors duration-200 ${
                      activeTab === "gold"
                        ? "border-emerald-500 text-emerald-700"
                        : "border-transparent text-gray-500 hover:text-emerald-700"
                    }`}
                    onClick={() => setActiveTab("gold")}
                  >
                    الذهب
                  </button>

                  <button
                    className={`px-4 py-2 text-lg font-medium border-b-2 transition-colors duration-200 ${
                      activeTab === "money"
                        ? "border-emerald-500 text-emerald-700"
                        : "border-transparent text-gray-500 hover:text-emerald-700"
                    }`}
                    onClick={() => setActiveTab("money")}
                  >
                    المال
                  </button>
                </div>

                {/* محتوى التبويبات */}
                <div className="space-y-4">
                  {activeTab === "money" && (
                    <div>
                      <h3 className="text-xl font-semibold text-emerald-700 mb-3 text-right">
                        زكاة المال
                      </h3>
                      <div className="bg-emerald-50 p-4 rounded-lg mb-4">
                        <p className="text-emerald-800 mb-2 text-right">
                          <strong>النصاب:</strong> يعادل قيمة 85 جرام من الذهب
                          أو 595 جرام من الفضة (أيهما أقل).
                        </p>
                        <p className="text-emerald-800 mb-2 text-right">
                          <strong>المقدار:</strong> 2.5% من المال الذي بلغ
                          نصابًا وحال عليه الحول (السنة الهجرية).
                        </p>
                      </div>
                      <p className="text-gray-700 text-right">
                        تجب الزكاة في المال النقدي سواء كان ورقيًا أو في حسابات
                        مصرفية أو مدخرات، بشرط أن يبلغ النصاب وأن يمر عليه حول
                        كامل.
                      </p>
                    </div>
                  )}

                  {activeTab === "gold" && (
                    <div>
                      <h3 className="text-xl font-semibold text-yellow-700 mb-3 text-right">
                        زكاة الذهب
                      </h3>
                      <div className="bg-yellow-50 p-4 rounded-lg mb-4">
                        <p className="text-yellow-800 mb-2 text-right">
                          <strong>النصاب:</strong> 85 جرام من الذهب الخالص (24
                          قيراط).
                        </p>
                        <p className="text-yellow-800 mb-2 text-right">
                          <strong>المقدار:</strong> 2.5% من قيمة الذهب إذا بلغ
                          النصاب وحال عليه الحول.
                        </p>
                      </div>
                      <p className="text-gray-700 text-right">
                        تشمل زكاة الذهب جميع أنواع الذهب سواء كان للاستعمال أو
                        الادخار أو التجارة، مثل السبائك والحلي والمجوهرات، وتحسب
                        قيمتها حسب وزن الذهب الخالص.
                      </p>
                    </div>
                  )}

                  {activeTab === "silver" && (
                    <div>
                      <h3 className="text-xl font-semibold text-gray-700 mb-3 text-right">
                        زكاة الفضة
                      </h3>
                      <div className="bg-gray-50 p-4 rounded-lg mb-4">
                        <p className="text-gray-800 mb-2 text-right">
                          <strong>النصاب:</strong> 595 جرام من الفضة.
                        </p>
                        <p className="text-gray-800 mb-2 text-right">
                          <strong>المقدار:</strong> 2.5% من قيمة الفضة إذا بلغت
                          النصاب وحال عليها الحول.
                        </p>
                      </div>
                      <p className="text-gray-700 text-right">
                        تشمل زكاة الفضة جميع أنواع الفضة سواء كانت للاستعمال أو
                        الادخار أو التجارة، مثل السبائك والحلي والمجوهرات، وتحسب
                        قيمتها حسب وزن الفضة الخالصة.
                      </p>
                    </div>
                  )}
                </div>

                {/* معلومات إضافية */}
                <div className="mt-8 pt-4 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-emerald-700 mb-3 text-right">
                    معلومات مهمة
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 text-right">
                    <li>
                      الزكاة واجبة إذا بلغ المال النصاب وحال عليه الحول (سنة
                      هجرية كاملة).
                    </li>
                    <li>
                      يتم اختيار النصاب الأقل قيمة (عادة ما يكون نصاب الفضة) عند
                      حساب الزكاة.
                    </li>
                    <li>نسبة الزكاة هي 2.5% من إجمالي المال المستحق للزكاة.</li>
                    <li>
                      يتم جمع جميع الأموال والذهب والفضة معًا للتحقق من بلوغ
                      النصاب.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* قسم إدخال البيانات والنتائج */}
            <div className="lg:col-span-2">
              {/* نموذج إدخال البيانات */}
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <h2 className="text-2xl font-bold text-emerald-700 mb-6 text-right">
                  إدخال البيانات
                </h2>

                <form onSubmit={calculateZakat}>
                  {/* زكاة المال */}
                  <div className="mb-8 p-4 bg-emerald-50 rounded-lg">
                    <h3 className="text-xl font-semibold text-emerald-700 mb-4 text-right">
                      زكاة المال
                    </h3>
                    <div className="mb-4">
                      <label
                        htmlFor="moneyAmount"
                        className="block text-emerald-800 mb-2 text-right"
                      >
                        المبلغ المالي (بالدينار الاردني)
                      </label>
                      <input
                        type="number"
                        id="moneyAmount"
                        value={moneyAmount}
                        onChange={(e) => setMoneyAmount(e.target.value)}
                        placeholder="أدخل المبلغ المالي"
                        className="w-full p-3 border border-emerald-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  {/* زكاة الذهب */}
                  <div className="mb-8 p-4 bg-yellow-50 rounded-lg">
                    <h3 className="text-xl font-semibold text-yellow-600 mb-4 text-right">
                      زكاة الذهب
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="goldAmount"
                          className="block text-yellow-700 mb-2 text-right"
                        >
                          كمية الذهب (بالجرام)
                        </label>
                        <input
                          type="number"
                          id="goldAmount"
                          value={goldAmount}
                          onChange={(e) => setGoldAmount(e.target.value)}
                          min="0"
                          placeholder="أدخل كمية الذهب"
                          className="w-full p-3 border border-yellow-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="goldPrice"
                          className="block text-yellow-700 mb-2 text-right"
                        >
                          سعر جرام الذهب (الدينار الاردني)
                        </label>
                        <input
                          type="number"
                          id="goldPrice"
                          value={goldPrice}
                          onChange={(e) => setGoldPrice(e.target.value)}
                          min="0"
                          placeholder="أدخل سعر جرام الذهب"
                          className="w-full p-3 border border-yellow-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* زكاة الفضة */}
                  <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-600 mb-4 text-right">
                      زكاة الفضة
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="silverAmount"
                          className="block text-gray-700 mb-2 text-right"
                        >
                          كمية الفضة (بالجرام)
                        </label>
                        <input
                          type="number"
                          id="silverAmount"
                          value={silverAmount}
                          onChange={(e) => setSilverAmount(e.target.value)}
                          min="0"
                          placeholder="أدخل كمية الفضة"
                          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="silverPrice"
                          className="block text-gray-700 mb-2 text-right"
                        >
                          سعر جرام الفضة (الدينار الاردني)
                        </label>
                        <input
                          type="number"
                          id="silverPrice"
                          value={silverPrice}
                          onChange={(e) => setSilverPrice(e.target.value)}
                          min="0"
                          placeholder="أدخل سعر جرام الفضة"
                          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* زر الحساب */}
                  <div className="text-center">
                    <button
                      type="submit"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
                    >
                      حساب الزكاة
                    </button>
                  </div>
                </form>
              </div>

              {/* عرض النتائج */}
              <div
                className={`bg-white rounded-lg shadow-lg p-6 mb-8 ${
                  results.totalZakat > 0 ? "border-2 border-emerald-500" : ""
                }`}
              >
                <h2 className="text-2xl font-bold text-emerald-700 mb-6 text-right">
                  نتائج حساب الزكاة
                </h2>

                {results.totalZakat > 0 ? (
                  <div className="space-y-4">
                    {/* إجمالي الأصول والنصاب */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-emerald-50 p-4 rounded-lg text-right">
                        <h3 className="text-lg font-semibold text-emerald-700 mb-2">
                          إجمالي الأصول:
                        </h3>
                        <p className="text-2xl font-bold text-emerald-800">
                          {formatCurrency(results.totalAssets)}
                        </p>
                      </div>
                      <div className="bg-emerald-50 p-4 rounded-lg text-right">
                        <h3 className="text-lg font-semibold text-emerald-700 mb-2">
                          قيمة النصاب:
                        </h3>
                        <p className="text-2xl font-bold text-emerald-800">
                          {formatCurrency(results.nisabValue)}
                        </p>
                      </div>
                    </div>

                    {/* نتائج الزكاة حسب النوع */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 justify-end">
                      {results.moneyZakat > 0 && (
                        <div className="bg-emerald-50 p-4 rounded-lg text-right">
                          <h3 className="text-md font-semibold text-emerald-700 mb-2">
                            زكاة المال:
                          </h3>
                          <p className="text-xl font-bold text-emerald-800">
                            {formatCurrency(results.moneyZakat)}
                          </p>
                        </div>
                      )}
                      {results.goldZakat > 0 && (
                        <div className="bg-yellow-50 p-4 rounded-lg text-right">
                          <h3 className="text-md font-semibold text-yellow-700 mb-2">
                            زكاة الذهب:
                          </h3>
                          <p className="text-xl font-bold text-yellow-800">
                            {formatCurrency(results.goldZakat)}
                          </p>
                        </div>
                      )}
                      {results.silverZakat > 0 && (
                        <div className="bg-gray-50 p-4 rounded-lg text-right">
                          <h3 className="text-md font-semibold text-gray-700 mb-2">
                            زكاة الفضة:
                          </h3>
                          <p className="text-xl font-bold text-gray-800">
                            {formatCurrency(results.silverZakat)}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* إجمالي الزكاة */}
                    <div className="bg-emerald-600 text-white p-6 rounded-lg text-center">
                      <h3 className="text-xl font-semibold mb-2">
                        إجمالي الزكاة المستحقة:
                      </h3>
                      <p className="text-3xl font-bold">
                        {formatCurrency(results.totalZakat)}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    {results.isEligible === false && results.totalAssets > 0 ? (
                      <div className="bg-yellow-50 p-6 rounded-lg">
                        <p className="text-lg text-yellow-800 mb-2 text-right">
                          لم تبلغ أموالك النصاب المطلوب لوجوب الزكاة
                        </p>
                        <p className="text-md text-yellow-700 text-right">
                          قيمة أموالك: {formatCurrency(results.totalAssets)}
                          <br />
                          قيمة النصاب: {formatCurrency(results.nisabValue || 0)}
                        </p>
                      </div>
                    ) : (
                      <p className="text-lg text-gray-500 text-right">
                        قم بإدخال بياناتك واضغط على زر "حساب الزكاة" لمعرفة
                        الزكاة المستحقة عليك
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
