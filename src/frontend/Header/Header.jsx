import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
export default function Header(){
    return(
        <div className='headerCont'>
            
        <Navbar bg="dark" data-bs-theme="dark">
    <Container>
      <Navbar.Brand >Chemical App</Navbar.Brand>
      <Nav className="me-auto">
        
      </Nav>
    </Container>
  </Navbar>

    </div>

    );
}