import { forwardRef } from 'react';
import { useCallback } from 'react';
import { ChipDelete } from '@mui/joy';
import { Checkbox, FormControlLabel, Tooltip } from '@mui/material';
import './TodoItem.css';
import { Todo } from 'types';
import useDeleteTodoItem from 'hooks/useDeleteTodoItem';
import useUpdateTodoItem from 'hooks/useUpdateTodoItem';

const deleteIcon = {
  width: '1rem',
  height: '1rem',
  marginLeft: '0.5rem'
};

const TitleText = forwardRef<HTMLSpanElement, {title: string;}>(function TitleText({title, ...rest}, ref) {
  return (
    <span {...rest} ref={ref} className="Label-title">
      {title}
    </span>
  );
});

export default function TodoItem({id, completed, title}: Todo) {
  const deleteTodoItem = useDeleteTodoItem();
  const updateTodoItem = useUpdateTodoItem();

  const handleUpdate = useCallback(() => updateTodoItem({ id, title, completed: !completed }), [updateTodoItem, id, title, completed]);
  const handleDelete = useCallback(() => deleteTodoItem(id), [deleteTodoItem, id]);

  return (
  <FormControlLabel
    control={<Checkbox checked={completed} onChange={handleUpdate} />}
    label={
      <span className="Label-container">
      <Tooltip title={title}>
        <TitleText title={title} />
      </Tooltip>
      <ChipDelete variant="soft" color="danger" sx={deleteIcon} onDelete={handleDelete} />
      </span>
    }
  />);
}
