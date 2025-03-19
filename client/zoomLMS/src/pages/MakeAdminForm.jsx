import { useState } from "react";

const MakeAdminForm = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userInfo || userInfo.role !== "admin") {
            setMessage("Only admins can promote users.");
            return;
        }

        try {
            const response = await fetch("https://booklms.onrender.com/api/users/make-admin", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userInfo.token}`
                },
                body: JSON.stringify({ email })
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            console.error("Error promoting user:", error);
            setMessage("Server error. Please try again later.");
        }
    };

    return (
        <div>
            <h2>Promote User to Admin</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="User's Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <button type="submit">Make Admin</button>
            </form>
        </div>
    );
};

export default MakeAdminForm;
