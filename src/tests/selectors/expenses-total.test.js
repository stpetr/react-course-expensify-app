import selectExpensesTotal from '../../selectors/expenses-total'
import expenses from '../fixtures/expenses'

test('should return zero if no expenses', () => {
    const res = selectExpensesTotal([])
    expect(res).toBe(0)
})

test('should correctly add up a single expense', () => {
    const amount = 150
    const expense = {
        amount
    }
    const res = selectExpensesTotal([expense])
    expect(res).toBe(amount)
})

test('should correctly add up two expenses', () => {
    const amount1 = 150
    const amount2 = 149
    const expenses = [
        { amount: amount1 },
        { amount: amount2 },
    ]
    const res = selectExpensesTotal(expenses)
    expect(res).toBe(amount1 + amount2)
})