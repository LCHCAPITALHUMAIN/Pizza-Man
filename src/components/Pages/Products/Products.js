import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import * as actions from '../../../store/actions/actions'
import { Redirect } from 'react-router'
import Spinner from '../../UI/Spinner/Spinner'
import Category from './Category/Category'
import Cart from './Cart/Cart'
import PageTitle from '../../UI/PageTitle/PageTitle'
import commonStyle from '../../../static/style/common.module.css'
import BG from '../../../static/img/Wine_Daniel.png'

function Products(props) {
    const { products, initProducts, getAddress, user } = props;

    useEffect(() => {
        if (!products || products.length === 0) { initProducts() }
    }, [initProducts, products]);

    useEffect(() => {
        getAddress(user)
    }, [user, getAddress])
  
    const groupItemBy = (array, property) =>{
        let hash = {},
            props = property.split('.');
        for (let i = 0; i < array.length; i++) {
            const key = props.reduce(function (acc, prop) {
                return acc && acc[prop];
            }, array[i]);
            if (!hash[key]) hash[key] = { items: [], name: key };
            hash[key].items.push(array[i]);
        }
        return hash;
    }

    if (products && products.length > 0) {
        let grouped = Object.values(groupItemBy(products, 'type'));
        const display = grouped.map((categoryData, index) => {
            const idx = index + '_type';
            return <Category
                name={categoryData.name}
                items={categoryData.items}
                key={idx} />
        }
        );
        return (
            <>
                {!props.user ? <Redirect to="/login" /> : null}

                <div className={`container mt-5 pt-2 ${commonStyle.PageBody}`}
                    style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.7)), url('${BG}')` }}>

                    <PageTitle>
                        Sélection
                    </PageTitle>

                    <div className="row">
                        <div className="col-lg-9">
                            {display}
                        </div>
                        <div className="col-lg-3 mb-5">
                            <Cart />
                        </div>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <><Spinner /></>
        )
    }

}


const mapStateToProps = state => ({
    products: state.products.products,
    isLoading: state.products.isLoading,
    error: state.products.error,
    user: state.auth.user
})


const mapDispatchToProps = dispatch => ({
    initProducts: () => dispatch(actions.initProducts()),
    getAddress: (user) => dispatch(actions.getAddress(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Products)