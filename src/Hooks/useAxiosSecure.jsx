import axios from 'axios';
import React, { useEffect } from 'react';
import UseAuth from './UseAuth';
 
const axiosSecure = axios.create({
    baseURL: "http://localhost:3000"
})

const useAxiosSecure = () => {
     const auth = UseAuth();
    const user = auth?.user;
    useEffect(()=>{
          if (!user?.accessToken) return;
        //intercept request
        axiosSecure.interceptors.request.use(config=>{
            config.headers.Authorization = `Bearer ${user.accessToken}`
            return config;
        })
    },[user])
    return axiosSecure;
};

export default useAxiosSecure;
// import axios from "axios";

// const axiosSecure = axios.create({
//   baseURL: "http://localhost:3000",
// });

// const useAxiosSecure = (token) => {
//   axiosSecure.interceptors.request.use(
//     (config) => {
//       if (token) {
//         config.headers.authorization = `Bearer ${token}`;
//       }
//       return config;
//     },
//     (error) => Promise.reject(error)
//   );

//   return axiosSecure;
// };

// export default useAxiosSecure;
