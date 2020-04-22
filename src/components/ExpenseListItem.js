import React from 'react'
import { Link } from 'react-router-dom' 

export const ExpenseListItem = ({ id, description, amount, createdAt, dispatch }) => (
    <li>
        <p>{amount} &ndash; {createdAt}</p>
        <Link to={`/edit/${id}`}>
            <h3>{description}</h3>
        </Link>
    </li>
)

export default ExpenseListItem