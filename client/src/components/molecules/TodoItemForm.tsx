import { Box, TextField } from '@mui/material'
import { type FormEvent, forwardRef } from 'react'

interface TodoItemFormProps {
  defaultValue?: string
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>
}

export default forwardRef<HTMLInputElement, TodoItemFormProps>(function TodoItemForm(
  { defaultValue, handleSubmit },
  ref,
): JSX.Element {
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
