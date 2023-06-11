import { useCallback } from 'react'
import { type Todo } from 'types'

type UpdateTodoItem = (todo: Todo) => Promise<Todo>

export default function useGetTodoList(): UpdateTodoItem {
  return useCallback<UpdateTodoItem>(async (todo) => {
    const response = await fetch(`/todos/${todo.id}`, {
      headers: {
        'Content-Type': 'application/json',
        'cache-control': 'no-cache',
      },
      method: 'PUT',
      body: JSON.stringify(todo),
    })
    const body: Todo = await response.json()
    return body
  }, [])
}
