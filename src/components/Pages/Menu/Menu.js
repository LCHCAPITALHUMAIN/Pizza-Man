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
function Menu(props) {
    const { menu, initMenu, getAddress, user } = props;
    
    useEffect(() => {
        
        if (!menu || menu.length === 0) { initMenu() }


    }, [initMenu, menu]);

    useEffect(() => {
        getAddress(user)
    }, [user, getAddress])

    function groupItemBy(array, property) {
        var hash = {},
           props = property.split('.');
        for (var i = 0; i < array.length; i++) {
           var key = props.reduce(function(acc, prop) {
              return acc && acc[prop];
           }, array[i]);
           if (!hash[key]) hash[key] = { items: [], name: key };
           hash[key].items.push(array[i]);
        }
        return hash;
     }
     
     let grouped = Object.values(groupItemBy(menu, 'type'));
   
    if (grouped && grouped.length > 0) {
        const display = grouped.map((categoryData, index) => {
            const idx = index+'_type';
            // console.log(categoryData);
            return <Category
                name={categoryData.name}
                items={categoryData.items}
                key={idx} />
            }
        );
        // console.log(props.user)   
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
    menu: state.menu.menu,
    isLoading: state.menu.isLoading,
    error: state.menu.error,
    user: state.auth.user
})


const mapDispatchToProps = dispatch => ({
    initMenu: () => dispatch(actions.initMenu()),
    getAddress: (user) => dispatch(actions.getAddress(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Menu)