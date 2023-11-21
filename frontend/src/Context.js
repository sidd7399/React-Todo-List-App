import React, { createContext, useReducer, useContext, useEffect, useState } from 'react';
import axios from 'axios';
const BASE_URL = 'http://localhost:1234';

// Define initial state
const initialState = {
  todos: [],
  user: null,
  token: null,
};

// Define context
const TodoContext = createContext();

// Define actions
const CREATE_TODO = "CREATE_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const DELETE_TODO = "DELETE_TODO";
const INITIALIZE_TODOS = "INITIALIZE_TODOS";
const REGISTER_USER = "REGISTER_USER";
const LOGIN_USER = "LOGIN_USER";
const LOGOUT_USER = "LOGOUT_USER";

// Define context reducer
const todoReducer = (state, action) => {
  switch (action.type) {
    case INITIALIZE_TODOS:
      return { ...state, todos: action.payload };
    case CREATE_TODO:
      return { ...state, todos: [...state.todos, action.payload] };
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? { ...todo, complete: !todo.complete } : todo
        ),
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case REGISTER_USER:
      return { ...state, user: action.payload.user, token: action.payload.token };
    case LOGIN_USER:
      return { ...state, user: action.payload.user, token: action.payload.token };
    case LOGOUT_USER:
      return { ...state, user: null, token: null, todos: [] };
    default:
      return state;
  }
};

// Define context provider
const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(BASE_URL+'/todos', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      dispatch({ type: INITIALIZE_TODOS, payload: response.data });
    } catch (error) {
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      // fetchData();

    if (localStorage.token) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [localStorage.getItem('token')]);

  const createTodo = async (payload) => {
    try {
      const response = await axios.post(BASE_URL+'/todos', payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      });
      dispatch({ type: CREATE_TODO, payload: response.data });
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  const toggleTodo = async (payload) => {
    try {
      await axios.patch(
        BASE_URL+`/todos/${payload.id}`,
        {
          complete: payload.complete,
          completedDate: payload.complete ? Date.now() : null,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      dispatch({ type: TOGGLE_TODO, payload });

      fetchData();
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const deleteTodo = async (payload) => {
    try {
      await axios.delete(BASE_URL+`/todos/${payload}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      dispatch({ type: DELETE_TODO, payload });
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const register = async (payload) => {
    try {
      const response = await axios.post(BASE_URL+'/register', payload);
      dispatch({ type: REGISTER_USER, payload: { user: response.data.user, token: response.data.accessToken } });
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  const login = async (payload) => {
    try {
      const response = await axios.post(BASE_URL+'/login', payload);
      dispatch({ type: LOGIN_USER, payload: { user: response.data.user, token: response.data.accessToken } });
      localStorage.setItem('token', response.data.accessToken);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const logout = () => {
    dispatch({ type: LOGOUT_USER, payload: { user: null, token: null } });
    localStorage.removeItem('token');
  };

  return (
    <TodoContext.Provider
      value={{ state, loading, createTodo, toggleTodo, deleteTodo, register, login, logout }}
    >
      {children}
    </TodoContext.Provider>
  );
};

// Define custom hook to use the context
const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};

export { TodoProvider, useTodoContext };