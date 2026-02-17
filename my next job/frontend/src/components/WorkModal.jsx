import { useState, useEffect } from "react";
import { X, Save, Briefcase, DollarSign, Phone, FileText, Edit } from "lucide-react"; // הוספנו את Edit כאן

export default function WorkModal({ isOpen, onClose, onSave, workToEdit }) {
    // אם המודל סגור, אל תציג כלום
    if (!isOpen) return null;

    // הנתונים של הטופס
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        salary: "",
        phone: "",
    });

    // כשהמודל נפתח: אם זו עריכה, מלא את הטופס. אם זה חדש, אפס אותו.
    useEffect(() => {
        if (workToEdit) {
            setFormData({
                name: workToEdit.name,
                description: workToEdit.description,
                salary: workToEdit.salary,
                phone: workToEdit.phone,
            });
        } else {
            setFormData({
                name: "",
                description: "",
                salary: "",
                phone: "",
            });
        }
    }, [workToEdit, isOpen]);

    // עדכון השדות בטופס
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // שליחת הטופס
    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData); // קריאה לפונקציה בדף הבית ששומרת
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" dir="rtl">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-300">

                {/* כותרת החלון */}
                <div className="bg-blue-600 p-6 flex justify-between items-center text-white">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        {workToEdit ? <Edit size={24} /> : <Briefcase size={24} />}
                        {workToEdit ? "עריכת משרה" : "פרסום משרה חדשה"}
                    </h2>
                    <button onClick={onClose} className="hover:bg-blue-700 p-2 rounded-full transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* גוף הטופס */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">

                    {/* שם המשרה */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">שם המשרה</label>
                        <div className="relative">
                            <Briefcase size={18} className="absolute top-3 right-3 text-gray-400" />
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full pl-4 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                placeholder="לדוגמה: מפתח Full Stack"
                            />
                        </div>
                    </div>

                    {/* שכר */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">שכר חודשי</label>
                        <div className="relative">
                            <DollarSign size={18} className="absolute top-3 right-3 text-gray-400" />
                            <input
                                type="number"
                                name="salary"
                                value={formData.salary}
                                onChange={handleChange}
                                required
                                min="0"
                                className="w-full pl-4 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                placeholder="לדוגמה: 20000"
                            />
                        </div>
                    </div>

                    {/* טלפון */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">טלפון ליצירת קשר</label>
                        <div className="relative">
                            <Phone size={18} className="absolute top-3 right-3 text-gray-400" />
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="w-full pl-4 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                placeholder="050-0000000"
                                dir="ltr"
                            />
                        </div>
                    </div>

                    {/* תיאור */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">תיאור המשרה</label>
                        <div className="relative">
                            <FileText size={18} className="absolute top-3 right-3 text-gray-400" />
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                rows="4"
                                className="w-full pl-4 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                                placeholder="פרט על דרישות התפקיד, המיקום והאווירה..."
                            ></textarea>
                        </div>
                    </div>

                    {/* כפתורי שמירה וביטול */}
                    <div className="flex gap-3 pt-4 border-t mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition-colors"
                        >
                            ביטול
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-lg shadow-blue-200 flex items-center justify-center gap-2 transition-all"
                        >
                            <Save size={18} />
                            {workToEdit ? "שמור שינויים" : "פרסם עכשיו"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}