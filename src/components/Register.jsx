import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const nameInputRef = useRef();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSubmitting) return;
        setIsSubmitting(true);

        const name = nameInputRef.current.value.trim();
        const email = emailInputRef.current.value.trim().toLowerCase();
        const password = passwordInputRef.current.value.trim();

        if (!name || !email || !password) {
            setIsSubmitting(false);
            alert("Please fill in all required fields correctly.");
            return;
        }

        try {
            const res = await fetch("http://localhost/login-api/register.php", {
                method: "POST",
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            });
            const data = await res.json();

            if (data.status === 201) {
                e.target.reset();
                alert(data.message);
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
            <h2>Sign Up</h2>
            <form action="" method="post" onSubmit={handleSubmit}>
                <label htmlFor="username">Name:</label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Enter your name"
                    ref={nameInputRef}
                    required
                />
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
                <button type="submit">Sign Up</button>{" "}
                <Link to="/login">Login</Link>
            </form>
        </>
    );
};

export default Register;
