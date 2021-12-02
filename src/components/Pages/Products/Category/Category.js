import React from 'react'

import Item from './Item.js/Item'
import SectionTitle from '../../../UI/SectionTitle/SectionTitle'
import commonStyle from '../../../../static/style/common.module.css'
// import {Table, Thead, Tbody, Tr, Th, Td} from 'react-super-responsive-table'
// import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

const divStyle = {
  with: '300px',
  textAlign: "center"
};
const divCenter = {
  textAlign: "center",
  fontWeight: "bold"
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
  const { name, items, keyitem } = props;
  let categories = Object.values(groupItemBy(items, 'categorie'));

  const itemsDisplay = categories.map((subcat, index) => {
    const idx = index + '_cat';
    return <Item
      key={idx}
      name={subcat.name}
      index={index}
      products={subcat.items}

    />
  })

  return (
    <table className={`container mt-5 pt-2 ${commonStyle.CommandTable}`} key='1'>
      <thead>
        <tr>
          <th colSpan="2"
            rowSpan="2" style={divStyle}>
            <SectionTitle>
              {name}
            </SectionTitle>
          </th>
          <th rowSpan="2" style={divCenter}>ct</th>
          <th rowSpan="2" style={divCenter}>Prix ttc <br />du carton</th>
          <th rowSpan="2" style={divCenter}>PU / TTC</th>
          <th colSpan="2" style={divCenter}>COMMANDE</th>
        </tr>
        <tr>
          <th>nb Carton</th>
          <th>Total TTC</th>
        </tr>
      </thead>
      <tbody key={keyitem} >
        {itemsDisplay}
      </tbody>
    </table>




  )
}

export default Category