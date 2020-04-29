import expenses from '../fixtures/expenses'
import expensesReducer from '../../reducers/expenses'

test('should set default state', () => {
    const state = expensesReducer(undefined, { type: '@@INIT' })
    expect(state).toEqual([])
})

test('should remove expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual([expenses[0], expenses[2]])
})

test('should not remove expenses if id not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '-1'
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual(expenses)
})

test('should add expense', () => {
    const action = {
        type: 'ADD_EXPENSE',
        expense: {
            description: 'Rent',
            note: 'Some note',
            amount: 100500,
            createdAt: 3005
        }
    }
    const state = expensesReducer(expenses, action)
    expect(state.length).toBe(expenses.length + 1)
})

test('should edit expense', () => {
    const updates = {
        description: 'New description',
        note: 'No note',
        amount: 100500,
        createdAt: -3005
    }
    const action = {
        type: 'EDIT_EXPENSE',
        id: '1',
        updates
    }
    const state = expensesReducer(expenses, action)
    expect(state[0]).toEqual({ ...updates, id: '1' })
})

test('should not edit expense if expense not found', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: -1,
        updates: {
            description: 'Something weird'
        }
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual(expenses)
})

test('should set expenses', () => {
    const action = {
        type: 'SET_EXPENSES',
        expenses: [expenses[1]]
    }

    const state = expensesReducer(expenses, action)
    expect(state).toEqual([expenses[1]])
})