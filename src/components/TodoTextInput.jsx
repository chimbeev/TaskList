import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
// Объявляем компонент-функцию для обработки поля ввода
export const TodoTextInput = ({
  todoText, // объявляем пропы, здесь строка
  placeholder, // требуется строка
  editing, // требуется тип boolean
  newTodo, // требуется тип boolean означает что это новая задача
  onSave, // требуется обязательно функция
  exitFromEdit // требуется обязательно функция которая делает выход из режима редактирования
}) => {
  const [text, setText] = useState(todoText || '')
  //  Создаем переменную text в составе состояния и назначаем начальное значение  todoText || ''

  const handleSubmit = e => { // После ввода Enter переносит введенную строку ниже в строку
    const inputText = e.target.value.trim() // trim позволяет убрать пробелы с обоих концов строки
    if (e.which === 13) { // Было e.which, поменял на e.key так как e.which deprecated. Если нажата клавиша Enter
      onSave(inputText) // запиываем в проп onSave значение введенного текста. Функцию onSave мы получли от Header
      // В ней мы отдаем приказ, что если строка не пустая , то добавить строку в список задач
      if (newTodo) { // очищает поле ввода после переноса вниз
        setText('')
      }
    }
  }

  const handleChange = e => { // При вводЕ данных в поле ввода сохраняем ввод в переменную состояния text
    setText(e.target.value)
  }

  const handleBlur = e => { //  вызывается функция handleBlur если фокус покинул поле ввода
    if (!newTodo) { // Если вышли из строки нажатием мыши на другую строку(потеря фокуса),
      exitFromEdit() // вызываем функцию, которая выводит строку из режима редактирования путем изменения переменной
      // editing из состояния компонента-родителя TodoItem. Эту функцию получили от родителя TodoItem через проп.
    }
  }

  return (
    <input
      // className={classnames({ edit: editing, 'new-todo': newTodo })}
      className='new-todo'
      type='text'
      placeholder={placeholder}
      autoFocus
      value={text}
      onBlur={handleBlur} //  вызывается функция handleBlur если фокус покинул поле ввода
      onChange={handleChange} //  вызывается функция handlechange если поле ввода изенились данные и фокус покинул поле ввода
      onKeyDown={handleSubmit} // При каждом нажатии клавиши вызывается функция handleSubmit
    />
  )
}

TodoTextInput.propTypes = { // Используется дополнительная библиотека PropTypes для обеспечения контроля типов значений,
  // передаваемых с пропами
  onSave: PropTypes.func.isRequired, // Здесь указываем что у пропа onSave требуется функция и причем её указывать обязательно
  exitFromEdit: PropTypes.func,
  todoText: PropTypes.string, // пропу odoText требуется строка
  placeholder: PropTypes.string,
  editing: PropTypes.bool,
  newTodo: PropTypes.bool
}
