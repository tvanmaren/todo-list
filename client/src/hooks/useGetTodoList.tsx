import { useCallback } from "react";
import { Todo } from "types";

export function useGetTodoList() {
    return useCallback<() => Promise<Todo[]>>(async () => {
      const response = await fetch(`/todos`, {
        headers: {
          'Content-Type': 'application/json',
          'cache-control': 'no-cache',
        },
      });
      const body: Todo[] = await response.json();
      return body;
    }, []);
}