import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'
import ExpenseForm from '../../components/ExpenseForm'
import expenses from '../fixtures/expenses'

test('should render ExpenseForm correctly', () => {
    const wrapper = shallow(<ExpenseForm />)
    expect(wrapper).toMatchSnapshot()
})

test('should render ExpenseForm with expense data', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} />)
    expect(wrapper).toMatchSnapshot()
})

test('should render error for invalid form data', () => {
    const expense = {
        description: ''
    }
    const wrapper = shallow(<ExpenseForm expense={expense} />)
    wrapper.find('form').simulate('submit', { preventDefault: () => {} })
    expect(wrapper.state('error').length).toBeGreaterThan(0)
    expect(wrapper.find('.expense-form__error').length).toBe(1)
    expect(wrapper).toMatchSnapshot()
})

test('should set description on input change', () => {
    const value = 'New description value'
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('input').at(0).simulate('change', {
        target: { value }
    })
    expect(wrapper.state('description')).toBe(value)
})

test('should set note on textarea change', () => {
    const value = 'New note value'
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('textarea').simulate('change', {
        target: { value }
    })
    expect(wrapper.state('note')).toBe(value)
})

test('should set amount if valid input', () => {
    const value = '23.50'
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    })
    expect(wrapper.state('amount')).toBe(value)
})

test('should not set amount if invalid input', () => {
    const value = '12.122'
    const wrapper = shallow(<ExpenseForm />)
    const initialValue = wrapper.state('amount')
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    })
    expect(wrapper.state('amount')).toBe(initialValue)
})

test('should call onSubmit prop for valid form submission', () => {
    const onSubmitSpy = jest.fn()
    const expense = expenses[1]
    const wrapper = shallow(<ExpenseForm expense={expenses[1]} onSubmit={onSubmitSpy} />)
    wrapper.find('form').simulate('submit', { preventDefault: () => {} })
    expect(wrapper.state('error')).toBe('')
    expect(onSubmitSpy).toHaveBeenCalledWith({
        description: expense.description,
        amount: expense.amount,
        note: expense.note,
        createdAt: expense.createdAt
    })
})

test('should set new date on date change', () => {
    const now = moment()
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('#createdAtControl').prop('onDateChange')(now)
    expect(wrapper.state('createdAt')).toEqual(now)
})

test('should set calendar focus on change', () => {
    const focused = true
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('#createdAtControl').prop('onFocusChange')({ focused })
    expect(wrapper.state('calendarFocused')).toBe(focused)
})