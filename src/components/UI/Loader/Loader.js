import React from 'react'

import slice from '../../../static/img/Spinner/flags-wine.jpg'
import style from './loader.module.css'
function Loader() {
    return (
        <div className={style.LoaderBody}>
            <img src={slice} alt="Guigal" className={style.PizzaSlice} />
            <h2 className={style.Text}>Loading</h2>
        </div>
    )
}

export default Loader