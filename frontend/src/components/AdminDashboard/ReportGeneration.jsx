import React, { useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

// Replace this with your actual signature image in base64 format (without the data:image/png;base64, prefix if needed)
const signatureBase64 = "YOUR_SIGNATURE_IMAGE_BASE64";

const ReportGeneration = () => {
  const [reports, setReports] = useState([]); // Donations list
  const [summary, setSummary] = useState(null); // Statistics summary
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    donorId: "",
    beneficiaryId: "",
  });

  // Fetch report data from API
  const handleGenerateReport = async () => {
    try {
      setLoading(true);
      const { startDate, endDate, donorId, beneficiaryId } = filters;
      const response = await axios.get("http://localhost:5000/api/admin/reports", {
        params: { startDate, endDate, donorId, beneficiaryId },
      });
      const { donations, summary } = response.data;
      setReports(donations || []);
      setSummary(summary || null);
    } catch (error) {
      console.error("Error generating report:", error);
      alert("An error occurred while fetching data. Please check the console for details.");
    } finally {
      setLoading(false);
    }
  };

  // Format currency values
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  // Export report as CSV with English headers
  const handleExportCSV = () => {
    if (!reports.length) {
      alert("No data to export. Please generate the report first.");
      return;
    }
    let csvContent = "data:text/csv;charset=utf-8,\uFEFF";
    const summaryHeaders = [
      "Record Count",
      "Total Amount",
      "Average Donation",
      "Completed",
      "Pending",
      "Failed",
    ];
    const safeSummary = summary || {
      totalCount: "0",
      totalAmount: "0",
      averageAmount: "0",
      completedCount: "0",
      pendingCount: "0",
      failedCount: "0",
    };
    const summaryRow = [
      safeSummary.totalCount,
      safeSummary.totalAmount,
      safeSummary.averageAmount,
      safeSummary.completedCount,
      safeSummary.pendingCount,
      safeSummary.failedCount,
    ];
    csvContent += "Summary\n";
    csvContent += summaryHeaders.join(",") + "\n";
    csvContent += summaryRow.join(",") + "\n\n";

    const tableHeaders = ["Amount", "Payment Method", "Payment Status", "Payment Date"];
    csvContent += "Donation Details\n";
    csvContent += tableHeaders.join(",") + "\n";
    reports.forEach((r) => {
      const formattedAmount = formatCurrency(r.amount);
      const dateStr = new Date(r.payment_date).toLocaleDateString("en-GB");
      csvContent += [formattedAmount, r.payment_method, r.payment_status, dateStr].join(",") + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.href = encodedUri;
    link.download = "Donation_Report.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export report as PDF with an official header, footer, and signature image
  const handleDownloadPDF = () => {
    if (!reports.length) {
      alert("No data to export. Please generate the report first.");
      return;
    }
    const doc = new jsPDF();

    // Set default font for English text
    doc.setFont("helvetica");

    // Get page dimensions
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Header function for an official look
    const header = () => {
      doc.setFontSize(16);
      doc.text("Government of Jordan", pageWidth / 2, 15, { align: "center" });
      doc.setFontSize(12);
      doc.text("Tax / Donation Report", pageWidth / 2, 23, { align: "center" });
      doc.setLineWidth(0.5);
      doc.line(10, 27, pageWidth - 10, 27);
    };

    // Footer function for page numbering
    const footer = () => {
      const pageCount = doc.internal.getNumberOfPages();
      doc.setFontSize(10);
      doc.text(`Page ${pageCount}`, pageWidth / 2, pageHeight - 10, { align: "center" });
    };

    // Draw header for the first page
    header();

    // Prepare summary table data
    const summaryHeaders = [
      "Record Count",
      "Total Amount",
      "Average Donation",
      "Completed",
      "Pending",
      "Failed",
    ];
    const safeSummary = summary || {
      totalCount: "0",
      totalAmount: "0",
      averageAmount: "0",
      completedCount: "0",
      pendingCount: "0",
      failedCount: "0",
    };
    const summaryRow = [
      safeSummary.totalCount,
      safeSummary.totalAmount,
      safeSummary.averageAmount,
      safeSummary.completedCount,
      safeSummary.pendingCount,
      safeSummary.failedCount,
    ];

    autoTable(doc, {
      head: [summaryHeaders],
      body: [summaryRow],
      startY: 35,
      theme: "grid",
      styles: { font: "helvetica", fontSize: 10 },
      didDrawPage: function () {
        header();
        footer();
      },
    });

    // Prepare donation details table data
    const tableHeaders = ["Amount", "Payment Method", "Payment Status", "Payment Date"];
    const tableRows = reports.map((r) => [
      formatCurrency(r.amount),
      r.payment_method,
      r.payment_status === "Completed"
        ? "Completed"
        : r.payment_status === "Pending"
        ? "Pending"
        : "Failed",
      new Date(r.payment_date).toLocaleDateString("en-GB"),
    ]);

    const startY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 50;
    autoTable(doc, {
      head: [tableHeaders],
      body: tableRows,
      startY: startY,
      theme: "grid",
      styles: { font: "helvetica", fontSize: 10 },
      didDrawPage: function () {
        header();
        footer();
      },
    });

    // Add a signature image to simulate an official signature
    // Adjust the x, y, width, and height as needed
    const signatureX = 14;
    const signatureY = pageHeight - 60;
    const signatureWidth = 50;
    const signatureHeight = 20;
    if (signatureBase64 && signatureBase64 !== "YOUR_SIGNATURE_IMAGE_BASE64") {
      doc.addImage(signatureBase64, "PNG", signatureX, signatureY, signatureWidth, signatureHeight);
    } else {
      // Fallback: Draw a line if signature image is not provided
      doc.setLineWidth(0.5);
      doc.line(signatureX, signatureY + signatureHeight / 2, signatureX + signatureWidth, signatureY + signatureHeight / 2);
    }

    // Label for the signature area
    doc.setFontSize(10);
    doc.text("Authorized Signature", signatureX, signatureY - 2);

    doc.save("Government_Tax_Report.pdf");
  };

  return (
    <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-lg" dir="rtl">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">تقارير التبرعات</h2>

      {/* Filters */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">خيارات التصفية</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">تاريخ البداية</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.startDate}
              onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">تاريخ النهاية</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.endDate}
              onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">الرقم المرجعي للمتبرع</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="اكتب معرف المتبرع"
              value={filters.donorId}
              onChange={(e) => setFilters({ ...filters, donorId: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">الرقم المرجعي للمستفيد</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="اكتب معرف المستفيد"
              value={filters.beneficiaryId}
              onChange={(e) => setFilters({ ...filters, beneficiaryId: e.target.value })}
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleGenerateReport}
            disabled={loading}
            className="bg-[#AAB99A] text-white px-6 py-2 rounded-md font-medium hover:bg-[#727D73] focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50 flex items-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                جاري المعالجة...
              </>
            ) : (
              "توليد التقرير"
            )}
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm border-r-4 border-blue-500">
            <p className="text-sm text-gray-500">عدد السجلات</p>
            <p className="text-2xl font-bold">{summary.totalCount}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border-r-4 border-green-500">
            <p className="text-sm text-gray-500">إجمالي المبالغ</p>
            <p className="text-2xl font-bold">${summary.totalAmount}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border-r-4 border-yellow-500">
            <p className="text-sm text-gray-500">متوسط التبرع</p>
            <p className="text-2xl font-bold">${summary.averageAmount}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border-r-4 border-purple-500">
            <p className="text-sm text-gray-500">مكتملة</p>
            <p className="text-2xl font-bold">{summary.completedCount}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border-r-4 border-yellow-500">
            <p className="text-sm text-gray-500">قيد الانتظار</p>
            <p className="text-2xl font-bold">{summary.pendingCount}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border-r-4 border-red-500">
            <p className="text-sm text-gray-500">فشلت</p>
            <p className="text-2xl font-bold">{summary.failedCount}</p>
          </div>
        </div>
      )}

      {/* Report Results */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-800">نتائج التقرير</h3>
          <div className="space-x-2 flex">
            <button
              onClick={handleExportCSV}
              className="bg-[#727D73] text-white px-4 py-2 rounded-md hover:bg-[#F0F0D7] hover:text-black"
            >
              تصدير CSV
            </button>
            <button
              onClick={handleDownloadPDF}
              className="bg-[#727D73] text-white px-4 py-2 rounded-md hover:bg-[#F0F0D7] hover:text-black"
            >
              تحميل PDF
            </button>
          </div>
        </div>
        {reports.length === 0 ? (
          <div className="bg-gray-50 p-8 text-center rounded-lg border border-gray-200">
            <p className="text-gray-500">لا توجد بيانات حالياً. قم بتوليد التقرير لاستخراج البيانات.</p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المبلغ</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">طريقة الدفع</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">حالة الدفع</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">تاريخ الدفع</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reports.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(r.amount)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{r.payment_method}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          r.payment_status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : r.payment_status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {r.payment_status === "Completed"
                          ? "مكتملة"
                          : r.payment_status === "Pending"
                          ? "قيد الانتظار"
                          : "فشلت"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{new Date(r.payment_date).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
              <p className="text-sm text-gray-500">{reports.length} سجل من التبرعات</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportGeneration;
