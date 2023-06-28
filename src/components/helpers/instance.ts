import axios from 'axios';

export const SERVER_URL = 'http://localhost:5000/api';

export const instance = axios.create({ baseURL: SERVER_URL });
