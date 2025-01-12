import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})

const useAxiosSecure = () => {
    const navigate = useNavigate()
    const { logOut } = useAuth()

    // request interceptor to ad authoriztion for every secure APIs
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token');
        // console.log('request hitting by interceptors before adding token:', token)
        config.headers.authorization = `bearer ${token}`

        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    })

    // interceptor response status(401) || (403)
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        // facilities some work
        const status = error.response?.status;
        if (status === 401 || status === 403) {
            await logOut()
            navigate('/login');
        }
        console.log("status error INTERCEPTOR", status)
        return Promise.reject(error)
    })


    return axiosSecure
};

export default useAxiosSecure;