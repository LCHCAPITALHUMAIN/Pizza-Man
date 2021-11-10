import React, { useState } from 'react'
import { connect } from 'react-redux'

import Input from '../../../UI/Input/Input'
import ErrorDisplay from '../../../Util/ErrorDisplay/ErrorDisplay'
import Button from '../../../UI/Button/Button'
import * as BtnTypes from '../../../UI/Button/types'

import * as actions from '../../../../store/actions/actions'

function AddressForm(props) {
    const { streetName, city, pinCode, user, hideAddressForm, address,
    nom, prenom,email,phoneNumber,society,tva } = props

    const [addressStreetName, setStreetName] = useState(streetName || "")
    const [addressPhoneNumber, setPhoneNumber] = useState(phoneNumber || "")
    const [addressSociety, setSociety] = useState(society || "")
    const [addressTva, setTva] = useState(tva || "")
    const [addressCity, setCity] = useState(city || "")
    const [addressPinCode, setPinCode] = useState(pinCode || "")
    const [addressNom, setAddressNom] = useState(nom || "")
    const [addressPrenom, setAddressPrenom] = useState(prenom || "")
    const [addressEmail, setAddressEmail] = useState(email || "")

    const updateHandler = () => {
        const updatedAddress = {
            streetName: addressStreetName,
            city: addressCity,
            pinCode: addressPinCode,
            nom: addressNom,
            prenom: addressPrenom,
            email: addressEmail,
            phoneNumber: addressPhoneNumber,
            society: addressSociety,
            tva: addressTva
        }
        if (
            
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
            <label for="lastname">Raison sociale: </label>
            <Input
                val={addressSociety}
                onChangeFunc={setSociety}
                placeholder="Raison sociale"
            />
            </div>
            <div>
            <label for="lastname">Numéro de téléphone: </label>
            <Input
                val={addressPhoneNumber}
                onChangeFunc={setPhoneNumber}
                placeholder="Numéro de téléphone:"
            />
            </div>
            <div>
            <label for="lastname">N° de TVA: </label>
            <Input
                val={addressTva}
                onChangeFunc={setTva}
                placeholder="N° de TVA"
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