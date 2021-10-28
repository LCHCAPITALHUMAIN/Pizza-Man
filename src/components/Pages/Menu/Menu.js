import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import * as actions from '../../../store/actions/actions'

import Spinner from '../../UI/Spinner/Spinner'
import Category from './Category/Category'
import Cart from './Cart/Cart'
import PageTitle from '../../UI/PageTitle/PageTitle'
import ErrorDisplay from '../../Util/ErrorDisplay/ErrorDisplay'
import axios from '../../../axios/axios'
import commonStyle from '../../../static/style/common.module.css'

function Menu(props) {
    const { menu, error, isLoading, initMenu } = props;
    const [post, setPost] = useState([])
    useEffect(() => {
        if (!menu.menu || menu.menu.length === 0) { initMenu() }


    }, [initMenu, menu]);

    useEffect(() => {
        axios.get("../menu.json")
            .then(response => (
                setPost(response.data)

            ))

    }, []);

    const display2 = Array.from(menu).map((categoryData) => {
        return <Category
            name={categoryData.name}
            items={categoryData.items}
            key={categoryData.name} />;
    });


    if (props.menu.menu && props.menu.menu.length > 0) {
        const display = props.menu.menu.map((categoryData, index) => {
            const idx = index+'_cat';
            return <Category
                name={categoryData.name}
                items={categoryData.categorie}
                key={idx} />
            }
        );

        return (
            <>
                <div className={`container mt-5 pt-2 ${commonStyle.PageBody}`}>
                    <PageTitle>
                        Sélection
                    </PageTitle>
                    <div className="row">
                        <div className="col-lg-8">
                            <table>
                            <thead>
                            <tr>
                                <th colSpan="4">Bon de commande</th>
                            </tr>
                            </thead>
                                {display}
                            </table>
                        </div>
                        <div className="col-lg-4 mb-5">
                            <Cart />
                        </div>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <>wait</>
        )
    }

}


const mapStateToProps = state => ({
    menu: state.menu.menu,
    isLoading: state.menu.isLoading,
    error: state.menu.error
})


const mapDispatchToProps = dispatch => ({
    initMenu: () => dispatch(actions.initMenu())
})

export default connect(mapStateToProps, mapDispatchToProps)(Menu)