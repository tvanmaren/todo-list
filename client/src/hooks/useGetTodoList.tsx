import { useCallback } from 'react'
import { type Todo } from 'types'

type GetTodoList = () => Promise<Todo[]>

export default function useGetTodoList(): GetTodoList {
  return useCallback<GetTodoList>(async () => {
    const response = await fetch('/todos', {
      headers: {
        'Content-Type': 'application/json',
        'cache-control': 'no-cache',
      },
    })
    const body: Todo[] = await response.json()
    return body
  }, [])
}
