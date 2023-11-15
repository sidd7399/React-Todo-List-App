import React, { useState } from 'react';
import { Card, Form, ListGroup } from 'react-bootstrap';
import { useSelector , useDispatch } from 'react-redux';
import { Create_Todo,Toggle_Todo,Delete_Todo } from "./actions";
import { useTodoContext } from './Context';


function formatDate(date) {
  return new Date(date).toLocaleString();
}

function TodoItem({ todo }) {
  console.log(todo)
  const { state: todosList, createTodo, toggleTodo, deleteTodo } = useTodoContext();

  const [complete, setComplete] = useState(todo.complete);

  // const dispatch = useDispatch();

  const handleCheckboxChange = () => {
    // if (!complete) {
    //   todo.dateCompleted = Date.now();
    // }else{
    //   todo.dateCompleted = null;
    // }
    setComplete((prev) => !prev)
    toggleTodo({ id: todo.id, complete: !complete })
  };


  return (
    <Card>
      <Card.Body>
        <Card.Title>{todo.title}</Card.Title>
        <Card.Text>{todo.description}</Card.Text>
        <ListGroup>
          <ListGroup.Item>Author: {todo.author}</ListGroup.Item>
          <ListGroup.Item>Date Created: {formatDate(todo.dateCreated)}</ListGroup.Item>
          <ListGroup.Item>Date Completed: {todo.completedDate ? formatDate(todo.completedDate) : '-'}</ListGroup.Item>
        </ListGroup>
      </Card.Body>
      <Card.Footer>
        <Form.Check
          type="checkbox"
          label="Complete"
          checked={complete}
          onChange={handleCheckboxChange}
        />
        <button className='btn btn-danger mt-3' onClick={()=>deleteTodo(todo.id)}>Delete Todo</button>
      </Card.Footer>
  </Card>
  );
}

export default TodoItem;