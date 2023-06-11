import { useCallback } from 'react'
import { type Todo } from 'types'

type DeleteTodoItem = (id: string) => Promise<Todo>

export default function useDeleteTodoItem (): DeleteTodoItem {
  return useCallback<DeleteTodoItem>(async (id) => {
    const response = await fetch(`/todos/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'cache-control': 'no-cache'
      },
      method: 'DELETE'
    })
    const body: Todo = await response.json()
    return body
  }, [])
}
