import axios from 'axios';


const $news = axios.create({
    baseURL: process.env.NEWS_API_URL
})

// $auth.interceptors.request.use((config) => {
//     config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
//     return config;
// })

// $auth.interceptors.response.use((config) => {
//     return config;
// },async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status == 401 && error.config && !error.config._isRetry) {
//         originalRequest._isRetry = true;
//         try {
//             const response = await axios.get(`${AUTH_URL}/refresh`, {withCredentials: true})
//             localStorage.setItem('token', response.data.accessToken);
//             return $auth.request(originalRequest);
//         } catch (e) {
//             console.log('НЕ АВТОРИЗОВАН')
//         }
//     }
//     throw error;
// })

export default $news;