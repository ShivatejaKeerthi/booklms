import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
        const storedUser = localStorage.getItem("booklmsUser");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const { data } = await axios.post("https://booklms.onrender.com/api/users/login", { email, password });
            setUser(data);
            localStorage.setItem("booklmsUser", JSON.stringify(data));
            return { success: true, data };
        } catch (error) {
            console.error("Login error:", error.response?.data?.message || error.message);
            return { success: false, message: error.response?.data?.message || "Login failed" };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("booklmsUser");
    };

    return (
        <UserContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};
