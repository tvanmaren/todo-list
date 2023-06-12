import { act, render, waitForElementToBeRemoved } from '@testing-library/react'

import { useTodoContext } from 'components/providers/TodoContext'

import TodoList from './TodoList'

jest.mock('components/providers/TodoContext', () => ({
  useTodoContext: jest.fn(),
}))

jest.mock('components/molecules/TodoItemForm', () => {
  const { forwardRef } = jest.requireActual('react')
  return {
    __esModule: true,
    default: forwardRef((props: any, ref: any) => (
      <button onClick={props.handleSubmit} ref={ref}>
        MockTodoItemForm
      </button>
    )),
  }
})

jest.mock('components/organisms/TodoItem/TodoItem', () => ({
  __esModule: true,
  default: ({ todo: { title, completed } }: { todo: { title: string; completed: boolean } }) => (
    <div>{`${title}-${String(completed)}`}</div>
  ),
}))

interface HookOverrides {
  todoContextOverrides?: Partial<ReturnType<typeof useTodoContext>>
}

type SetupReturnType = ReturnType<typeof render> & {
  mockTodoContext: HookOverrides['todoContextOverrides']
}

describe('<TodoList />', () => {
  const setup = ({ todoContextOverrides }: HookOverrides = {}): SetupReturnType => {
    const mockTodoContext: ReturnType<typeof useTodoContext> = {
      todoList: todoContextOverrides?.todoList ?? [
        { id: '1', title: 'mock todo item title', completed: false },
      ],
      getTodoItem: todoContextOverrides?.getTodoItem ?? jest.fn(),
      getTodoList: todoContextOverrides?.getTodoList ?? jest.fn(),
      setTodoList: todoContextOverrides?.setTodoList ?? jest.fn(),
      createTodoItem: todoContextOverrides?.createTodoItem ?? jest.fn(),
      deleteTodoItem: todoContextOverrides?.deleteTodoItem ?? jest.fn(),
      updateTodoItem: todoContextOverrides?.updateTodoItem ?? jest.fn(),
    }
    jest.mocked(useTodoContext).mockReturnValue(mockTodoContext)

    const utils = render(<TodoList />)
    return {
      mockTodoContext,
      ...utils,
    }
  }

  describe('render', () => {
    it('renders successfully', () => {
      const { baseElement } = setup()
      expect(baseElement).toBeInTheDocument()
    })

    it('renders a list of TodoItems', () => {
      const { getByText, mockTodoContext } = setup({
        todoContextOverrides: {
          todoList: new Array(5).fill('').map((_, i) => ({
            id: String(i),
            title: `example-${i}`,
            completed: Boolean(i % 2),
          })),
        },
      })
      expect(mockTodoContext?.todoList?.length).toBe(5)
      for (const todoItem of mockTodoContext?.todoList ?? []) {
        expect(getByText(`${todoItem.title}-${String(todoItem.completed)}`)).toBeInTheDocument()
      }
    })
  })

  describe('actions', () => {
    it('opens the TodoItemForm when the add button is clicked', async () => {
      const { findByText, getByLabelText } = setup()
      getByLabelText('add').click()
      await findByText('MockTodoItemForm')
    })

    it.skip('calls the createTodoItem function when the TodoItemForm is submitted', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { findByText, getByLabelText, mockTodoContext } = setup()
      getByLabelText('add').click()
      const form = await findByText('MockTodoItemForm')
      form.click()
      await waitForElementToBeRemoved(form)
      // TODO: figure out better state management to have fewer rerenders from the same action
      // await findByText('undefined-false')
      // expect(mockTodoContext?.createTodoItem).toHaveBeenCalledTimes(1)
    })
  })
})
