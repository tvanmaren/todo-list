import { useCallback } from 'react'
import { type Todo } from 'types'

type CreateTodoItem = (todo: Partial<Todo>) => Promise<Todo>

export default function useCreateTodoItem(): CreateTodoItem {
  return useCallback<CreateTodoItem>(async (todo) => {
    const response = await fetch('/todos', {
      headers: {
        'Content-Type': 'application/json',
        'cache-control': 'no-cache',
      },
      method: 'POST',
      body: JSON.stringify(todo),
    })
    const body: Todo = await response.json()
    return body
  }, [])
}
