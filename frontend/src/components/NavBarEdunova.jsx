import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL, RouteNames } from '../constants';

export default function NavBarEdunova() {


    const navigate = useNavigate();


     function OpenSwaggerURL(){
        window.open(BACKEND_URL + "/swagger/index.html", "_blank")
      }


  return (
    <>
    <Navbar expand="lg" className="bg-body-tertiary">
        <Navbar.Brand className='ruka' 
        onClick={()=>navigate(RouteNames.HOME)}>Hotel</Navbar.Brand>
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

            <NavDropdown.Item 
                onClick={()=>navigate(RouteNames.REZERVACIJA_PREGLED)}>
                Rezervacije
              </NavDropdown.Item>


            </NavDropdown>
            <Nav.Link  onClick={()=>OpenSwaggerURL()}>Swagger</Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
    </>
  )
}