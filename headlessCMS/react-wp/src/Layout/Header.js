import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios'

const Header = () => {

    const [menuItem, setMenuItems] = useState([])

    useEffect(() => {
        async function fetchData() {
          
          const response = await axios.get('/wp-json/wp/v2/menu')
          const items = await response.data;
          setMenuItems(items)
        }
        fetchData();
      }, []);
    return (
        <>
           {menuItem.map((item, i) => (
           <li key={i}>
             <Link to={item.title}>{item.title}</Link>
           </li>
           ))}
        </>
    )
}

export default Header
