import { createContext, useState, useEffect, useContext } from "react";
import API from "../utils/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkLoggedIn = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const { data } = await API.get("/auth/me");
                    setUser(data);
                } catch (error) {
                    console.error("Token validation failed:", error);
                    localStorage.removeItem("token");
                }
            }
            setLoading(false);
        };
        checkLoggedIn();
    }, []);

    const login = async (email, password) => {
        const { data } = await API.post("/auth/login", { email, password });
        localStorage.setItem("token", data.token);
        setUser({ _id: data._id, username: data.username, email: data.email });
        return data;
    };

    const register = async (username, email, password) => {
        const { data } = await API.post("/auth/register", { username, email, password });
        localStorage.setItem("token", data.token);
        setUser({ _id: data._id, username: data.username, email: data.email });
        return data;
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
