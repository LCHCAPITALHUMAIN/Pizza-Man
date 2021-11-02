import React from 'react'
import { Link } from 'react-router-dom'

import Button from '../../UI/Button/Button'

import style from './home.module.css'

import BG from '../../../static/img/HomeBg/diaporama-01_n.jpeg'

function Home() {
    return (
        <>
            <div
                className={`pt-5 ${style.BodyContainer}`}
                style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${BG}')` }}>
                <div className="container mt-5 pt-5">
                    <h2 className={style.H2}>Guigal</h2>
                   
                    <Link to="/">
                        <Button>
                            Commander maintenant
                        </Button>
                    </Link>
                </div>
                <div className={style.LandscapeOverlay} />
            </div>
        </>
    )
}

export default Home