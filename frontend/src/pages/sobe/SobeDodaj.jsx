import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import SobeService from "../../services/SobeService";

export default function SobeDodaj()
{
    const navigate = useNavigate();

    async function dodaj(soba){
        const odgovor = await SobeService.dodaj(soba)
        if(odgovor.greska){
            alert(odgovor.poruka)
            return;
        }
        navigate(RouteNames.SOBA_PREGLED)
    }


    function obradiSubmit(e)
            {
                e.preventDefault();
                let podaci = new FormData(e.target)
                dodaj({

                tipSobe: podaci.get('tipSobe'),
                cijena: parseFloat(podaci.get('cijena')),
                dostupnost: podaci.get('dostupnost'),
                brojSobe: parseFloat(podaci.get('brojSobe'))

                })
            
            }

            //za bool - podaci.get('dostupan')=='on'
            //datum - moment.utc(podaci.get(('datumPokretanja')))
    
    


    return(
        <>
        
        Dodavanje sobe
        
        <Form onSubmit={obradiSubmit}>

        <Form.Group controlId="tip sobe">

            <Form.Label>Tip sobe</Form.Label>
            <Form.Control type="text" name="tipSobe" required></Form.Control>

        </Form.Group>

        <Form.Group controlId="cijena">

            <Form.Label>Cijena</Form.Label>
            <Form.Control type="number" step={0.01} name = "cijena"></Form.Control>

        </Form.Group>

        <Form.Group controlId="dostupnost">

            <Form.Label>Dostupnost</Form.Label>
            <Form.Control type="text" name="dostupnost" required></Form.Control>

        </Form.Group>

        <Form.Group controlId="broj sobe">

            <Form.Label>Broj sobe</Form.Label>
            <Form.Control type="number" name="brojSobe" required></Form.Control>

        <hr style={{marginTop: '15px'}} />

        </Form.Group>

        {/* za datum i vrijeme stavljamo type: date-local
        za bool tip <Form.Check (umjesto control) label="Dostupan" name="Dostupan" /> */}

       <Row className="akcije">
            <Col xs={6} sm={12} md={3} lg={6} xl={6} xxl={6}>
            <Link to={RouteNames.SOBA_PREGLED} 
            className="btn btn-danger siroko">Odustani</Link>
            </Col>
            <Col xs={6} sm={12} md={9} lg={6} xl={6} xxl={6}>
            <Button variant="success"
            type="submit"
            className="siroko">Dodaj sobu</Button>
            </Col>
        </Row>

        </Form>


        </>
    )
}