import React from 'react'

function Address(props) {
    const { city, country, pinCode, streetName, nom , email, mobile } = props
    return (
        <div>
            <br />
            {nom ?
                <p className="mb-0">Votre Nom ou Entreprise :{nom}</p> : null}
            {streetName ?
                <p className="mb-0">N° de Rue, Rue :{streetName}</p> : null}
             {pinCode ?
                <p className="mb-0">Code Postal: {pinCode}</p> : null}    
            {city ?
                <p className="mb-0">Ville :{city}, {country}</p> : null}
            {mobile ?
                <p className="mb-0">Tél mobile :{mobile}</p> : null}  
            {email ?
                <p className="mb-0">Email : {email}</p> : null}      
           
        </div>
    )
}

export default Address