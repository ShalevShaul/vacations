import axios from "axios";

// Create new axios instance
const jwtAxios = axios.create({baseURL:''});

// Add interceptor to automatically inject JWT token
jwtAxios.interceptors.request.use(request => {
    if(localStorage.loginData) {
        const loginData = JSON.parse(localStorage.loginData);
        
        // Add Authorization header with Bearer token to requests
        request.headers = {
            Authorization: 'Bearer ' + loginData.token
        } as any;
    }

    return request;
})

export default jwtAxios;