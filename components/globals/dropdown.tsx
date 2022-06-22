import React from 'react'
import {
  Popper,
  Button,
  Paper,
  Center,
  Group,
  useMantineTheme,
} from '@mantine/core'

interface IProps {
  label: React.ReactNode
}

const Dropdown: React.FC<IProps> = ({ label }) => {
  const [referenceElement, setReferenceElement] = React.useState()
  const [visible, setVisible] = React.useState(true)
  const theme = useMantineTheme()

  return (
    <Group position="center">
      <></>
    </Group>
  )
}

export default Dropdown
