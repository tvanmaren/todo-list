import { useCallback } from "react";
import { Todo } from "types";

export default function useGetTodoList() {
    return useCallback<(todo: Todo) => Promise<Todo>>(async (todo) => {
      const response = await fetch(`/todos/${todo.id}`, {
        headers: {
          'Content-Type': 'application/json',
          'cache-control': 'no-cache',
        },
        method: 'PUT',
        body: JSON.stringify(todo),
      });
      const body: Todo = await response.json();
      return body;
    }, []);
}