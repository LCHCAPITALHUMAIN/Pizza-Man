import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'

import Button from '../../UI/Button/Button'
import Address from '../../UI/Address/Address'
import AddressForm from './AddressForm/AddressForm'
import Spinner from '../../UI/Spinner/Spinner'
import RadioButton from '../../UI/RadioButton/RadioButton'
import PageTitle from '../../UI/PageTitle/PageTitle'
import SectionTitle from '../../UI/SectionTitle/SectionTitle'
import ErrorDisplay from '../../Util/ErrorDisplay/ErrorDisplay'
import Input from '../../UI/Input/Input'
import Select from '../../UI/Select/Select'
import * as actions from '../../../store/actions/actions'
import commonStyle from '../../../static/style/common.module.css'
import checkoutStyle from './checkout.module.css'


const placeOrderHandler = (event, address, modeSelected, data, placeOrder, placeOrderFail, modeFactured, modeDeliverySelected, deliveryAdress, comment) => {
    event.preventDefault()

    data.modeSelected = modeSelected ? modeSelected : '';
    data.modeFactured = modeFactured ? modeFactured : '';
    data.modeDeliverySelected = modeDeliverySelected ? modeDeliverySelected : '';
    data.deliveryAdress = deliveryAdress ? deliveryAdress : '';
    data.comment = comment ? comment : '';
    console.log(data)
    if (address && modeSelected) {
        placeOrder(data)
    } else if (!address && !modeSelected) {
        placeOrderFail("Please make sure that all fields are filled")
    } else if (!address) {
        placeOrderFail("Please fill in the address field")
    } else {
        placeOrderFail("Please select the mode of payment field")
    }
}

function Checkout(props) {
    const order = props.cart.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        itemPrice: item.price,
        price: item.quantity * item.price
    }))
    const data = {
        order: order,
        address: props.address,
        uid: props.user && props.user.uid,
        modeFactured: props.modeFactured,
        modeDeliverySelected: props.modeDeliverySelected,
        comment: props.comment,
        deliveryAdress: props.deliveryAdress,
        deliveryDate: props.deliveryDate,
        price: {
            price: props.price,
            gst: props.gst,
            total: props.price + props.gst
        }
    }

    const { placeOrderInitialize, getAddress, user } = props
    const [addressFormShown, setAddressFormShown] = useState(false)
    const [modeSelected, setModeSelected] = useState(false)
    const [modeFactured, setModeFactured] = useState(false)
    const [modeDeliverySelected, setModeDeliverySelected] = useState("Argenteuil")
    const [deliveryAdress, setDeliveryAdress] = useState('')
    const [comment, setComment] = useState('')



    useEffect(() => {
        getAddress(user)
    }, [user, getAddress])
    useEffect(() => {
        return () => placeOrderInitialize()
    }, [placeOrderInitialize])

    if (props.orderPlaced) {
        props.clearCart()
    }

    return (
        <div className={`container mt-5 pt-2 ${commonStyle.PageBody}`}>
            {props.isOrderLoading ?
                <Spinner /> :
                <>
                    {props.orderPlaced ?
                        <div>
                            <PageTitle>
                                Order Placed
                            </PageTitle>
                            <h1 className="display-6 mt-4">
                                :)
                            </h1>
                        </div>
                        : <>
                            {props.cart.length === 0 ?
                                <Redirect to="./" /> : null}
                            {!props.user ?
                                <Redirect to="./login" /> : null}
                            <div>
                                <span>LMPV Wineclub</span>
                                <br />
                                4 Boulevard Vercingetorix,  <br />
                                95100 Argenteuil, France <br />
                                LMPVwineclub@gmail.com
                            </div>
                            <PageTitle>
                                Bon de Commande
                            </PageTitle>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Date</th>
                                        <th scope="col">N° de bon</th>
                                        <th scope="col">Fournisseur</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    <tr key="1_A">
                                        <td>{new Date().toLocaleDateString()}</td>
                                        <td></td>
                                        <td>LMPVWineclub</td>
                                    </tr>

                                </tbody>
                                <thead>
                                    <tr>
                                        <th scope="col" colSpan="3">Mode de récupération</th>

                                    </tr>
                                </thead>
                                <tbody>

                                    <tr key="2_A">
                                        
                                        <td >
                                            <Select val={modeDeliverySelected} onChangeFunc={setModeDeliverySelected} /></td>
                                        <td colSpan="2">
                                            {modeDeliverySelected === "Livraison" ? <Input
                                                val={deliveryAdress}
                                                onChangeFunc={setDeliveryAdress}
                                                placeholder="Autre adresse de Récupération"
                                            /> : null}

                                        </td>
                                    </tr>

                                </tbody>
                            </table>

                            <div className="my-4">
                                <SectionTitle>
                                    Destinataire
                                </SectionTitle>
                                {props.isAddressLoading ?
                                    <Spinner /> :
                                    <>
                                        <Address {...props.address} />

                                        {addressFormShown ?
                                            <AddressForm {...props.address} hideAddressForm={() => setAddressFormShown(false)} />
                                            : props.addressError === "Merci d'ajouter une adresse" ?
                                                <>
                                                    <ErrorDisplay>
                                                        {props.addressError}
                                                    </ErrorDisplay>
                                                    <span className="my-3 d-inline-block">
                                                        <Button onClick={() => setAddressFormShown(true)}>
                                                            Ajouter un destinataire
                                                        </Button>
                                                    </span>
                                                </> :
                                                <span className="my-3 d-inline-block">
                                                    <Button onClick={() => setAddressFormShown(true)}>
                                                        Mettre à jour le destinataire
                                                    </Button>
                                                </span>
                                        }
                                    </>}
                            </div>
                            <div className="my-4">
                                <SectionTitle>
                                    Articles
                                </SectionTitle>
                                <div className="row">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th scope="col">Nom</th>
                                                <th scope="col">Quantité</th>
                                                <th scope="col">Prix</th>
                                                <th scope="col">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {props.cart.map(item => (
                                                <tr key={item.id}>
                                                    <td>{item.name}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>{item.price}</td>
                                                    <td>{item.quantity * item.price}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tfoot className={checkoutStyle.totalLabelAlignRight}>
                                            <tr>
                                                <td colSpan="3" >Sous Total</td>
                                                <td >
                                                    <span className={checkoutStyle.totalValueAlignRight}>{props.price}</span></td>
                                            </tr>
                                            <tr>
                                                <td colSpan="3" >Tax</td>
                                                <td ><span className={checkoutStyle.totalValueAlignRight}>20%</span></td>
                                            </tr>
                                            <tr>
                                                <td colSpan="3" >TVA</td>
                                                <td ><span className={checkoutStyle.totalValueAlignRight}>{props.gst}</span></td>
                                            </tr>
                                            <tr>
                                                <td colSpan="3" ></td>
                                                <td><span className={checkoutStyle.totalOrderValueAlignRight}>{(props.price + props.gst).toFixed(2)}</span></td>
                                            </tr>
                                        </tfoot>
                                    </table>

                                </div>
                            </div>
                            <div className="my-4">

                                <form>
                                    <SectionTitle>
                                        Choix du mode de paiement
                                    </SectionTitle>
                                    <div className="row">
                                        <div className="col-12 mt-4">
                                            <RadioButton name="ModeOfPayment" code="virement" isRequired clickFunc={() => setModeSelected('virement')}>
                                                Chèque
                                            </RadioButton>
                                            <RadioButton name="ModeOfPayment" code="cheque" isRequired clickFunc={() => setModeSelected('cheque')}>
                                                Virement
                                            </RadioButton>
                                        </div>
                                        <div className="col-12 mt-4">
                                            Avez-vous besoin d'une facture ?
                                            <RadioButton name="factured" code="yes" isRequired clickFunc={() => setModeFactured(true)}>
                                                Oui
                                            </RadioButton>
                                            <RadioButton name="factured" code="no" isRequired clickFunc={() => setModeFactured(false)}>
                                                Non
                                            </RadioButton>
                                        </div>
                                        <div className="col-12 mt-4">
                                            <textarea
                                                className="form-control"
                                                id="exampleFormControlTextarea1"
                                                rows="3"
                                                placeholder="Commentaire"
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                            ></textarea>
                                        </div>
                                        <div className="col-12">
                                            {props.orderError ?
                                                <ErrorDisplay>
                                                    {props.orderError}
                                                </ErrorDisplay>
                                                : null}
                                        </div>
                                        <div className="col-12 my-3">
                                            <Button type="button" onClick={(event) => placeOrderHandler(event, props.address, modeSelected, data, props.placeOrder, props.placeOrderFail,
                                                modeFactured, modeDeliverySelected, deliveryAdress, comment)}>
                                                Confirmer la commande
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </>}
                </>}
        </div>
    )
}

const mapStateToProps = state => ({
    cart: state.cart.cart,
    price: state.cart.totalPrice,
    gst: state.cart.gst,
    user: state.auth.user,
    address: state.address.address,
    addressError: state.address.error,
    isAddressLoading: state.address.isLoading,
    orderPlaced: state.order.orderPlaced,
    isOrderLoading: state.order.isLoading,
    orderError: state.order.error
})

const mapDispatchToProps = dispatch => ({
    placeOrderInitialize: () => dispatch(actions.placeOrderInitialize()),
    placeOrder: (data) => dispatch(actions.placeOrder(data)),
    placeOrderFail: (error) => dispatch(actions.placeOrderFail(error)),
    getAddress: (user) => dispatch(actions.getAddress(user)),
    clearCart: () => dispatch(actions.clearCart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)