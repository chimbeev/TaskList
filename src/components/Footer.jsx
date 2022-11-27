import React from 'react'
import PropTypes from 'prop-types'
import { Link as FilterLink } from './Link'
const FILTER_TITLES = ['Все', 'Активные', 'Выполненные']

export const Footer = ({ activeCount, completedCount, onClearCompleted }) => (
  <footer className='footer'>
    <span className='todo-count'>
      <strong>{activeCount || 'No'}</strong>{' '}
      {activeCount === 1 ? 'задача осталась' : ''}
      {activeCount > 1 && activeCount < 5 ? 'задачи остались' : ''}
      {activeCount >= 5 && activeCount <= 9 ? 'задач осталось' : ''}
      {activeCount === 0 ? '0 задач осталось' : ''}
    </span>
    <ul className='filters'>
      {FILTER_TITLES.map(filter => (
        <li key={filter}>
          <FilterLink filter={filter}>{filter}</FilterLink>
        </li>
      ))}
    </ul>
    {!!completedCount && (
      <button
        type='button'
        className='clear-completed'
        onClick={onClearCompleted}
      >
        Убрать выполненные
      </button>
    )}
  </footer>
)

Footer.propTypes = {
  completedCount: PropTypes.number.isRequired,
  activeCount: PropTypes.number.isRequired,
  onClearCompleted: PropTypes.func.isRequired
}
