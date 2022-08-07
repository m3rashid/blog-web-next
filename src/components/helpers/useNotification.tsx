import { CircleCheck, Error404 } from 'tabler-icons-react'
import { showNotification, updateNotification } from '@mantine/notifications'

export interface INotifState {
  title?: string
  message?: string
}

export const useNotification = ({ id }: { id: string }) => {
  const loadingNotif = (loadingMsg?: INotifState) => {
    return showNotification({
      id: id,
      loading: true,
      title: loadingMsg?.title || 'In Progress',
      message: loadingMsg?.message || 'Please wait...',
      autoClose: 5000,
      disallowClose: false,
    })
  }

  const updateSuccessNotif = ({
    res,
    successMsg,
  }: {
    res?: any
    successMsg?: INotifState
  }) => {
    return updateNotification({
      id: id,
      color: 'teal',
      title: successMsg?.title || 'Successful',
      message: successMsg?.message || 'Your request was successful',
      icon: <CircleCheck />,
      autoClose: 5000,
      disallowClose: false,
    })
  }

  const updateFailureNotif = ({
    err,
    errorMsg,
  }: {
    err?: any
    errorMsg?: INotifState
  }) => {
    return updateNotification({
      id: id,
      color: 'red',
      title: errorMsg?.title || 'Error',
      message:
        errorMsg?.message ||
        'An error occurred while getting response from server. Please try again later.',
      icon: <Error404 />,
      autoClose: 5000,
      disallowClose: false,
    })
  }

  return {
    loadingNotif,
    updateSuccessNotif,
    updateFailureNotif,
  }
}
