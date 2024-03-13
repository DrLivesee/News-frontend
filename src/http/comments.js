import axios from 'axios';

const $comments = axios.create({
    baseURL: process.env.COMMENTS_API_URL
})

export default $comments;