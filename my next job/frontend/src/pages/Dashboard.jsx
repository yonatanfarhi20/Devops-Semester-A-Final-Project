import { useEffect, useState } from "react";
import { WorkService } from "../api/workService";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ArrowRight, TrendingUp, Users, DollarSign, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';

export default function Dashboard() {
    const [works, setWorks] = useState([]);
    const [loading, setLoading] = useState(true);
    const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await WorkService.getAllWorks();
                setWorks(data);
            } catch (error) {
                toast.error("נכשלה טעינת הנתונים הסטטיסטיים");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // --- חישובים מבוססי נתונים אמיתיים ---

    // 1. חישוב שכר ממוצע (רק אם יש משרות)
    const avgSalary = works.length > 0
        ? Math.round(works.reduce((acc, w) => acc + (Number(w.salary) || 0), 0) / works.length)
        : 0;

    // 2. מציאת שכר שיא
    const maxSalary = works.length > 0
        ? Math.max(...works.map(w => Number(w.salary) || 0))
        : 0;

    // 3. פילוח שכר לגרפים
    const salaryData = [
        { name: '0-10k', value: works.filter(w => w.salary < 10000).length },
        { name: '10k-25k', value: works.filter(w => w.salary >= 10000 && w.salary < 25000).length },
        { name: '25k-40k', value: works.filter(w => w.salary >= 25000 && w.salary < 40000).length },
        { name: '40k+', value: works.filter(w => w.salary >= 40000).length },
    ].filter(item => item.value > 0); // מציג רק טווחים שיש בהם משרות

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">טוען נתונים אמיתיים...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8" dir="rtl">
            <div className="max-w-6xl mx-auto">
                <Link to="/" className="text-blue-600 flex items-center gap-2 mb-6 hover:underline font-medium">
                    <ArrowRight size={20} /> חזרה ללוח המשרות
                </Link>

                <h2 className="text-3xl font-bold text-gray-800 mb-8">ניתוח נתונים ומגמות</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* כרטיס סה"כ משרות */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl w-fit mb-4"><Briefcase /></div>
                        <h4 className="text-gray-500 text-sm font-medium">סה"כ משרות ב-DB</h4>
                        <p className="text-2xl font-bold text-gray-800">{works.length}</p>
                    </div>

                    {/* כרטיס שכר ממוצע */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="p-3 bg-green-50 text-green-600 rounded-xl w-fit mb-4"><DollarSign /></div>
                        <h4 className="text-gray-500 text-sm font-medium">שכר ממוצע (חישוב אמת)</h4>
                        <p className="text-2xl font-bold text-gray-800">{avgSalary.toLocaleString()} ₪</p>
                    </div>

                    {/* כרטיס שכר שיא */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="p-3 bg-purple-50 text-purple-600 rounded-xl w-fit mb-4"><TrendingUp /></div>
                        <h4 className="text-gray-500 text-sm font-medium">השכר הגבוה ביותר</h4>
                        <p className="text-2xl font-bold text-gray-800">{maxSalary.toLocaleString()} ₪</p>
                    </div>
                </div>

                {/* גרפים */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h4 className="font-bold text-gray-700 mb-6">התפלגות שכר</h4>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={salaryData}>
                                    <XAxis dataKey="name" />
                                    <Tooltip />
                                    <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} name="כמות משרות" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h4 className="font-bold text-gray-700 mb-6">נתח שוק</h4>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={salaryData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                        {salaryData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}