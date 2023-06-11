import { useCallback } from "react";
import { Todo } from "types";

export default function useCreateTodoItem() {
    return useCallback<(id: string) => Promise<Todo>>(async (id) => {
      const response = await fetch(`/todos/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'cache-control': 'no-cache',
        },
        method: 'DELETE',
      });
      const body: Todo = await response.json();
      return body;
    }, []);
}