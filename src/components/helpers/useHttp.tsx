import React from 'react'

import {
  INotifState,
  useNotification,
} from 'components/helpers/useNotification'
import { instance } from 'components/helpers/instance'

interface IProps {
  body: any
  endpoint: string
  errorMsg?: INotifState
  successMsg?: INotifState
}

const useHttp = (id: string) => {
  const [loading, setLoading] = React.useState(false)
  const { loadingNotif, updateFailureNotif, updateSuccessNotif } =
    useNotification({ id })

  const request = async ({ body, endpoint, successMsg, errorMsg }: IProps) => {
    try {
      setLoading(true)
      loadingNotif()
      const res = await instance.post(endpoint, body)
      if (!res) {
        throw new Error('No response from the server')
      }
      setLoading(false)
      if (successMsg) updateSuccessNotif({ successMsg })
      else updateSuccessNotif({})
      return { data: res.data }
    } catch (err: any) {
      console.log(err)
      setLoading(false)

      if (errorMsg) updateFailureNotif({ errorMsg })
      else updateFailureNotif({})

      return { data: null }
    }
  }

  return {
    loading,
    setLoading,
    request,
  }
}

export default useHttp
