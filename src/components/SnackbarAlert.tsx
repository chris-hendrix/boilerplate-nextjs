import { useState } from 'react'
import { Alert, Snackbar } from '@mui/material'

type Props = {
  content: string | null | undefined,
  severity?: 'error' | 'warning' | 'success' | 'info',
  duration?: number,
}

const SnackbarAlert: React.FC<Props> = ({ content, severity, duration = 4000 }) => {
  const [open, setOpen] = useState(true)

  const getSeverity = () => {
    if (!content) return 'error'
    if (severity) return severity
    if (content.toLowerCase().includes('error')) return 'error'
    if (content.toLowerCase().includes('success')) return 'success'
    return 'error'
  }

  if (!content) return null
  return (
    <Snackbar open={open} autoHideDuration={duration} onClose={(event, reason) => {
      reason !== 'clickaway' && setOpen(false)
    }}>
      <Alert severity={getSeverity()}>{content}</Alert>
    </Snackbar>
  )
}

export default SnackbarAlert
