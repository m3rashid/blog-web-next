import axios from 'axios'

export const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://cubicle.vercel.app/api'
      : 'http://localhost:3000/api',
})
