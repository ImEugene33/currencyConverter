import React from 'react'

export default function (props) {
    return (
        <div className='currency'>
            <input
                className='input'
                type='number'
                value={props.amount}
                onChange={props.onChangeAmount} />
            <select
                onChange={props.onChangeCurrency}
                value={props.selectCurrency}>
                {props.currencyOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}
