import React from 'react';
import icon from '../Icons/chemistry-svgrepo-com.svg'

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './Header.css'
export default function Header(){
    return(
        <div className='headerCont'>
          


        <Navbar  className='navBg'>
        <img src={icon}/>



    <Container className='naBg'>
      <h1>Chemical app</h1>
      <Nav >
      </Nav>
    </Container>
  </Navbar>

    </div>

    );
}