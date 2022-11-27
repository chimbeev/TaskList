import { useContext } from 'react'
import { TodoContext } from './TodoContext'
// Хук useContext вернет нагрузку этого контекста TodoContext
export const useTodo = () => useContext(TodoContext)
