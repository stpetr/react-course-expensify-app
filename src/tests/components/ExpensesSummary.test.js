import React from 'react'
import { shallow } from 'enzyme'
import ExpenseSummary, { ExpensesSummary } from '../../components/ExpensesSummary'
import expenses from '../fixtures/expenses'
import filters from '../fixtures/filters'

test('should render expenses summary with one expense', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={1} expenseTotal={10500} />)
    expect(wrapper).toMatchSnapshot()
})

test('should render expenses summary with multiple expenses', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={8} expenseTotal={168050} />)
    expect(wrapper).toMatchSnapshot()
})