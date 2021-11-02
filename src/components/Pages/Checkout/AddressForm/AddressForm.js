import React, { useState } from 'react'
import { connect } from 'react-redux'

import Input from '../../../UI/Input/Input'
import ErrorDisplay from '../../../Util/ErrorDisplay/ErrorDisplay'
import Button from '../../../UI/Button/Button'
import * as BtnTypes from '../../../UI/Button/types'

import * as actions from '../../../../store/actions/actions'

function AddressForm(props) {
    const { streetName, city, country, pinCode, user, hideAddressForm, address,
    nom, prenom,email } = props

    const [addressStreetName, setStreetName] = useState(streetName || "")
    const [addressCity, setCity] = useState(city || "")
    const [addressCountry, setCountry] = useState(country || "")
    const [addressPinCode, setPinCode] = useState(pinCode || "")
    const [addressNom, setAddressNom] = useState(nom || "")
    const [addressPrenom, setAddressPrenom] = useState(prenom || "")
    const [addressEmail, setAddressEmail] = useState(email || "")

    const updateHandler = () => {
        const updatedAddress = {
            streetName: addressStreetName,
            city: addressCity,
            country: addressCountry,
            pinCode: addressPinCode,
            nom: addressNom,
            prenom: addressPrenom,
            email: addressEmail
        }
        if (
            addressStreetName.length >= 8 &&
            addressCity.length >= 4 &&
            addressCountry.length >= 4 &&
            addressPinCode.length >= 5 &&
            addressNom.length >= 5 &&
            addressPrenom.length >= 5 &&
            addressEmail.length >= 5) {
            props.addAddress(user, updatedAddress, address ? false : true)
            hideAddressForm()
        } else {
            props.addAddressFail("Entrer une adresse email valide")
        }
    }

    return (
        <div>
            <div>
            <label for="lastname">Email: </label>
            <Input
                val={addressEmail}
                onChangeFunc={setAddressEmail}
                placeholder="Email"
            />
            </div>
            <div>
            <label for="Nom">Nom: </label>
            <Input
                val={addressNom}
                onChangeFunc={setAddressNom}
                placeholder="Nom"
            />
            </div>
            <div>
            <label for="Prénom">Prénom: </label>
            <Input
                val={addressPrenom}
                onChangeFunc={setAddressPrenom}
                placeholder="Prénom"
            /></div>
            <div>
            <label for="Adresse">Adresse: </label>
            <Input
                val={addressStreetName}
                onChangeFunc={setStreetName}
                placeholder="Adresse"
            /></div>
            <div>
            <label for="Code Postal">Code Postal: </label>
            <Input
                val={addressPinCode}
                onChangeFunc={setPinCode}
                placeholder="Code Postal"
            /></div>
            <div>
            <label for="Ville">Ville: </label>
            <Input
                val={addressCity}
                onChangeFunc={setCity}
                placeholder="Ville"
            /></div>
            <div>
            <label for="Pays">Pays: </label>
            <Input
                val={addressCountry}
                onChangeFunc={setCountry}
                placeholder="Pays"
            /></div>
            
            {props.error && props.error !== "Aucune adresse enregistrée" ?
                <ErrorDisplay>
                    {props.error}
                </ErrorDisplay>
                : null}
            <span className="my-2 mr-2">
                <Button onClick={hideAddressForm} type={BtnTypes.SECONDARY}>
                    Annuler
            </Button>
            </span>
            <span className="my-2 ml-2">
                <Button onClick={updateHandler}>
                    Mettre à jour
                </Button>
            </span>
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.auth.user,
    address: state.address.address,
    error: state.address.error
})

const mapDispatchToProps = dispatch => ({
    addAddress: (user, address, isNew) => dispatch(actions.addAddress(user, address, isNew)),
    addAddressFail: (error) => dispatch(actions.addAddressFail(error))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddressForm)