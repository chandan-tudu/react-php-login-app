import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [msg, setMsg] = useState("Loading...");
    useEffect(() => {
        const getToken = localStorage.getItem("token");

        (async () => {
            try {
                const res = await fetch("http://localhost/login-api/home.php", {
                    headers: {
                        Authorization: `Bearer ${getToken}`,
                    },
                });
                const data = await res.json();

                if (data.status === 200) {
                    setUser(data);
                } else if (data.status === 401) {
                    handleLogout();
                } else if (typeof data.message !== "undefined") {
                    setMsg(data.message);
                } else {
                    setMsg("Something going wrong. Check the console.");
                    console.log(data);
                }
            } catch (err) {
                setMsg(err.message);
                console.log(err);
            }
        })();
    }, []);

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div>
            {user === null ? (
                <p>{msg}</p>
            ) : (
                <>
                    <h2>User Profile</h2>
                    <ul style={{ fontSize: "20px" }}>
                        <li>
                            <strong>Id:</strong> {user.id}
                        </li>
                        <li>
                            <strong>Name:</strong> {user.name}
                        </li>
                        <li>
                            <strong>Email:</strong> {user.email}
                        </li>
                    </ul>
                    <button onClick={handleLogout}>Logout</button>
                </>
            )}
        </div>
    );
};

export default Profile;
