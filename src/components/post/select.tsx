import { FC } from 'react'
import { createStyles, Select } from '@mantine/core'

const useStyles = createStyles((theme) => ({
  select: {
    flexGrow: 1,
  },
}))

export type PostType = 'text' | 'code'

interface IProps {
  value: PostType
  setValue: (value: PostType) => void
  labelType: 'new' | 'change'
  showLabel?: boolean
}

const ChooseTypeButton: FC<IProps> = ({
  value,
  setValue,
  labelType,
  showLabel = true,
}) => {
  const { classes } = useStyles()
  const labelText = `${labelType === 'new' ? 'Select' : 'Edit'} Content type`
  return (
    <Select
      className={classes.select}
      {...(showLabel && { label: labelText })}
      placeholder="Select a type"
      data={[
        { value: 'code', label: 'Code' },
        { value: 'text', label: 'Content' },
      ]}
      value={value}
      onChange={(value) => setValue(value as PostType)}
    />
  )
}

export default ChooseTypeButton
