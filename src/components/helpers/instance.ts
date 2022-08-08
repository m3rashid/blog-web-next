// import axios from 'axios'

// export const instance = axios.create({
//   baseURL: process.env.VERCEL_URL
//     ? `https://${process.env.VERCEL_URL}/api`
//     : 'http://localhost:3000/api',
// })

export const instance = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'
