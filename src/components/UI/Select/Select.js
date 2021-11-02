import React from 'react'

import style from './select.module.css'

function Select(props) {
    const { onChangeFunc, val } = props
    const onChangeHandler = event => onChangeFunc(event.target.value)

    return (
        <select value={val} onChange={onChangeHandler}
        className={style.Input}>            
        <option value="Argenteuil">Récupération a Argenteuil</option>
        <option value="Livraison">Livraison à Domicile</option>
        <option value="pointRelais1">pointRelais1</option>
        <option value="pointRelais2">pointRelais1</option>
        </select>
    )
}
export default Select
