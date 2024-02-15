import React from "react";
import './styles/locationCard.css'

const LocationCard = ({ location }) => {
    return (
        <div className='location'>
            <h2 className='location__title'>{location?.name}</h2>
            <ul className='location__list'>
                <li className='location__item'>
                    <span>Type:</span>{location?.type}
                </li>
                <li className='location__item'>
                    <span>Dimension:</span>{location?.dimension}
                </li>
                <li className='location__item'>
                    <span>Population:</span>{location?.residents.length}
                </li>
            </ul>
        </div>
    )
}

export default LocationCard