import React from 'react'
import { Footer } from './Footer'
import { TodoList } from './TodoList'
import { useTodo } from '../useTodo'
import { motion } from 'framer-motion'

const getCompletedCount = todos =>
  // здесь todos массив обьектов, мы получили через initialState переданный компоненту через TodoProvider
  // reduce - это метод массива, позволяет выполнить функцию коллбэк над всеми членами массива и вернуть аккум результат
  todos.reduce((count, todo) => (todo.completed ? count + 1 : count), 0) // если задача выполнена, то увеличить счетчик

const MainSection = () => {
  // массив обьектов todos и переменная visibilityFilter приходят через initialState, dispatch возвращает reducer
  const [{ todos, visibilityFilter }, dispatch] = useTodo() // получаем из состояния переменные todos, visibilityFilter
  // и переключатель приказов
  const todosCount = todos.length // подсчитываем длину массива
  const completedCount = getCompletedCount(todos) // получить кол-во выполненных задач
  return (
    <motion.section layout className='main'>
      {todosCount && (
        <span>
          <input
            className='toggle-all'
            type='checkbox'
            defaultChecked={completedCount === todosCount}
          />
          <label
            onClick={() =>
              dispatch({
                type: 'COMPLETE_ALL'
              })}
          />
        </span>
      )}
      <TodoList
        todos={todos}
        visibilityFilter={visibilityFilter}
        setTodos={todos => dispatch({
          type: 'SET_TODOS',
          payload: {
            todos
          }
        })}
      />
      {!!todosCount && (
        <Footer
          completedCount={completedCount}
          activeCount={todosCount - completedCount}
          onClearCompleted={() => {
            dispatch({
              type: 'CLEAR_COMPLETED'
            })
          }}
        />
      )}
    </motion.section>
  )
}

export default MainSection
