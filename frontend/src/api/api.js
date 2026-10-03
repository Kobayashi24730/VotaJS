import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.react_app_api || "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json"
    }
});