// вернуть задачи по указанному фильтру
export const getFilteredTodos = (todos, visibilityFilter) => {
  switch (visibilityFilter) {
    case 'Все': // вернуть все задачи
      return todos
    case 'Выполненные': // вернуть все выполненные задачи
      return todos.filter(t => t.completed)
    case 'Активные': // вернуть все активные задачи
      return todos.filter(t => !t.completed)
    default:
      throw new Error(`Unknown filter: ${visibilityFilter}`)
  }
}

export const getCompletedCount = todos => // выдать выполненные задания
  todos.reduce((count, todo) => (todo.completed ? count + 1 : count), 0)
