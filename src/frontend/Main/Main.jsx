import React from 'react';
import './UI.css';
import Table from 'react-bootstrap/Table';
import SearchBar from './SearchBar';
import Button from 'react-bootstrap/Button';
import { ArrowRight, Box } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
//prideti punktus vartotojui sekmingai prisijungus
function Main() {

    return (
        <div className='mainContainer'>
          <SearchBar/>
            <Table striped bordered hover>
        <thead>
        <tr>
          <th>#</th>
          <th>Molecular formula</th>
          <th>IUPAC name</th>
          <th>Molecular weight</th>
        </tr>
      </thead>

            </Table>

        </div>
        
    );
}

export default Main;