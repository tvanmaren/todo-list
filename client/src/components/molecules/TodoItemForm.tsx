import { Box, TextField } from '@mui/material'
import { type FormEvent, forwardRef, useEffect } from 'react'

interface TodoItemFormProps {
  defaultValue?: string
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>
}

export default forwardRef<HTMLInputElement, TodoItemFormProps>(function TodoItemForm(
  { defaultValue, handleSubmit },
  ref,
): JSX.Element {
  useEffect(() => {
    if (typeof ref === 'function') return
    if (ref === null || ref.current === null) return
    ref.current.focus()
  }, [ref])

  return (
    <Box
      component='form'
      display='flex'
      onSubmit={(event: FormEvent<HTMLFormElement>) => {
        void handleSubmit(event)
      }}
    >
      <TextField
        label='Add Todo Entry'
        helperText='Press Enter to submit'
        defaultValue={defaultValue}
        variant='filled'
        inputRef={ref}
        required
        fullWidth
      />
    </Box>
  )
})
