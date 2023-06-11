import useCreateTodoItem from 'hooks/useCreateTodoItem'
import useDeleteTodoItem from 'hooks/useDeleteTodoItem'
import useGetTodoList from 'hooks/useGetTodoList'
import useUpdateTodoItem from 'hooks/useUpdateTodoItem'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { type Todo } from 'types'

interface TodoContextType {
  todoList: Todo[]
  setTodoList: (todoList: Todo[]) => void
  getTodoList: ReturnType<typeof useGetTodoList>
  getTodoItem: (id?: string) => Todo | undefined
  createTodoItem: ReturnType<typeof useCreateTodoItem>
  deleteTodoItem: ReturnType<typeof useDeleteTodoItem>
  updateTodoItem: ReturnType<typeof useUpdateTodoItem>
}

export const TodoContext = createContext<TodoContextType>({
  todoList: [],
  setTodoList: () => {},
  getTodoList: async () => await new Promise<Todo[]>(() => []),
  getTodoItem: () => undefined,
  createTodoItem: async () => await new Promise<Todo>(() => ({})),
  deleteTodoItem: async () => await new Promise<Todo>(() => ({})),
  updateTodoItem: async () => await new Promise<Todo>(() => ({})),
})

export function TodoProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const getTodoList = useGetTodoList()
  const createTodoItem = useCreateTodoItem()
  const deleteTodoItem = useDeleteTodoItem()
  const updateTodoItem = useUpdateTodoItem()

  const sessionStorageTodoList: Todo[] = JSON.parse(sessionStorage.getItem('todoList') ?? '[]')
  const [todoList, setTodoList] = useState<Todo[]>(sessionStorageTodoList)

  const setSessionStorageTodoList = (newTodoList: Todo[]): void => {
    sessionStorage.setItem('todoList', JSON.stringify(newTodoList))
  }

  useEffect(() => {
    setSessionStorageTodoList(todoList)
  }, [todoList])

  const handleCreateTodoItem = useCallback<typeof createTodoItem>(
    async (todo) => {
      const newTodo = await createTodoItem(todo)
      setTodoList([...todoList, newTodo])
      return newTodo
    },
    [createTodoItem, todoList],
  )

  const handleGetTodoList = useCallback<typeof getTodoList>(async () => {
    const todoList = await getTodoList()
    setTodoList(todoList)
    return todoList
  }, [getTodoList])

  const handleGetTodoItem = useCallback<(id?: string) => Todo | undefined>(
    (id) => {
      return todoList.find(({ id: todoId }) => todoId === id)
    },
    [todoList],
  )

  const handleDeleteTodoItem = useCallback<typeof deleteTodoItem>(
    async (id) => {
      const deletedTodo = await deleteTodoItem(id)
      setTodoList(todoList.filter(({ id }) => id !== deletedTodo.id))
      return deletedTodo
    },
    [deleteTodoItem, todoList],
  )

  const handleUpdateTodoItem = useCallback<typeof updateTodoItem>(
    async (todo) => {
      const updatedTodo = await updateTodoItem(todo)
      setTodoList(todoList.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)))
      return updatedTodo
    },
    [updateTodoItem, todoList],
  )

  return (
    <TodoContext.Provider
      value={{
        todoList,
        setTodoList,
        getTodoList: handleGetTodoList,
        getTodoItem: handleGetTodoItem,
        createTodoItem: handleCreateTodoItem,
        deleteTodoItem: handleDeleteTodoItem,
        updateTodoItem: handleUpdateTodoItem,
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}

export const useTodoContext = (): TodoContextType => useContext(TodoContext)
