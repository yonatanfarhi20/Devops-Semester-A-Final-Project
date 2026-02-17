import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function SalaryChart({ works }) {
    // עיבוד הנתונים לגרף: מחלקים לקבוצות שכר (למשל: 0-10k, 10k-20k וכו')
    const prepareData = () => {
        const ranges = {
            "0-10k": 0,
            "10k-20k": 0,
            "20k-30k": 0,
            "30k-40k": 0,
            "40k+": 0
        };

        works.forEach(work => {
            const s = work.salary;
            if (s < 10000) ranges["0-10k"]++;
            else if (s < 20000) ranges["10k-20k"]++;
            else if (s < 30000) ranges["20k-30k"]++;
            else if (s < 40000) ranges["30k-40k"]++;
            else ranges["40k+"]++;
        });

        return Object.keys(ranges).map(key => ({
            name: key,
            כמות: ranges[key]
        }));
    };

    const data = prepareData();

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-6" dir="rtl">
            <h4 className="text-sm font-bold text-gray-700 mb-4 border-b pb-2">התפלגות שכר באתר</h4>
            <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="name" fontSize={12} tick={{fill: '#6b7280'}} axisLine={false} tickLine={false} />
                        <YAxis fontSize={12} tick={{fill: '#6b7280'}} axisLine={false} tickLine={false} />
                        <Tooltip
                            cursor={{fill: '#f9fafb'}}
                            contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                        />
                        <Bar dataKey="כמות" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={30} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}