import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSelector , useDispatch } from 'react-redux';
import { Create_Todo,Toggle_Todo,Delete_Todo } from "./actions";

function TodoForm({ addTodo, user }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Create a new Todo object and set its fields (e.g., dateCreated, complete).
  //   // Add the new Todo to the list of Todos.
  //   const email = user;
  //    const parts = email.split("@");
  //   const autherName = parts[0];

  //   addTodo({
  //     title,
  //     description,
  //     author:autherName,
  //     dateCreated:Date.now(),
  //     complete:false
  //   });
  //   // Reset form fields.
  //   setTitle('');
  //   setDescription('');
  // };



   // redux code 
   const dispatch = useDispatch();



  const handleAddTodoForm = (e) => {
    e.preventDefault();
    const email = user;
     const parts = email.split("@");
    const autherName = parts[0];

    const addTodoList ={
      title,
      description,
      author:autherName,
      dateCreated:Date.now(),
      complete:false
    }

    dispatch(Create_Todo(addTodoList))
    // Reset form fields.
    setTitle('');
    setDescription('');
  };

  return (
    <Form onSubmit={handleAddTodoForm} className='d-flex flex-column gap-3'>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          as="textarea"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>
      <div>
        <Button variant="primary"  type='submit'>
          Add Todo
        </Button>
      </div>
    </Form>
  );
}

export default TodoForm;