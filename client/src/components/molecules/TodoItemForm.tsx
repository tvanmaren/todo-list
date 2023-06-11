import { type FormEvent, type Ref } from 'react'
import { Box, TextField } from '@mui/material'

interface TodoItemFormProps {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>
  inputRef: Ref<HTMLInputElement>
}

export default function TodoItemForm ({ handleSubmit, inputRef }: TodoItemFormProps): JSX.Element {
  return <Box component="form" display="flex" onSubmit={(event: FormEvent<HTMLFormElement>) => { void handleSubmit(event) }}>
    <TextField label="Add Todo Entry" variant="filled" inputRef={inputRef} required helperText="Press Enter to submit" />
  </Box>
}
