import React from 'react'
// Контекст - это механизм Реакт позволяющий спускать произвольную величину любому потомку
// Создаем контекст и значение нагрузки по умолчанию undefined

export const TodoContext = React.createContext(undefined)
