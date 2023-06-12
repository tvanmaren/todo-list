import { fireEvent, render, waitFor } from '@testing-library/react'
import { type Ref } from 'react'

import TodoItemForm from './TodoItemForm'

type PropOverrides = Partial<Parameters<typeof TodoItemForm>[0]>

type SetupReturnType = ReturnType<typeof render> & {
  input: HTMLElement
  handleSubmit: PropOverrides['handleSubmit']
}

describe('<TodoItemForm />', () => {
  const setup = (propOverrides: PropOverrides = {}): SetupReturnType => {
    const handleSubmit = propOverrides.handleSubmit ?? jest.fn()
    const defaultValue = propOverrides.defaultValue
    const utils = render(<TodoItemForm handleSubmit={handleSubmit} defaultValue={defaultValue} />)
    const input = utils.getByLabelText('Add Todo Entry')
    return {
      input,
      handleSubmit,
      ...utils,
    }
  }

  describe('render', () => {
    it('renders successfully', () => {
      const { baseElement } = setup()
      expect(baseElement).toBeInTheDocument()
    })

    it('renders the default value', () => {
      const { getByDisplayValue } = setup({ defaultValue: 'Unique Default Value' })
      expect(getByDisplayValue('Unique Default Value')).toBeInTheDocument()
    })
  })

  describe('actions', () => {
    it.skip('focuses the input when rendered', async () => {
      const mockInput = { focus: jest.fn() } as unknown as HTMLInputElement
      const { input } = setup({ ref: { current: mockInput } })
      // TODO: figure out how to test this
      await waitFor(() => {
        expect(input).toHaveFocus()
      })
    })

    it('calls the handleSubmit function when submitted', () => {
      const { handleSubmit, input } = setup()
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      fireEvent.submit(input.closest('form')!)

      expect(handleSubmit).toHaveBeenCalledTimes(1)
    })
  })
})
