import axios from 'axios'

export const SERVER_URL = 'https://cubicle-backend.herokuapp.com/api'

export const instance = axios.create({ baseURL: SERVER_URL })
