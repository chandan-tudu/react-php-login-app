import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setIsLoggedIn }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigation = useNavigate();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSubmitting) return;
        setIsSubmitting(true);

        const email = emailInputRef.current.value.trim().toLowerCase();
        const password = passwordInputRef.current.value.trim();

        if (!email || !password) {
            setIsSubmitting(false);
            alert("Please fill in all required fields correctly.");
            return;
        }

        try {
            const res = await fetch("http://localhost/login-api/login.php", {
                method: "POST",
                body: JSON.stringify({
                    email,
                    password,
                }),
            });
            const data = await res.json();

            if (data.status === 200) {
                e.target.reset();
                localStorage.setItem("token", data.token);
                setIsLoggedIn(true);
                navigation("/");
            } else if (typeof data.message !== "undefined") {
                alert(data.message);
            } else {
                console.log(data);
                alert("Something going wrong. See console.");
            }
        } catch (err) {
            alert(err.message);
            console.log(err);
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <>
            <h2>Login</h2>
            <form action="" method="post" onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Entery your email"
                    ref={emailInputRef}
                    required
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter new password"
                    ref={passwordInputRef}
                    required
                />
                <button type="submit">Login</button>{" "}
                <Link to="/signup">Sign Up</Link>
            </form>
        </>
    );
};

export default Login;
