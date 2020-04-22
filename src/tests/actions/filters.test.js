import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from '../../actions/filters'

test('should setup text filter action object with provided text', () => {
    const action = setTextFilter('Search query')
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: 'Search query'
    })
})

test('should setup text filter action object without text provided', () => {
    const action = setTextFilter()
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: ''
    })
})

test('should setup sort by amount action object', () => {
    const action = sortByAmount()
    expect(action).toEqual({
        type: 'SORT_BY_AMOUNT'
    })
})

test('should setup sort by date action object', () => {
    const action = sortByDate()
    expect(action).toEqual({
        type: 'SORT_BY_DATE'
    })
})

test('should setup set start date action object with provided date', () => {
    const action = setStartDate(1000)
    expect(action).toEqual({
        type: 'SET_START_DATE',
        timestamp: 1000
    })
})

test('should setup set start date action object without provided date', () => {
    const action = setStartDate()
    expect(action).toEqual({
        type: 'SET_START_DATE'
    })
})

test('should setup set end date action object with provided date', () => {
    const action = setEndDate(1000)
    expect(action).toEqual({
        type: 'SET_END_DATE',
        timestamp: 1000
    })
})

test('should setup set end date action object without provided date', () => {
    const action = setEndDate()
    expect(action).toEqual({
        type: 'SET_END_DATE'
    })
})
