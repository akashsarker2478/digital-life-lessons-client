// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "https://digital-life-lesson-server.vercel.app",
// });

// const useAxios = () => {
//   return axiosInstance;
// };
// export default useAxios;
// Hooks/useAxiosPublic.jsx
import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://digital-life-lesson-server.vercel.app",
  timeout: 15000, // cold start-এর জন্য
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;