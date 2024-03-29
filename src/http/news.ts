import axios from 'axios';


const $news = axios.create({
    baseURL: import.meta.env.VITE_NEWS_API_URL
})

export default $news;