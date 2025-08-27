import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import GostiService from "../../services/GostiService";

export default function GostiDodaj()
{
    const navigate = useNavigate();

    async function dodaj(gost){
        const odgovor = await GostiService.dodaj(gost)
        if(odgovor.greska){
            alert(odgovor.poruka)
            return;
        }
        navigate(RouteNames.GOST_PREGLED)
    }


    function obradiSubmit(e)
            {
                e.preventDefault();
                let podaci = new FormData(e.target)
                dodaj({

                ime: podaci.get('ime'),
                prezime: podaci.get('prezime'),
                email: podaci.get('email'),
                telefon: podaci.get('telefon'),
                adresa: podaci.get('adresa'),

                })
            
            }

            //za bool - podaci.get('dostupan')=='on'
            //datum - moment.utc(podaci.get(('datumPokretanja')))
    
    


    return(
        <>
        
        Dodavanje gosta
        
        <Form onSubmit={obradiSubmit}>

        <Form.Group controlId="ime">

            <Form.Label>Ime</Form.Label>
            <Form.Control type="text" name="ime" required></Form.Control>

        </Form.Group>

       <Form.Group controlId="prezime">

            <Form.Label>Prezime</Form.Label>
            <Form.Control type="text" name="prezime" required></Form.Control>

        </Form.Group>


        <Form.Group controlId="email">

            <Form.Label>Email</Form.Label>
            <Form.Control type="text" name="email" required></Form.Control>

        </Form.Group>


        <Form.Group controlId="telefon">

            <Form.Label>Telefon</Form.Label>
            <Form.Control type="text" name="telefon" required></Form.Control>

        </Form.Group>


        <Form.Group controlId="adresa">

            <Form.Label>Adresa</Form.Label>
            <Form.Control type="text" name="adresa" required></Form.Control>

        </Form.Group>

        {/* za datum i vrijeme stavljamo type: date
        za bool tip <Form.Check (umjesto control) label="Dostupan" name="Dostupan" /> */}

       <Row className="akcije">
            <Col xs={6} sm={12} md={3} lg={6} xl={6} xxl={6}>
            <Link to={RouteNames.GOST_PREGLED} 
            className="btn btn-danger siroko">Odustani</Link>
            </Col>
            <Col xs={6} sm={12} md={9} lg={6} xl={6} xxl={6}>
            <Button variant="success"
            type="submit"
            className="siroko">Dodaj gosta</Button>
            </Col>
        </Row>

        </Form>


        </>
    )
}