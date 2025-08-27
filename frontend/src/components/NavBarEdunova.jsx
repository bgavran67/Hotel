import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import { RouteNames } from '../constants';

export default function NavBarEdunova() {


    const navigate = useNavigate()

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
        <Navbar.Brand className='ruka' onClick={()=>navigate(RouteNames.HOME)}>Hotel</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
  
            <NavDropdown title="Programi" id="basic-nav-dropdown">
              <NavDropdown.Item 
                onClick={()=>navigate(RouteNames.SOBA_PREGLED)}>
                Sobe
              </NavDropdown.Item>

              <NavDropdown.Item 
                onClick={()=>navigate(RouteNames.PRIJEVOZ_GOSTA_PREGLED)}>
                Prijevozi gosta
              </NavDropdown.Item>

            <NavDropdown.Item 
                onClick={()=>navigate(RouteNames.GOST_PREGLED)}>
                Gosti
              </NavDropdown.Item>

            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}