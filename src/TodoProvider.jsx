import { useReducer } from 'react'
import { TodoContext } from './TodoContext'

export const TodoProvider = ({ reducer, initialState, children }) => (
  // Хук useReducer(reducer, initialState) принимает 2 аргумента: функцию reducer и начальное состояние.
  // Затем хук возвращает массив из двух элементов: текущее состояние и функцию dispatch.
  // reducer -это исполнитель приказов. dispatch - это передатчик приказов исполнителю.
  <TodoContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </TodoContext.Provider>
)
