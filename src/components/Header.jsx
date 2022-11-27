import React from 'react'
import { TodoTextInput } from './TodoTextInput'
import { useTodo } from '../useTodo'
import { motion } from 'framer-motion'

// функция компонент ответственный за отображение Header
const Header = () => {
  const [, dispatch] = useTodo() // подключаем переключатель приказов ?

  return (
    <header className='header'>
      <motion.h1 // отображение анимации в заголовке
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 1,
          ease: 'easeInOut',
          delay: 0.2
        }}
      >
        Список задач
      </motion.h1>
      <TodoTextInput // отображение поля ввода компонентом TodoTextInput
        newTodo // передаем компоненту пропы
        onSave={text => { // передаем проп функцию
          if (text.length !== 0) {
            dispatch({ // отдаем приказ
              type: 'ADD_TODO', // передаем приказ что делать
              payload: { text } // передаем reducer нагрузку с данными
            })
          }
        }}
        placeholder='Что надо сделать?'
      />
    </header>
  )
}

export default Header
