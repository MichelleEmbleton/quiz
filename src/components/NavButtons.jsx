import React from 'react';
import './nav-buttons.scss';

const NavButtons = ({ onChange, onReturn }) => (

    <div className="nav-btns">



        <button
            className="nav-btn nav-btn-left"
            onClick={() => onChange('-')}
        >
            <span className="arrow"> &#10094; </span>
            prev
        </button>




        <button
            className="nav-btn nav-btn-return"
            onClick={onReturn}
        >
            return to categories
        </button>




        <button
            className="nav-btn nav-btn-right"
            onClick={() => onChange('+')}
        >
            next
            <span className="arrow"> &#10095; </span>
        </button>



    </div>
)

export default NavButtons;

