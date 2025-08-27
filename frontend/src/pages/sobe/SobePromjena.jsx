import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import SobeService from "../../services/SobeService";
import { useEffect, useState } from "react";

export default function SobePromjena()
{
   const [soba,setSoba] = useState({})
   const navigate = useNavigate()
   const routeParams = useParams()

   async function dohvatiSobu(){
    const odgovor = await SobeService.getBySifra(routeParams.sifra);

    if (odgovor.greska){
        alert(odgovor.poruka)
        return
    }

   }

    useEffect(()=>{
        dohvatiSobu();
    },[])

    async function promjena(soba){
        const odgovor = await SobeService.promjena(routeParams.sifra,soba)
        if(odgovor.greska){
            alert(odgovor.poruka)
            return;
        }
    }


    function obradiSubmit(e){
        e.preventDefault();
        let podaci = new FormData(e.target)

        promjena({
            tipSobe: podaci.get('tipSobe'),
            cijena: parseFloat(podaci.get('cijena')),
            dostupnost: podaci.get('dostupnost'),
            brojSobe: parseFloat(podaci.get('brojSobe'))
            

            //za bool - podaci.get('dostupan')=='on'
            //datum - moment.utc(podaci.get(('datumPokretanja')))

        })
    }


    return(
        <>
        
        Promjena sobe
        
        <hr style={{marginTop: '15px'}} />

        <Form onSubmit={obradiSubmit}>

        <Form.Group controlId="tip sobe">

            <Form.Label>Tip sobe</Form.Label>
            <Form.Control type="text" name="tipSobe" required
            defaultValue = {soba.tipSobe} />
        </Form.Group>

        <Form.Group controlId="cijena">

            <Form.Label>Cijena</Form.Label>
            <Form.Control type="number" name="cijena" step={0.01}
            defaultValue = {soba.cijena}/>
        </Form.Group>

        <Form.Group controlId="dostupnost">

            <Form.Label>Dostupnost</Form.Label>
            <Form.Control type="text" name="dostupnost" required
            defaultValue = {soba.dostupnost}/>
        </Form.Group>

        <Form.Group controlId="broj sobe">

            <Form.Label>Broj sobe</Form.Label>
            <Form.Control type="number" name="brojSobe" required
            defaultValue = {soba.brojSobe}/>

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
            className="siroko">Promjeni sobu</Button>
            </Col>
        </Row>


        </Form>


        </>
    )
}