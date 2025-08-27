import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GOOGLE_MAPS_API, RouteNames } from "../../constants";
import { useEffect, useState } from "react";
import GostiService from "../../services/GostiService";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';


export default function GostiPromjena()
{

    const [gost, setGost] = useState({})
   const navigate = useNavigate()
   const routeParams = useParams()

    useEffect(()=>{
        dohvatiGosta();
    },[])


   const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API
  });

  // Prikazujemo poruku o grešci ako postoji
  if (loadError) {
    return <div>Greška pri učitavanju karte</div>;
  }

  // Prikazujemo poruku o učitavanju dok skripta nije spremna
  if (!isLoaded) {
    return <div>Učitavanje...</div>;
  }


const containerStyle = {
  width: '20vw',
  height: '50vh'
};

const center = {
  lat: -3.745,
  lng: -38.523,
}

        

   async function dohvatiGosta(){
    const odgovor = await GostiService.getBySifra(routeParams.sifra);

    if (odgovor.greska){
        alert(odgovor.poruka)
        return
    }

   }

   

    async function promjena(gost){
        const odgovor = await GostiService.promjena(routeParams.sifra,gost)
        if(odgovor.greska){
            alert(odgovor.poruka)
            return;
        }
    }


     function odradiSubmit(e){
        e.preventDefault();
        let podaci = new FormData(e.target)

        promjena({
            ime: podaci.get('ime'),
            prezime: podaci.get('prezime'),
            email: podaci.get('email'),
            telefon: podaci.get('telefon'),
            adresa: podaci.get('adresa')

            //za bool - podaci.get('dostupan')=='on'
            //datum - moment.utc(podaci.get(('datumPokretanja')))

        })
    }

    return(
        <>
        
        Promjena gosta
         <Row>
        <Col key='1' sm={12} lg={6} md={6}>
         <Form onSubmit={odradiSubmit}>

        <Form.Group controlId="ime">

            <Form.Label>Ime</Form.Label>
            <Form.Control type="text" name="ime" required
            defaultValue = {gost.ime} />
        </Form.Group>

        <Form.Group controlId="prezime">

            <Form.Label>Prezime</Form.Label>
            <Form.Control type="text" name="prezime" required
            defaultValue = {gost.prezime} />
        </Form.Group>

        <Form.Group controlId="email">

            <Form.Label>Email</Form.Label>
            <Form.Control type="text" name="email" required
            defaultValue = {gost.email} />
        </Form.Group>

        <Form.Group controlId="broj sobe">

            <Form.Label>Telefon</Form.Label>
            <Form.Control type="text" name="telefon" required
            defaultValue = {gost.telefon} />

        <hr style={{marginTop: '15px'}} />

        </Form.Group>

        <Form.Group controlId="adresa">

            <Form.Label>Adresa</Form.Label>
            <Form.Control type="text" name="adresa" required
            defaultValue = {gost.adresa} />

        </Form.Group>

        {/* za datum i vrijeme stavljamo type: date-local
        za bool tip <Form.Check (umjesto control) label="Dostupan" name="Dostupan" /> */}

        <Row className="akcije">
            <Col xs={6} sm={12} md={3} lg={6} xl={6} xxl={6}>
            <Link to={RouteNames.GOST_PREGLED} 
            className="btn btn-danger siroko">Odustani</Link>
            </Col>
            <Col xs={6} sm={12} md={9} lg={6} xl={6} xxl={6}>
            <Button variant="success"
            type="submit"
            className="siroko">Promjeni gosta</Button>
            </Col>
        </Row>


        </Form>
        </Col>
        <Col key='2' sm={12} lg={6} md={6}>
        
            <GoogleMap zoom={10} 
            mapContainerStyle={containerStyle}
            center={center}>
               
           
            </GoogleMap>

        </Col>
        </Row>
        


        </>
    )
}