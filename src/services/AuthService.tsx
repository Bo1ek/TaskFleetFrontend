import axios from "axios";
import { UserProfileToken } from "../models/User";

const api = "https://localhost:44336/api";

export const loginAPI = async (email: string, password: string) => {
    try {
        const data = await axios.post<UserProfileToken>(api + "/Accounts/login", {
        email: email,
        password: password,
        });
            
        if (data.status === 200) {
        return data.data;
        }
    } catch (err: any) {
        throw new Error(err.response.data.message);
    }
}

export const registerAPI = async (email: string, password: string, firstName: string, lastName: string, role: string) => {
    try {
        const data = await axios.post<UserProfileToken>(api + "/Accounts/register", {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        role: role
        });
            
        if (data.status === 200) {
        return data.data;
        }
    } catch (err: any) {
        throw new Error(err.response.data.message);
    }
}