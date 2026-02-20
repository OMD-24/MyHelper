// components/CategoryOverlay.jsx
import { HiOutlineShieldCheck, HiOutlineListBullet } from "react-icons/hi2";

export default function CategoryOverlay({ category, onContinue }) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-2xl border border-primary-100 animate-slide-up">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-4xl">{category.icon}</span>
        <div>
          <h2 className="text-xl font-bold text-gray-900">{category.label} Guide</h2>
          <p className="text-xs text-gray-500 italic">Follow these to get the best results in Sangli</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Specific Types */}
        <div>
          <h3 className="text-sm font-bold text-primary-700 mb-2 flex items-center gap-2">
            <HiOutlineListBullet /> Types of Work
          </h3>
          <div className="flex flex-wrap gap-2">
            {category.types.map(t => (
              <span key={t} className="bg-gray-50 text-gray-600 px-3 py-1 rounded-lg text-xs border border-gray-100">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* The 9-Point Checklist Summary */}
        <div className="bg-primary-50 rounded-2xl p-4 border border-primary-100">
          <h3 className="text-sm font-bold text-primary-900 mb-2 flex items-center gap-2">
            <HiOutlineShieldCheck /> Hiring Checklist
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4">
            {category.checklist.map((item, index) => (
              <li key={index} className="text-xs text-primary-800 flex items-start gap-2">
                <span className="text-primary-500 font-bold">{index + 1}.</span> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button
        onClick={onContinue}
        className="w-full mt-6 py-3.5 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition"
      >
        I understand, Post Task
      </button>
    </div>
  );
}