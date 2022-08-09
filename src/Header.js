import React from 'react'

export default function Header(props) {

    return (
        <div className='header'>{props.date}
            <ul className='list'>
                {props.data.map(([key, value]) => (
                    <li key={key}
                        value={props.data} >{`${key}: ${value}`}</li>
                ))}
            </ul>
        </div>

    )



}


