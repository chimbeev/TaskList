import React, { useState, useRef } from 'react'
import 'bulma/css/bulma.css' // поменяли таблицу стилей. Используем css framework Bulma

export const TimerWatch = () => {
  const [timer, setTimer] = useState(0) // Обьявляем новую переменную timer в обьекте Состояние и назначаем функцию
  // для изменения этой переменной
  const [isActive, setIsActive] = useState(false) // isActive нужна что таймер активе или нет
  const [isPaused, setIsPaused] = useState(false) // isPaused нужна чтобы увидеть что таймер на паузе или нет
  const [startTime, setStartTime] = useState() // переменная будет хранить время начала задачи
  const [endTime, setEndTime] = useState() // переменная будет хранить время окончания задачи
  const countRef = useRef(null) // useRef возвращает изменяемый ref-объект, свойство .current которого
  // инициализируется переданным аргументом (initialValue). Возвращённый объект будет сохраняться в течение всего времени жизни компонента.
  // useRef помогает нам получить или контролировать связь с любыи элементом
  const taskTime = useRef(null)

  const handleStart = () => { // Начинает отсчет времени и увеличивает его до нажатия кнопки reset или pause
    // start button logic here
    setIsActive(true) // Задача стартовала - активна
    const startTime = (new Date()).toLocaleString()
    setStartTime(startTime) // сохраняем время старта задачи
    setEndTime('')
    setIsPaused(true) // Можно нажать кнопку Пауза
    countRef.current = setInterval(() => { // setInterlval запускается до тех пор пока мы не остановим. Ему
      // требуется callback и time в миллисекундах. Мы сохраняем timerId в переменной countRef.current, и теперь
      // можем её использовать в других функциях
      setTimer((timer) => timer + 1) // Переменную состояния setTimer увеличиваем на 1
    }, 1000)
  }

  const handlePause = () => {
    // Pause button logic here
    clearInterval(countRef.current)// При нажатии Pause мы будем останавливать таймер, не сбрасывая и изменять состояние
    // isPaused На значение false
    setIsPaused(false)
  }

  const handleResume = () => {
    // Resume button logic here
    setIsPaused(true)
    countRef.current = setInterval(() => { // При нажатии resume мы снова стартуем таймер с паузы и изменяем isPaused
      // на значение true
      setTimer((timer) => timer + 1)
    }, 1000)
  }

  const handleReset = () => {
    // Reset button logic here Нажатие кнопки Reset будет сбрасывать все на начальные значения
    clearInterval(countRef.current)
    setIsActive(false)
    setIsPaused(false)
    setTimer(0) // сбрасываем значение счетчика
    const endTime = (new Date()).toLocaleString()
    setEndTime(endTime) // сохраняем время окончания задачи
    taskTime.current = ((endTime - startTime) * 1000) / 60 // получаем продолжительность задачи в минутах
  }

  const formatTime = () => { // Данная функция возвращает время в  виде 00:00:00
    const getSeconds = `0${(timer % 60)}`.slice(-2)
    const minutes = `${Math.floor(timer / 60)}`
    const getMinutes = `0${minutes % 60}`.slice(-2)
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)
    return `${getHours} : ${getMinutes} : ${getSeconds}`
  }

  return (
    <div className='timerWatch'>
      <div className='timeCounter' style={{ display: 'flex', justifyContent: 'left', flexDirection: 'row' }}>
        <p className='is-size-7' style={{ marginLeft: '50px' }}>{formatTime()}</p> {/* here we will show timer */}
        <p className='is-size-7' style={{ marginLeft: '20px' }}>{startTime}</p>
        <p className='is-size-7' style={{ marginLeft: '20px' }}>{endTime}</p>
        <p className='is-size-7' style={{ marginLeft: '20px' }}>{taskTime.current}</p>
      </div>
      <div className='buttons' style={{ display: 'flex', justifyContent: 'right', flexDirection: 'row' }}>
        {
            !isActive && !isPaused
              ? <button className='button is-small has-background-success' style={{ marginLeft: '120px' }} onClick={handleStart}>Начать</button>
              : (
                  isPaused
                    ? <button className='button is-small has-background-success' style={{ marginLeft: '20px' }} onClick={handlePause}>Пауза</button>
                    : <button className='button is-small is-black' style={{ marginLeft: '20px' }} onClick={handleResume}>Продолжить</button>
                )
        }
        <button className='button is-small is-danger' style={{ marginLeft: '20px' }} onClick={handleReset} disabled={!isActive}>Остановить</button>
      </div>
    </div>
  )
}
