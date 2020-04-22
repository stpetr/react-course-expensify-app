import { createStore } from 'redux';

const incrementCount = ({ incrementBy = 1 } = {}) => {
    return {
        type: 'INCREMENT',
        incrementBy
    };
};

const decrementCount = ({ decrementBy = 1 } = {}) => {
    return {
        type: 'DECREMENT',
        decrementBy
    };
};

const setCount = ({ count }) => {
    return {
        type: 'SET',
        count
    };
};

const resetCount = () => {
    return {
        type: 'RESET',
    };
};

const store = createStore((state = { count: 0 }, action) => {
    // console.log('running', action);

    switch (action.type) {
        case 'INCREMENT':
            const incrementBy = (typeof action.incrementBy === 'number') ? action.incrementBy : 1;
            return { 
                count: state.count + incrementBy
            };
        case 'DECREMENT':
            const decrementBy = (typeof action.decrementBy === 'number') ? action.decrementBy : 1;
            return { 
                count: state.count - decrementBy
            };
        case 'SET':
            return { 
                count: action.count
            };
        case 'RESET':
            return { 
                count: 0
            };
        default:
            return state;
    }
});

const unsubscribe = store.subscribe(() => {
    console.log('subscribe', store.getState())
})

// store.dispatch({
//     type: 'INCREMENT',
//     incrementBy: 5
// });

// store.dispatch({
//     type: 'INCREMENT'
//});

store.dispatch(incrementCount({ incrementBy: 5 }))
store.dispatch(incrementCount())

// unsubscribe();

// store.dispatch({
//     type: 'RESET'
//});

store.dispatch(resetCount())

store.dispatch(decrementCount({ decrementBy: 10 }))
store.dispatch(decrementCount())

// store.dispatch({
//     type: 'DECREMENT',
//     decrementBy: 10
// });

// store.dispatch({
//     type: 'DECREMENT'
// });

store.dispatch(setCount({ count: 101 }))