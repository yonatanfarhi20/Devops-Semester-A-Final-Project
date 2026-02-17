import { useEffect, useState } from "react";
import { WorkService } from "../api/workService";
import WorkCard from "../components/WorkCard";
import WorkModal from "../components/WorkModal";
import { Search, Plus, Briefcase, Filter, DollarSign, TrendingUp, Calendar } from "lucide-react";import {Link} from "react-router-dom";
import toast from 'react-hot-toast';

export default function HomePage() {
    const [works, setWorks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    // State לסינון שכר
    const [minSalary, setMinSalary] = useState("");
    const [maxSalary, setMaxSalary] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingWork, setEditingWork] = useState(null);

    useEffect(() => {
        loadWorks();
    }, []);

    const loadWorks = async () => {
        try {
            setLoading(true);
            const data = await WorkService.getAllWorks();
            setWorks(data);
        } catch (error) {
            console.error("שגיאה בטעינת המשרות:", error);
        } finally {
            setLoading(false);
        }
    };

    // useEffect שמאזין לשינויים ב-searchTerm
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchTerm.trim()) {
                handleSearch();
            } else {
                loadWorks(); // אם התיבה ריקה, טען את כל המשרות
            }
        }, 300); // מחכה 300 מילישניות של שקט בהקלדה לפני השליחה

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

// פונקציית החיפוש המעודכנת (כבר לא צריכה לקבל Event של Form)
    const handleSearch = async () => {
        try {
            setLoading(true);
            const data = await WorkService.searchWorks(searchTerm);
            setWorks(data);
        } catch (error) {
            console.error("שגיאה בחיפוש:", error);
        } finally {
            setLoading(false);
        }
    };

    // פונקציית סינון שכר חדשה
    const handleSalaryFilter = async (e) => {
        e.preventDefault();
        // אם השדות ריקים, נטען הכל
        if (!minSalary && !maxSalary) return loadWorks();

        try {
            setLoading(true);
            // שלח 0 אם המינימום ריק, וערך גבוה מאוד אם המקסימום ריק
            const min = minSalary || 0;
            const max = maxSalary || 1000000;
            const data = await WorkService.filterBySalary(min, max);
            setWorks(data);
        } catch (error) {
            console.error("שגיאה בסינון שכר:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("האם אתה בטוח שברצונך למחוק משרה זו?")) {
            try {
                await WorkService.deleteWork(id);
                setWorks(works.filter(work => work.id !== id));
                toast.success("המשרה נמחקה מהמערכת");
            } catch (error) {
                toast.error("לא ניתן למחוק את המשרה");
            }
        }
    };

    const openCreateModal = () => {
        setEditingWork(null);
        setIsModalOpen(true);
    };

    const openEditModal = (work) => {
        setEditingWork(work);
        setIsModalOpen(true);
    };

    const handleSave = async (formData) => {
        try {
            if (editingWork) {
                await WorkService.updateWork(editingWork.id, formData);
                toast.success("המשרה עודכנה בהצלחה!");
            } else {
                await WorkService.createWork(formData);
                toast.success("המשרה פורסמה בהצלחה! 🚀");
            }
            setIsModalOpen(false);
            loadWorks();
        } catch (error) {
            toast.error("שגיאה בשמירת המשרה");
            console.error(error);
        }
    };

    const filterByTime = (period) => {
        const now = new Date();

        // אם המשתמש רוצה הכל, פשוט נטען מחדש מהשרת (או מה-State המקורי)
        if (period === 'all') {
            loadWorks();
            return;
        }

        const filtered = works.filter(work => {
            if (!work.workCreationDate) return false;
            const creationDate = new Date(work.workCreationDate);
            const diffInTime = now.getTime() - creationDate.getTime();
            const diffInDays = diffInTime / (1000 * 3600 * 24);

            if (period === 'today') return diffInDays <= 1;
            if (period === 'week') return diffInDays <= 7;
            return true;
        });

        setWorks(filtered);
    };



    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800" dir="rtl">
            {/* Header */}
            <header className="bg-white shadow-sm border-b sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="bg-blue-600 p-2 rounded-lg text-white">
                            <Briefcase size={24} />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">JobFinder</h1>
                    </div>
                    <button onClick={openCreateModal} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-medium flex items-center gap-2 transition-all">
                        <Plus size={20} />
                        פרסם משרה
                    </button>
                    <Link
                        to="/dashboard"
                        className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium transition-colors"
                    >
                        <TrendingUp size={20} />
                        סטטיסטיקות
                    </Link>
                </div>
            </header>

            {/* Hero & Search */}
            <div className="bg-gradient-to-b from-blue-600 to-blue-500 py-12 px-4 text-center text-white">
                <h2 className="text-3xl font-bold mb-4">מצא את העבודה הבאה שלך</h2>
                <div className="max-w-2xl mx-auto bg-white p-2 rounded-full shadow-lg flex gap-2">
                    <div className="flex-1 flex items-center px-4">
                        <Search className="text-gray-400 ml-2" />
                        <input
                            type="text"
                            placeholder="חפש לפי שם, תיאור או טלפון..."
                            className="w-full outline-none text-gray-700"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} // העדכון כאן מפעיל את ה-useEffect
                        />
                    </div>
                    {/* הכפתור עכשיו הוא רק ליופי או לביצוע חיפוש מיידי */}
                    <button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-bold transition-colors">
                        חפש
                    </button>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">
                {/* --- Sidebar (סינון שכר) --- */}
                <aside className="w-full md:w-64 space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-2 mb-6 text-gray-800 font-bold border-b pb-2">
                            <Filter size={20} className="text-blue-600" />
                            <h4>סינון תוצאות</h4>
                        </div>

                        <form onSubmit={handleSalaryFilter} className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-600 mb-1 block italic">טווח שכר (₪)</label>
                                <div className="space-y-2">
                                    <div className="relative">
                                        <DollarSign size={14} className="absolute top-2.5 right-2 text-gray-400" />
                                        <input
                                            type="number"
                                            placeholder="מ-"
                                            className="w-full pr-8 pl-3 py-2 border rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500"
                                            value={minSalary}
                                            onChange={(e) => setMinSalary(e.target.value)}
                                        />
                                    </div>
                                    <div className="relative">
                                        <DollarSign size={14} className="absolute top-2.5 right-2 text-gray-400" />
                                        <input
                                            type="number"
                                            placeholder="עד-"
                                            className="w-full pr-8 pl-3 py-2 border rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500"
                                            value={maxSalary}
                                            onChange={(e) => setMaxSalary(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="w-full bg-gray-800 text-white py-2 rounded-lg text-sm font-bold hover:bg-gray-900 transition-colors">
                                סנן
                            </button>
                            <button
                                type="button"
                                onClick={() => { setMinSalary(""); setMaxSalary(""); loadWorks(); }}
                                className="w-full text-blue-600 text-xs font-medium hover:underline"
                            >
                                נקה סינונים
                            </button>
                        </form>

                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mt-6">
                        <div className="flex items-center gap-2 mb-4 text-gray-800 font-bold border-b pb-2">
                            <Calendar size={20} className="text-blue-600" />
                            <h4>זמן פרסום</h4>
                        </div>

                        <div className="flex flex-col gap-2">
                            <button
                                onClick={() => filterByTime('all')}
                                className="text-right py-2 px-3 rounded-lg hover:bg-gray-50 text-sm transition-colors"
                            >
                                כל המשרות
                            </button>
                            <button
                                onClick={() => filterByTime('today')}
                                className="text-right py-2 px-3 rounded-lg hover:bg-gray-50 text-sm transition-colors text-blue-600 font-medium"
                            >
                                מהיום האחרון
                            </button>
                            <button
                                onClick={() => filterByTime('week')}
                                className="text-right py-2 px-3 rounded-lg hover:bg-gray-50 text-sm transition-colors text-blue-600 font-medium"
                            >
                                מהשבוע האחרון
                            </button>
                        </div>
                    </div>

                </aside>

                {/* --- Main Content --- */}
                <main className="flex-1">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-gray-700">משרות ({works.length})</h3>
                    </div>

                    {loading ? (
                        <div className="text-center py-20 text-gray-500">טוען משרות...</div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {works.map((work) => (
                                <WorkCard key={work.id} work={work} onEdit={openEditModal} onDelete={handleDelete} />
                            ))}
                        </div>
                    )}
                </main>
            </div>

            <WorkModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} workToEdit={editingWork} />
        </div>
    );
}