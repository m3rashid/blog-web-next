import React from 'react'
import axios from 'axios'

export const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? // ? 'https://hidden-refuge-41005.herokuapp.com'
        'https://cubicle.vercel.app/api'
      : 'http://localhost:3000/api',
})
