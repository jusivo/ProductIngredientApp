import React from 'react';
import './UI.css';
import { useState } from 'react';
import SearchBar from './SearchBar';
import Button from 'react-bootstrap/Button';
//prideti punktus vartotojui sekmingai prisijungus
function Main() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

    return (
        <div className='mainContainer'>
          <SearchBar/>
        </div>
        
    );
}

export default Main;