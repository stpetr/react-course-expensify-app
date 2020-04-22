import { createStore, combineReducers } from 'redux'
import { v1 as uuid } from 'uuid'

// ADD_EXPENSE
const addExpense = (
    {
        description = '',
        note = '',
        amount = 0,
        createdAt = 0
    } = {}
) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
})

const removeExpense = ({ id }) => ({
    type: 'REMOVE_EXPENSE',
    id
})

const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
})

// Expenses reducer

const expensesReducerDefaultState = []
const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ]
        case 'REMOVE_EXPENSE':
            return state.filter(({ id }) => id !== action.id)
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    }
                }

                return expense
            })
        default:
            return state
    }
}

// Filters reducer actions generations

const setTextFilters = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
})

const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
})

const sortByDate = () => ({
    type: 'SORT_BY_DATE'
})

const setStartDate = (timestamp) => ({
    type: 'SET_START_DATE',
    timestamp
})

const setEndDate = (timestamp) => ({
    type: 'SET_END_DATE',
    timestamp
})

// Filters reducer

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date', // date or amount
    startDate: undefined,
    endDate: undefined
}

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            }
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            }
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            }
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.timestamp
            }
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.timestamp
            }
        default:
            return state
    }
}

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate === 'number' ? (expense.createdAt >= startDate) : true
        const endDateMatch = typeof endDate === 'number' ? (expense.createdAt <= endDate) : true
        const textMatch = typeof text === 'string' ? expense.description.toLowerCase().includes(text.toLocaleLowerCase()) : true

        return startDateMatch && endDateMatch && textMatch
    }).sort((a, b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? -1 : 1
        }

        if (sortBy === 'amount') {
            return a.amount < b.amount ? -1 : 1
        }
    })
}

// Store creation

const store = createStore(combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
}))

store.subscribe(() => {
    const state = store.getState()
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
    
    console.log(visibleExpenses)
})

const expense1 = store.dispatch(addExpense({ description: 'Rent', amount: 100, createdAt: 2000 }))
const expense2 = store.dispatch(addExpense({ description: 'Coffee', amount: 200, createdAt: 1000 }))

store.dispatch(sortByAmount())

// store.dispatch(removeExpense({ id: expense1.expense.id }))
// store.dispatch(editExpense(expense2.expense.id, { amount: 500 } ))

store.dispatch(setTextFilters('FEE'))
store.dispatch(setTextFilters())

// store.dispatch(sortByAmount())
// store.dispatch(sortByDate())

store.dispatch(setStartDate(125))
store.dispatch(setStartDate())
store.dispatch(setEndDate(900))

const demoState = {
    expenses: [{
        id: 'idstring',
        description: 'Flat rent',
        note: 'Another month payment',
        amout: 54500,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'date', // date or amount
        startDate: undefined,
        endDate: undefined
    }
}
