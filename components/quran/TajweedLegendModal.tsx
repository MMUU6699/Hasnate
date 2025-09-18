import React from 'react';

interface TajweedLegendModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const legendItems = [
    { rule: 'غنّة', color: 'bg-[#FF7E1E]', description: 'صوت يخرج من الأنف عند نطق النون والميم المشددتين.' },
    { rule: 'إدغام بغنة', color: 'bg-[#169777]', description: 'إدماج النون الساكنة أو التنوين في الحرف التالي مع غنة.' },
    { rule: 'إدغام بدون غنة', color: 'bg-[#169777]', description: 'إدماج النون الساكنة أو التنوين في (ل) أو (ر) بدون غنة.' },
    { rule: 'إقلاب', color: 'bg-[#26BFFD]', description: 'قلب النون الساكنة أو التنوين ميماً قبل حرف الباء.' },
    { rule: 'إخفاء', color: 'bg-[#9400A8]', description: 'نطق النون الساكنة أو التنوين بحالة بين الإظهار والإدغام.' },
    { rule: 'إخفاء شفوي', color: 'bg-[#D500B7]', description: 'إخفاء الميم الساكنة إذا جاء بعدها حرف الباء.' },
    { rule: 'إدغام شفوي', color: 'bg-[#58B800]', description: 'إدماج الميم الساكنة في الميم التي تليها مع غنة.' },
    { rule: 'قلقلة', color: 'bg-[#DD0008]', description: 'اهتزاز صوت الحرف الساكن عند النطق به (ق، ط، ب، ج، د).' },
    { rule: 'مد لازم', color: 'bg-[#000EBC]', description: 'مد ست حركات لوجود سكون أصلي بعد حرف المد.' },
    { rule: 'مد واجب', color: 'bg-[#FF0000]', description: 'مد 4-5 حركات لوجود همزة بعد حرف المد في نفس الكلمة.' },
    { rule: 'مد جائز', color: 'bg-[#4050FF]', description: 'مد 2-5 حركات لوجود همزة بعد حرف المد في كلمة أخرى.' },
    { rule: 'مد طبيعي', color: 'bg-[#537FFF]', description: 'مد حركتين (الألف، الواو، الياء).' },
    { rule: 'همزة وصل / لام شمسية', color: 'bg-[#AAAAAA]', description: 'حروف تُكتب ولا تُنطق لوصل الكلام.' },
];


const TajweedLegendModal: React.FC<TajweedLegendModalProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300
        ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
      ></div>

      {/* Modal */}
      <div
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-2xl transform transition-all duration-300 ease-in-out z-50 flex flex-col
        ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}
        dir="rtl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="legend-heading"
      >
        <div className="p-4 flex justify-between items-center border-b dark:border-gray-700 bg-teal-50 dark:bg-gray-900/50">
          <h3 id="legend-heading" className="text-xl font-bold text-teal-800 dark:text-teal-400">
            مفتاح ألوان التجويد
          </h3>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" aria-label="إغلاق">
            <i className="ph-fill ph-x text-2xl text-gray-600 dark:text-gray-300"></i>
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[70vh]">
            <ul className="space-y-4">
                {legendItems.map(item => (
                    <li key={item.rule} className="flex items-start">
                        <div className={`w-6 h-6 rounded-md ${item.color} ml-4 mt-1 flex-shrink-0`}></div>
                        <div>
                            <p className="font-bold text-gray-800 dark:text-gray-200">{item.rule}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
      </div>
    </>
  );
};

export default TajweedLegendModal;