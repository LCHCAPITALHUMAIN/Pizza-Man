import React from 'react'

import Item from './Item.js/Item'
import SectionTitle from '../../../UI/SectionTitle/SectionTitle'

const divStyle = {
  with: '300px',
  textAlign: "center"
};
const divCenter = {
  textAlign: "center"
};
function groupItemBy(array, property) {
  var hash = {},
    props = property.split('.');
  for (var i = 0; i < array.length; i++) {
    var key = props.reduce(function (acc, prop) {
      return acc && acc[prop];
    }, array[i]);
    if (!hash[key]) hash[key] = { items: [], name: key };
    hash[key].items.push(array[i]);
  }
  return hash;
}


function Category(props) {
  const { name, items, keyitem } = props


  let categories = Object.values(groupItemBy(items, 'categorie'));

  const itemsDisplay = categories.map((subcat, index) => {
    const idx = index+'_cat';
  return <Item
    key={idx}
    name={subcat.name}
    index={index}
    products={subcat.items}

  />})

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
          <th colSpan="2"
            rowSpan="2" style={divStyle}>
            <SectionTitle>
                {name}
            </SectionTitle>
          </th>
          <th rowSpan="2" style={divCenter}>ct</th>
          <th rowSpan="2" style={divCenter}>Prix ttc <br />carton</th>
          <th rowSpan="2" style={divCenter}>Prix ttc <br /> unité</th>
          <th colSpan="2" style={divCenter}>COMMANDE</th>
        </tr>
        <tr>
          <th>nb Carton</th>
          <th>Prix TTC</th>
        </tr>
      </thead>
      <tbody key={keyitem} >
        {itemsDisplay}
      </tbody>

    </>

  )
}

export default Category