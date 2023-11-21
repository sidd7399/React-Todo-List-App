import React from 'react';
import TodoItem from './TodoItem';
import { useTodoContext } from './Context';

function TodoList() {
  const { state: todos } = useTodoContext();
  console.log(todos);
  return (
    <ul>
      {todos?.todos?.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

export default TodoList;
