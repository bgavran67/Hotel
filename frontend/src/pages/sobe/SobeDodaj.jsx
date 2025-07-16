import { Button, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RouteNames } from "../../constants";
import { MdPadding } from "react-icons/md";

export default function SobeDodaj()
{
    return(
        <>
        
        Dodavanje sobe
        
        <Form>

        <Form.Group controlId="tip sobe">

            <Form.Label>Tip sobe</Form.Label>
            <Form.Control type="text" name="tip_sobe" required></Form.Control>

        </Form.Group>

        <Form.Group controlId="cijena">

            <Form.Label>Cijena</Form.Label>
            <Form.Control type="number" name="cijena" step={0.01}></Form.Control>

        </Form.Group>

        <Form.Group controlId="dostupnost">

            <Form.Label>Dostupan</Form.Label>
            <Form.Control type="text" name="dostupnost" required></Form.Control>

        </Form.Group>

        <Form.Group controlId="broj sobe">

            <Form.Label>Broj sobe</Form.Label>
            <Form.Control type="number" name="broj_sobe" required></Form.Control>

        <hr style={{marginTop: '15px'}} />

        </Form.Group>

        {/* za datum i vrijeme stavljamo type: date-local
        za bool tip <Form.Check (umjesto control) label="Dostupan" name="Dostupan" /> */}

        <Row> 
            <Col xs={6} s={6} m={3} lg={2} xl={6} xxl={6}>
            <Link to={RouteNames.SOBA_PREGLED}
            className="btn btn-danger">Odustani</Link>
            </Col>

            <Col xs={6} s={6} m={3} lg={2} xl={6} xxl={6}>
            <Button variant="success" type="submit">
                Dodaj sobu
            </Button>
            </Col>

        </Row>

        </Form>


        </>
    )
}