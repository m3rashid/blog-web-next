import axios from 'axios'
import { useSetRecoilState } from 'recoil'
import { CircleCheck, Error404 } from 'tabler-icons-react'
import { showNotification, updateNotification } from '@mantine/notifications'

import { authAtom } from '../atoms/auth'
import React from 'react'

export const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://hidden-refuge-41005.herokuapp.com'
      : 'http://localhost:5000',
})

export interface INotifState {
  title: string
  message: string
}

export interface INotification {
  id: string
  show?: boolean
  loadingMsg?: INotifState
  successMsg?: INotifState
  errorMsg?: INotifState
}

interface ISafeApiCall {
  endpoint: string
  body: any
  notif: INotification
}

export const useSafeApiCall = () => {
  const setAuthState = useSetRecoilState(authAtom)
  const jwtToken = window.localStorage.getItem('token')
  const [loading, setLoading] = React.useState<boolean>()

  const safeApiCall = async ({ endpoint, body, notif }: ISafeApiCall) => {
    const show = notif.show ?? false
    try {
      setLoading(true)
      show &&
        showNotification({
          id: notif.id,
          loading: true,
          title: notif.loadingMsg?.title || 'In Progress',
          message: notif.loadingMsg?.message || 'Please wait...',
          autoClose: 5000,
          disallowClose: false,
        })

      const res = await instance.post(endpoint, JSON.stringify({ ...body }), {
        headers: {
          'Content-Type': 'application/json',
          authorization: jwtToken ?? '',
        },
      })

      show &&
        updateNotification({
          id: notif.id,
          color: 'teal',
          title: notif.successMsg?.title || res.data.message || 'Successful',
          message:
            notif.successMsg?.message ||
            res.data.message ||
            'Your request was successful',
          icon: <CircleCheck />,
          autoClose: 5000,
          disallowClose: false,
        })
      setLoading(false)

      return res
    } catch (err: any) {
      if (err.response.status === 401) {
        setAuthState({ isAuthenticated: false, user: {} as any })
        window.localStorage.removeItem('token')
        setLoading(false)
        return null
      }

      console.log(err)
      show &&
        updateNotification({
          id: notif.id,
          color: 'red',
          title: notif.errorMsg?.title || 'Error',
          message:
            notif.errorMsg?.message ||
            'An error occurred while getting response from server. Please try again later.',
          icon: <Error404 />,
          autoClose: 5000,
          disallowClose: false,
        })
      setLoading(false)

      return null
    }
  }

  return { safeApiCall, loading }
}
