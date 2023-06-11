import { useCallback } from "react";
import { Todo } from "types";

export default function useCreateTodoItem() {
    return useCallback<(todo: Partial<Todo>) => Promise<Todo>>(async (todo) => {
      const response = await fetch(`/todos`, {
        headers: {
          'Content-Type': 'application/json',
          'cache-control': 'no-cache',
        },
        method: 'POST',
        body: JSON.stringify(todo),
      });
      const body: Todo = await response.json();
      return body;
    }, []);
}