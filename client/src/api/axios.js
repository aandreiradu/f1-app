import axios from "axios";


const BASE_URL = 'http://localhost:3300';

export default axios.create({
    baseURL : BASE_URL
});




export const axiosPrivate = axios.create({
    baseURL : BASE_URL,
    withCredentials : true,
});


export const axiosPublic = axios.create({
    baseURL : BASE_URL,
    withCredentials : false,
})