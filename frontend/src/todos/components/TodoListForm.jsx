import React, { useState, useEffect, useMemo } from 'react'
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import AddIcon from '@mui/icons-material/Add'
import { debounce } from '../../utils/common-functions.util'
import TodoRequests from '../../requests/todo.requests'
import { Todo } from './Todo'

const [debouncedUpdateTodoRequest, flushUpdateTodoDebounce] = debounce(TodoRequests.updateTodo, 500)

export const TodoListForm = ({ todoList }) => {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    const getTodos = async () => {
      const todos = await TodoRequests.getTodos(todoList._id)

      if (todos) {
        setTodos(todos)
      }
    }

    getTodos()
  }, [todoList._id])

  const allCompleted = useMemo(
    () => (todos.every((todo) => todo.completed) && todos.length) || false,
    [todos]
  )

  const addTodo = async () => {
    const newTodo = await TodoRequests.addTodo(todoList._id)

    if (newTodo) {
      setTodos([...todos, newTodo])
    }
  }

  const deleteTodo = (index) => async () => {
    const success = await TodoRequests.deleteTodo(todoList._id, todos[index]._id)

    if (success) {
      setTodos([
        // immutable delete
        ...todos.slice(0, index),
        ...todos.slice(index + 1),
      ])
    }
  }

  const updateTodo =
    (index) =>
    async (updates, shouldDebounce = false) => {
      const updatedTodo = { ...todos[index], ...updates }

      setTodos([
        // immutable update
        ...todos.slice(0, index),
        updatedTodo,
        ...todos.slice(index + 1),
      ])

      if (shouldDebounce) {
        await debouncedUpdateTodoRequest(todoList._id, updatedTodo._id, updates)
      } else {
        return TodoRequests.updateTodo(todoList._id, updatedTodo._id, updates)
      }
    }

  return (
    <Card sx={{ margin: '0 1rem' }}>
      <CardContent>
        <Typography
          component='h2'
          sx={{ display: 'flex', textDecoration: allCompleted ? 'line-through' : 'none' }}
        >
          {todoList.title}
          {allCompleted && <CheckIcon sx={{ marginLeft: '16px' }} />}
        </Typography>
        <form style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          {todos.map((todo, index) => (
            <Todo
              key={index}
              todo={todo}
              number={index + 1}
              updateTodo={updateTodo(index)}
              deleteTodo={deleteTodo(index)}
              flushUpdateTodoDebounce={flushUpdateTodoDebounce}
            />
          ))}
          <CardActions>
            <Button type='button' color='primary' onClick={addTodo}>
              Add Todo <AddIcon />
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}
