import React from 'react'

import style from './spinner.module.css'

import PS from '../../../static/img/Spinner/flags-wine.jpg'

function Spinner() {
    return (
        <div className={style.SpinnerContainer}>
            <div className={style.Spinner}>
                <img src={PS} alt="flags-wine" className={`${style.PizzaPart} ${style.PizzaPart1}`} />
                <img src={PS} alt="flags-wine1" className={`${style.PizzaPart} ${style.PizzaPart2}`} />
                <img src={PS} alt="flags-wine2" className={`${style.PizzaPart} ${style.PizzaPart3}`} />
                <img src={PS} alt="flags-wine3" className={`${style.PizzaPart} ${style.PizzaPart4}`} />
            </div>
            <h2 className="mt-3">Loading</h2>
        </div>
    )
}

export default Spinner