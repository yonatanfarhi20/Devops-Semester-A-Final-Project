import axios from 'axios';

// הכתובת הבסיסית של השרת שלך
const API_URL = "http://localhost:8080/api/works";

export const WorkService = {
    // 1. קבלת כל המשרות
    getAllWorks: async () => {
        const response = await axios.get(API_URL);
        return response.data;
    },

    // 2. חיפוש חופשי (לפי הטקסט ששלחת בקונטרולר - temp)
    searchWorks: async (text) => {
        const response = await axios.get(`${API_URL}/search`, {
            params: { temp: text }
        });
        return response.data;
    },

    // 3. סינון לפי טווח משכורות (startSalary, endSalary)
    filterBySalary: async (min, max) => {
        const response = await axios.get(`${API_URL}/findBySalaryBetween`, {
            params: {
                startSalary: min,
                endSalary: max
            }
        });
        return response.data;
    },

    // 4. יצירת משרה חדשה
    createWork: async (workData) => {
        const response = await axios.post(API_URL, workData);
        return response.data;
    },

    // 5. עדכון משרה קיימת
    updateWork: async (id, workData) => {
        const response = await axios.put(`${API_URL}/${id}`, workData);
        return response.data;
    },

    // 6. מחיקת משרה
    deleteWork: async (id) => {
        await axios.delete(`${API_URL}/${id}`);
    },

    // 7. קבלת משרה לפי מזהה (למקרה שנרצה דף נפרד למשרה)
    getWorkById: async (id) => {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    }
};