import React from 'react'
import { connect } from 'react-redux'
import numeral from 'numeral'
import selectVisibleExpenses from '../selectors/expenses'
import selectExpensesTotal from '../selectors/expenses-total'

export const ExpensesSummary = ({ expenseCount, expenseTotal }) => {
    const expenseWord = expenseCount === 1 ? 'expense' : 'expenses'
    const expenseTotalFormatted = numeral(expenseTotal / 100).format('$0,0.00')
    return (
        <div>
            <p>
                Viewing { expenseCount } { expenseWord } totalling { expenseTotalFormatted }.
            </p>
        </div>
    )
}

const mapStateToProps = (state) => {
    const visibleExpenses = selectVisibleExpenses(state.expenses, state.filters)
    return {
        expenseCount: visibleExpenses.length,
        expenseTotal: selectExpensesTotal(visibleExpenses)
    }
}

export default connect(mapStateToProps)(ExpensesSummary)