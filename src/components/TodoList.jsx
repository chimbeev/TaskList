import React from 'react'
import { TodoItem } from './TodoItem'
import { getFilteredTodos } from '../stores/util' // вернуть задачи по указанному фильтру
import { Reorder } from 'framer-motion' // применяется библиотека reorder для создания перемещаемого списка (create drag-to-reorder lists)
// мышкой можно переносить элементы списка

export const TodoList = ({ todos, visibilityFilter, setTodos }) => (
  <>
    <Reorder.Group className='todo-list' axis='y' values={todos} onReorder={setTodos}>
      {getFilteredTodos(todos, visibilityFilter).map((todo, index) => (
        <Reorder.Item key={todo.id} value={todo}>
          <TodoItem index={index} todo={todo} />
        </Reorder.Item>
      ))}
    </Reorder.Group>
  </>
)
