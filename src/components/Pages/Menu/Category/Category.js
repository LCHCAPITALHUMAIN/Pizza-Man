import React from 'react'

import Item from './Item.js/Item'
import SectionTitle from '../../../UI/SectionTitle/SectionTitle'
const divStyle = {
    color: 'blue',
    with:'300px',
    textAlign:"center"
  };
const divStyleSub = {
    color: 'black'
  };  
function Category(props) {
    const { name, items, keyitem } = props

    const itemsDisplay = items.map((subcat, index) => <Item
        key={index}
        name={subcat.name}
        index={index}
        products={subcat.items}
         
    />)
   
   /* const categories = Object.values(items);
    console.log({categories: categories})
    const tbodies = categories.map((categorie, index) => {
        const products = Object.values(categorie.items);
        console.log({products: products})
  
        const categorieName = index === 0 ? <td rowSpan={products.length + 1}>{categorie.name}</td> : null;
       
        return (
            <tbody key={index} className={categorie.name}>
              <tr key={index}>
                  {categorieName}
                  {itemsDisplay}
                </tr>
            </tbody>
          );   
    });*/

    return (
        <>
        <thead>
          <tr>
            <th colSpan="2" style={divStyle}>
                {name}
            </th>
            <th>CT</th>
            <th>PRIX TTC DU CARTON</th>
            <th>PU / TTC</th>
            <th>NB CARTON(S)</th>
          </tr>
        </thead>
        <tbody key={keyitem} >
        {itemsDisplay}
        </tbody>
       
        </>
        
    )
}

export default Category