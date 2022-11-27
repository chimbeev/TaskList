// исполнитель приказов,получает состояние и команду по изменению состояния
export const reducer = (state, action) => {
  const { id, text } = action.payload || { id: undefined, text: undefined }
  // action.payload содержит данные-полезную нагрузку которую передаем исполнителю приказа, здесь мы разбираем данные
  const { todos, visibilityFilter } = state // передаем состояние в обьект
  switch (action.type) { // Action.type содержит команду которую надо исполнить
    case 'ADD_TODO': // Добавить задачу
      return {
        todos: [ // добавить в массив обьект
          {
            id: Math.random()
              .toString(16)
              .substring(2),
            completed: false,
            text
          },
          ...todos
          // Синтаксис spread (...) — это новое дополнение в JavaScript ES6. Он принимает итерируемый объект (например, массив)
          // и расширяет его на отдельные элементы. То есть мы расширяем массив
        ],
        visibilityFilter
      }
    case 'DELETE_TODO': // Удаляем задачу
      return {
        todos: todos.filter(todo => todo.id !== id), // filter создает новый массив у которых todo.id не равен id
        visibilityFilter
      }
    case 'EDIT_TODO': // изменение задачи
      return {
        todos: todos.map(todo => (todo.id === id ? { ...todo, text } : todo)), // Перебираем члены массива и если
        // todo.id равен id то добавляем к элементу текст, если нет, то оставляем без изменений элемент массива
        visibilityFilter
      }
    case 'COMPLETE_TODO': // пометить что задача выполнена
      return {
        todos: todos.map(todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo // поменять статус задачи на противоположный
        ),
        visibilityFilter
      }
    case 'COMPLETE_ALL': { // пометить что все задачи выполнены
      const areAllMarked = todos.every(todo => todo.completed) // метод every тестирует каждого члена массива на условие
      // и возвращает true если все задачи выполнены
      const result = {
        todos: todos.map(todo => ({ ...todo, completed: !areAllMarked })),
        visibilityFilter
      }
      console.log(result)
      return result
    }
    case 'CLEAR_COMPLETED':
      return {
        todos: todos.filter(t => t.completed === false),
        visibilityFilter
      }
    case 'CLEAR_ALL':
      return {
        todos: [],
        visibilityFilter
      }
    case 'SET_VISIBILITY':
      return {
        todos: [...todos],
        visibilityFilter: action.payload.visibilityFilter
      }
    case 'SET_TODOS':
      return {
        todos: [...action.payload.todos],
        visibilityFilter
      }

    default:
      return state
  }
}
