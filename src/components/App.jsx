import React from 'react'
import Header from './Header'
import MainSection from './MainSection'
import { reducer } from '../stores/reducer'
import { TodoProvider } from '../TodoProvider'

const initialState = {
  todos: [
    {
      text: 'Задача 1',
      completed: false,
      id: 'b967afe24b23'
    },
    {
      text: 'Задача 2',
      completed: true,
      id: '43286487fhsdjasd'
    }
  ],
  visibilityFilter: 'Все'
}
const App = () => (
  // TodoProvider обеспечивает потомков children данными initialState и reducer - исполнителем приказов
  <TodoProvider initialState={initialState} reducer={reducer}>
    <div>
      <Header />
      <MainSection />
    </div>
  </TodoProvider>
)

export default App
