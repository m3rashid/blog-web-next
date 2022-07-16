import { createStyles } from '@mantine/core'

export const useStyles = createStyles((theme) => ({
  buttonTop: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    flexDirection: 'row-reverse',
  },
  input: {
    flexGrow: 1,
  },
  switch: {
    display: 'flex',
    flexDirection: 'row-reverse',
    gap: '10px',
    padding: '0 10px',
  },
  switchInput: {
    fontSize: '0.7rem',
  },
  switchLabel: {
    padding: 0,
    fontWeight: 600,
  },
}))
