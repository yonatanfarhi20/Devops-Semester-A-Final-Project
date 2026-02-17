import { Briefcase, DollarSign, Phone, Calendar, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
export default function WorkCard({ work, onEdit, onDelete }) {
    // עיצוב תאריך
    const formattedDate = work.workCreationDate
        ? new Date(work.workCreationDate).toLocaleDateString("he-IL")
        : "תאריך לא זמין";

    return (
        <div
            dir="rtl"
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow duration-200 flex flex-col justify-between h-full"
        >
            <div className="mb-4">
                {/* שם המשרה */}
                <Link to={`/work/${work.id}`} className="hover:text-blue-600 transition-colors">
                    {work.name}
                </Link>

                {/* תיאור */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {work.description}
                </p>

                {/* פרטי משרה - כאן נמצא הטלפון */}
                <div className="space-y-3">
                    {/* שכר */}
                    <div className="flex items-center gap-2 text-green-700 font-bold bg-green-50 px-3 py-1 rounded-full w-fit text-sm">
                        <DollarSign size={16} />
                        <span>{work.salary?.toLocaleString()} ₪</span>
                    </div>

                    {/* טלפון - וודא שהשם הוא work.phone */}
                    <div className="flex items-center gap-2 text-gray-700 bg-gray-50 px-3 py-1 rounded-full w-fit text-sm border border-gray-100">
                        <Phone size={16} className="text-blue-500" />
                        <span className="font-medium" dir="ltr">
              {work.phone || "לא הוזן טלפון"}
            </span>
                    </div>

                    {/* תאריך */}
                    <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
                        <Calendar size={14} />
                        <span>פורסם ב: {formattedDate}</span>
                    </div>
                </div>
            </div>

            {/* כפתורי פעולה */}
            <div className="flex gap-3 mt-4 border-t pt-4">
                <button
                    onClick={() => onEdit(work)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                    <Edit size={16} />
                    עריכה
                </button>
                <button
                    onClick={() => onDelete(work.id)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                >
                    <Trash2 size={16} />
                    מחיקה
                </button>
            </div>
        </div>
    );
}