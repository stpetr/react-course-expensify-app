import selectExpenses from '../../selectors/expenses'
import moment from 'moment'
import expenses from '../fixtures/expenses'

test('should filter expenses by text value', () => {
    const filters = {
        text: 'e',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    }
    const result = selectExpenses(expenses, filters)
    expect(result).toEqual([expenses[1], expenses[2]])
})

test('should filter by start date', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: moment(0),
        endDate: undefined
    }
    const result = selectExpenses(expenses, filters)
    expect(result).toEqual([expenses[0], expenses[2]])
})

test('should filter by end date', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: moment(0)
    }
    const result = selectExpenses(expenses, filters)
    expect(result).toEqual([expenses[1], expenses[0]])
})

test('should sort by date', () => {
    const filters = {
        text: '',
        sortBy: 'date'
    }
    const result = selectExpenses(expenses, filters)
    expect(result).toEqual([expenses[1], expenses[0], expenses[2]])
})

test('should sort by amount', () => {
    const filters = {
        text: '',
        sortBy: 'amount'
    }
    const result = selectExpenses(expenses, filters)
    expect(result).toEqual([expenses[0], expenses[2], expenses[1]])
})