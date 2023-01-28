import { useState } from 'react'
import { Alert, Snackbar } from '@mui/material'

type Props = {
  content: string | null | undefined,
  severity?: 'error' | 'warning' | 'success' | 'info',
  duration?: number,
}

const SnackbarAlert: React.FC<Props> = ({ content, severity = 'error', duration = 4000 }) => {
  const [open, setOpen] = useState(true)
  if (!content) return null
  return (
    <Snackbar open={open} autoHideDuration={duration} onClose={(event, reason) => {
      reason !== 'clickaway' && setOpen(false)
    }}>
      <Alert severity={severity}>{content}</Alert>
    </Snackbar>
  )
}

export default SnackbarAlert
