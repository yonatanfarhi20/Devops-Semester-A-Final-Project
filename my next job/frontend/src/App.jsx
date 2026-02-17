import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast"; // הייבוא החדש
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import JobDetails from "./pages/JobDetails.jsx";

function App() {
    return (
        <Router>
            <Toaster position="top-left" reverseOrder={false} /> {/* הרכיב שמאפשר להודעות לקפוץ */}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/work/:id" element={<JobDetails />} />
            </Routes>
        </Router>
    );
}

export default App;