import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { useEffect } from "react";
import { useState } from "react";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);
    return (
        <BrowserRouter>
            <Routes>
                {isLoggedIn ? (
                    <Route
                        path="/"
                        element={<Profile setIsLoggedIn={setIsLoggedIn} />}
                    />
                ) : (
                    <>
                        <Route
                            path="/login"
                            element={<Login setIsLoggedIn={setIsLoggedIn} />}
                        />
                        <Route path="/signup" element={<Register />} />
                    </>
                )}
                <Route
                    path="*"
                    element={<Navigate to={isLoggedIn ? "/" : "/login"} />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
