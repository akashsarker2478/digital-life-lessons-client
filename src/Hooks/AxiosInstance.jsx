
import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://digital-life-lesson-server.vercel.app",
  timeout: 15000, 
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;