import { render, screen } from '@testing-library/react';
import TodoList from './TodoList';

test('renders learn react link', () => {
  render(<TodoList />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
