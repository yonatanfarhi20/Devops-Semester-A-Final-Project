import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { WorkService } from "../api/workService";
import { ArrowRight, Phone, DollarSign, Calendar, Briefcase, FileText } from "lucide-react";
import toast from "react-hot-toast";

export default function JobDetails() {
    const { id } = useParams(); // שואב את ה-ID מהכתובת
    const navigate = useNavigate();
    const [work, setWork] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWork = async () => {
            try {
                const data = await WorkService.getWorkById(id);
                setWork(data);
            } catch (error) {
                toast.error("לא הצלחנו למצוא את המשרה המבוקשת");
                navigate("/"); // מחזיר לדף הבית אם המשרה לא קיימת
            } finally {
                setLoading(false);
            }
        };
        fetchWork();
    }, [id, navigate]);

    if (loading) return <div className="min-h-screen flex items-center justify-center">טוען פרטי משרה...</div>;
    if (!work) return null;

    const formattedDate = work.workCreationDate
        ? new Date(work.workCreationDate).toLocaleDateString("he-IL")
        : "לא זמין";

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4" dir="rtl">
            <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">

                {/* Header של הדף */}
                <div className="bg-blue-600 p-8 text-white relative">
                    <Link to="/" className="absolute top-6 right-6 hover:bg-blue-700 p-2 rounded-full transition-colors">
                        <ArrowRight size={24} />
                    </Link>
                    <div className="mt-8">
                        <h1 className="text-4xl font-bold mb-4">{work.name}</h1>
                        <div className="flex flex-wrap gap-4">
               <span className="bg-blue-500 bg-opacity-30 px-4 py-1 rounded-full flex items-center gap-2">
                 <DollarSign size={18} /> {work.salary?.toLocaleString()} ₪
               </span>
                            <span className="bg-blue-500 bg-opacity-30 px-4 py-1 rounded-full flex items-center gap-2">
                 <Calendar size={18} /> פורסם ב: {formattedDate}
               </span>
                        </div>
                    </div>
                </div>

                {/* תוכן המשרה */}
                <div className="p-8 space-y-8">
                    <section>
                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2">
                            <FileText className="text-blue-600" /> תיאור התפקיד
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-wrap">
                            {work.description}
                        </p>
                    </section>

                    <section className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">פרטי התקשרות</h3>
                        <div className="flex items-center gap-4">
                            <div className="bg-blue-600 p-3 rounded-xl text-white">
                                <Phone size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">טלפון להגשת מועמדות:</p>
                                <p className="text-xl font-bold text-blue-600" dir="ltr">{work.phone}</p>
                            </div>
                            <a
                                href={`tel:${work.phone}`}
                                className="mr-auto bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl font-bold transition-transform hover:scale-105"
                            >
                                חייג עכשיו
                            </a>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}