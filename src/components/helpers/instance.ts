import axios from 'axios'

export const SERVER_URL = 'https://cubicle-backend.cyclic.app/api'

export const instance = axios.create({ baseURL: SERVER_URL })
