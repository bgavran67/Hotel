import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { RouteNames } from "../../constants";
import GostiService from "../../services/GostiService";
import SobeService from "../../services/SobeService";
import Service from "../../services/RezervacijeService";

export default function RezervacijeDodaj(){
    const navigate = useNavigate();

    //fk
    const [gosti, setGosti] = useState([]);
    const [gostSifra, setGostSifra] = useState([]);

    async function dohvatiGoste(){
    const odgovor = await GostiService.get();
    setGosti(odgovor.poruka);
    setGostSifra(odgovor.poruka[0].sifra);
    }

    const [sobe, setSobe] = useState([]);
    const [sobaSifra, setSobaSifra] = useState([]);

    async function dohvatiSobe(){
    const odgovor = await SobeService.get();
    setSobe(odgovor.poruka);
    setSobeSifra(odgovor.poruka[0].sifra);
    }

    useEffect(()=>{
    dohvatiGoste();
    dohvatiSobe();
  },[]);

  async function dodaj(e) {
    const odgovor = await Service.dodaj(e);
    if(odgovor.greska){
      alert(odgovor.poruka);
      return;
    }
    navigate(RouteNames.REZERVACIJA_PREGLED);
  }

  function obradiSubmit(e) {
    e.preventDefault();
     
    const podaci = new FormData(e.target);

    dodaj({
        ukupnaCijena: parseFloat(podaci.get('ukupnaCijena')),
        vrijemeDatumPrijave: moment.utc(podaci.get(('vrijemeDatumPrijave'))),
        vrijemeDatumOdjave: moment.utc(podaci.get(('vrijemeDatumOdjave'))),
        gost: parseInt(gostSifra),
        soba: parseInt(sobaSifra)
    });
  }

  return (
    <>
    Dodavanje nove rezervacije

    <hr style={{marginTop: '15px'}} />

      <Form onSubmit={obradiSubmit}>

        <Form.Label>Ukupna Cijena</Form.Label>
        <Form.Control type="number" step={0.01} name = "ukupnaCijena"></Form.Control>

        <Form.Label>Vrijeme i Datum Prijave</Form.Label>
        <Form.Control type="datetime-local" name="vrijemeDatumPrijave" required  />

        <Form.Label>Vrijeme i Datum Odjave</Form.Label>
        <Form.Control type="datetime-local" name="vrijemeDatumOdjave" required/>

        <Form.Group className='mb-3' controlId='gost'>
            <Form.Label>Gost</Form.Label>
            <Form.Select
            value={gostSifra}
            onChange={(e)=>{setGostSifra(e.target.value)}}
            >
            {gosti && gosti.map((s,index)=>(
              <option key={index} value={s.sifra}>
                {s.ime} {s.prezime}
              </option>
            ))}
            </Form.Select>
          </Form.Group>

        <Form.Group className='mb-3' controlId='soba'>
            <Form.Label>Soba</Form.Label>
            <Form.Select
            value={sobaSifra}
            onChange={(e)=>{setSobaSifra(e.target.value)}}
            >
            {sobe && sobe.map((s,index)=>(
              <option key={index} value={s.sifra}>
                {s.tipSobe} {s.cijena} 
              </option>
            ))}
            </Form.Select>
        <hr style={{marginTop: '15px'}} />

          </Form.Group>

       <hr />
       <Row> 
        <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
              <Link to={RouteNames.REZERVACIJA_PREGLED}
              className="btn btn-danger siroko">
              Odustani
              </Link>
              </Col>
              <Col xs={6} sm={6} md={9} lg={6} xl={6} xxl={6}>
              <Button variant="primary" type="submit" className="siroko">
                  Dodaj rezervaciju
              </Button>
              </Col>
       </Row>

      </Form>
    
    
    
    </>
  )

}