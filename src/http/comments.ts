import axios from 'axios';

const $comments = axios.create({
    baseURL: import.meta.env.VITE_COMMENTS_API_URL
})

export default $comments;