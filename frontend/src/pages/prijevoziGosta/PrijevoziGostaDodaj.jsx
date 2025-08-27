import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { RouteNames } from "../../constants";
import GostiService from "../../services/GostiService";
import Service from "../../services/PrijevoziGostaService";

export default function PrijevoziGostaDodaj() {
  const navigate = useNavigate();

  const [gosti, setGosti] = useState([]);
  const [gostSifra, setGostSifra] = useState(0);

  async function dohvatiGoste(){
    const odgovor = await GostiService.get();
    setGosti(odgovor.poruka);
    setGostSifra(odgovor.poruka[0]?.sifra || 0);
  }

  useEffect(()=>{
    dohvatiGoste();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  async function dodaj(podaci) {
    const odgovor = await Service.dodaj(podaci);
    if(odgovor.greska){
      alert(odgovor.poruka);
      return;
    }
    navigate(RouteNames.PRIJEVOZ_GOSTA_PREGLED);
  }

  function obradiSubmit(e) {
    e.preventDefault();

    const podaci = new FormData(e.target);

    dodaj({
      datumPolaska: moment.utc(podaci.get('datumPolaska')).format(),
      datumOdlaska: moment.utc(podaci.get('datumOdlaska')).format(),
      vrstaPrijevoza: podaci.get('vrstaPrijevoza'),
      lokacijaPolazista: podaci.get('lokacijaPolazista'),
      dostupnost: podaci.get('dostupnost'),
      brojPutnika: parseFloat(podaci.get('brojPutnika')),
      gostSifra: parseInt(gostSifra)
    });
  }

  return (
    <>
      <h4>Dodavanje novog prijevoza gosta</h4>
      <Form onSubmit={obradiSubmit}>
        <Form.Label>Datum Polaska</Form.Label>
        <Form.Control type="date-local" name="datumPolaska" />

        <Form.Label>Datum Odlaska</Form.Label>
        <Form.Control type="date-local" name="datumOdlaska"  />

        <Form.Label>Vrsta Prijevoza</Form.Label>
        <Form.Control type="text" name="vrstaPrijevoza"  />

        <Form.Label>Lokacija Polazišta</Form.Label>
        <Form.Control type="text" name="lokacijaPolazista"  />

        <Form.Label>Dostupnost</Form.Label>
        <Form.Control type="text" name="dostupnost"  />

        <Form.Label>Broj Putnika</Form.Label>
        <Form.Control type="number" name="brojPutnika"  />

        <Form.Group className='mb-3' controlId='gost'>
          <Form.Label>Gost</Form.Label>
          <Form.Select
            value={gostSifra}
            onChange={(e)=>{setGostSifra(e.target.value)}}
          >
            {gosti && gosti.map((s,index)=>(
              <option key={index} value={s.sifra}>
                {s.naziv}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <hr />
        <Row className="akcije">
          <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
            <Link to={RouteNames.PRIJEVOZ_GOSTA_PREGLED}
              className="btn btn-danger siroko">
              Odustani
            </Link>
          </Col>
          <Col xs={6} sm={6} md={9} lg={6} xl={6} xxl={6}>
            <Button variant="primary" type="submit" className="siroko">
              Dodaj novi prijevoz gosta
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}