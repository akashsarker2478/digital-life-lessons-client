
import axios from "axios";
import { useEffect } from "react";
import UseAuth from "./UseAuth";

const axiosSecure = axios.create({
  baseURL: "https://digital-life-lesson-server.vercel.app",
});

const useAxiosSecure = () => {
  const authInfo = UseAuth();
  const user = authInfo?.user; 

  useEffect(() => {
    if (user?.accessToken) {
      axiosSecure.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
        return config;
      });
    }
  }, [user]);

  return axiosSecure;
};

export default useAxiosSecure;