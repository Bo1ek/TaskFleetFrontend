import { useNavigate } from "react-router-dom";
import { UserProfile } from "../models/User";
import { createContext, useEffect, useState } from "react";
import { loginAPI, registerAPI } from "../services/AuthService";
import React from "react";
import { toast } from "react-toastify";
import axios from "axios";

type UserContextType = {
    user: UserProfile | null;
    token: string | null;
    registerUser: (email: string, password: string, firstName: string, lastName: string, role: string) => void;
    loginUser: (email: string, password: string) => void;
    logout: () => void;
    isLoggedIn: () => boolean;
};

type Props = {children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({children}: Props) => {
    const navigate = useNavigate();
    const [token,setToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if (user && token) {
            setUser(JSON.parse(user));
            setToken(token);
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        }
        setIsReady(true);
    }, []);

    const registerUser = async (email: string, password: string, firstName: string, lastName: string, role:string) => {
        await registerAPI(email, password, firstName, lastName, role).then((res) => {
            if(res) {
                localStorage.setItem("token", res?.token);
                const userObj = {
                    email: res.email,
                    firstName: res.firstName,
                    lastName: res.lastName,
                    role: res.role
                }
                localStorage.setItem("user", JSON.stringify(userObj));
                setToken(res.token!);
                setUser(userObj);
                toast.success("User logged in successfully");
                navigate("/");
            }  
        }).catch((e) => toast.warning(e.message));
    };

    const loginUser = async (email: string, password: string) => {
        await loginAPI(email, password).then((res) => {
            if(res) {
                localStorage.setItem("token", res?.token);
                const userObj = {
                    email: res.email,
                    firstName: res.firstName,
                    lastName: res.lastName,
                    role: res.role
                }
                localStorage.setItem("user", JSON.stringify(userObj));
                setToken(res.token!);
                setUser(userObj);
                toast.success("User logged in successfully");
                navigate("/");
            }  
        }).catch((e) => toast.warning(e.message));
    };

    
    const isLoggedIn = () => {
        return !!user;
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setToken("");
        navigate("/");
    }

    return (
        <UserContext.Provider value={{loginUser, user, token, logout, registerUser, isLoggedIn}}>
            {isReady ? children : null}
        </UserContext.Provider>
    )
};

export const useAuth = () => React.useContext(UserContext);

