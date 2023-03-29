import axios from "axios";
import { NavigateFunction } from "react-router-dom";

axios.defaults.baseURL =
  process.env.REACT_APP_BASE_URL || "http://localhost:4000";
export const token = localStorage.getItem("auth_token");
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export const logout = (navigate: NavigateFunction, resetState: () => void) => {
  localStorage.removeItem("auth_token");
  navigate("/");
  resetState();
};

export const setToken = (token: string) => {
  localStorage.setItem("auth_token", token);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export default axios;
