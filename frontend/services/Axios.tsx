import axios from 'axios';

const api = axios.create({
  baseURL: 'https://todo-next-typescript.onrender.com',
});

export default api;
