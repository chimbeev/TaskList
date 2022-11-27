import React, { useState } from 'react'
import classnames from 'classnames' // библиотека для простого условного объединения имен классов
import { TodoTextInput } from './TodoTextInput'
import { useTodo } from '../useTodo'
import { TimerWatch } from './TimerWatch'
import { motion } from 'framer-motion'

const variants = {
  hidden: {
    opacity: 0
  },
  visible: ({ delay }) => ({
    opacity: 1,
    transition: {
      delay,
      duration: 1
    }
  })
}
// компонент функция которая отвечает за строку с задачей
export const TodoItem = ({ index, todo }) => {
  const [editing, setEditing] = useState(false) // создаем переменную editing в обьекте состояние и функцию
  // setEditing по изменению этой переменной

  const dispatch = useTodo()[1] // подключаем передатчик приказов

  const editTodo = (id, text) =>
    dispatch({
      type: 'EDIT_TODO', // передаем приказ - редактировать
      payload: {
        id,
        text
      }
    })
  const deleteTodo = (id, text) =>
    dispatch({
      type: 'DELETE_TODO',
      payload: {
        id,
        text
      }
    })
  const completeTodo = (id, text) =>
    dispatch({
      type: 'COMPLETE_TODO',
      payload: {
        id,
        text
      }
    })

  const handleDoubleClick = () => setEditing(true)

  const handleSave = (id, text) => {
    if (text.length === 0) {
      deleteTodo(id)
    } else {
      editTodo(id, text)
    }
    setEditing(false)
  }

  const exitFromEdit = () => setEditing(false) // функция позволяет выйти из режима редактирования строки. Передаем
  // ее своему потомку TodoTextInput через проп. В потомке TodoTextInput происходит изменение переменной состояния editing.
  // В результате происходит рендеринг компонента родителя TodoItem И выход из режима редактирования
  return (
    <motion.div
      className={classnames({
        // установить имя класса 'completed editing'  если выполнено условие todo.completed
        completed: todo.completed,
        editing
      })}
      custom={{ delay: (index + 1) * 0.1 }}
      initial='hidden'
      animate='visible'
      exit='hidden'
      variants={variants}
      layoutId={todo.id}
    >
      {editing // если идет редактирование , то сохранить открыть поле ввода и редактирования текста
        ? (
          <TodoTextInput
            todoText={todo.text}
            editing={editing}
            onSave={text => handleSave(todo.id, text)}
            exitFromEdit={exitFromEdit}
          />
          )
        : ( // иначе отображать галочку что работа выполнена и крестик чтобы удалить задачу
          <div className='view'>
            <input
              className='toggle'
              type='checkbox'
              checked={todo.completed}
              onChange={() => completeTodo(todo.id)}
            />
            <label onDoubleClick={handleDoubleClick}>{todo.text}</label>
            <TimerWatch />
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ cursor: 'pointer', scale: 1.5 }}
              type='button'
              className='destroy'
              onClick={() => deleteTodo(todo.id)}
            />
          </div>
          )}
    </motion.div>
  )
}
