import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Button, Col, Form, Row } from "react-bootstrap";
import moment from "moment";
import Service from "../../services/PrijevoziGostaService";
import GostiService from "../../services/GostiService";
import { RouteNames } from "../../constants";

export default function PrijevoziGostaPromjena(){
    const navigate = useNavigate();
    const routeParams = useParams();

    //dodajemo fk
    const [gosti, setGosti] = useState([]);
    const [gostSifra, setGostSifra] = useState(0);

    const [prijevozGosta, setPrijevozGosta] = useState({});

    async function dohvatiGoste() {
        const odgovor = await GostiService.get();
        setGosti(odgovor.poruka);
        setGostSifra(odgovor.poruka[0].sifra)
    }

    //nastavljamo za prijevoz g.
    async function dohvatiPrijevoziGosta() {
        const odgovor = await Service.getBySifra(routeParams.sifra);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        let prijevozGosta = odgovor.poruka;
        prijevozGosta.datumPolaska=moment(prijevozGosta.datumPolaska).format('YYYY-MM-DD')
        prijevozGosta.datumOdlaska=moment(prijevozGosta.datumOdlaska).format('YYYY-MM-DD')
        
        setPrijevozGosta(prijevozGosta);
        setGostSifra(prijevozGosta.gostSifra)
    }     

    async function dohvatiInicijalnePodatke() {
      await dohvatiGoste();
        await dohvatiPrijevoziGosta();
        
    }

    useEffect(()=>{
        dohvatiInicijalnePodatke();
    },[]);
    
    async function promjena(e) {
        const odgovor = await Service.promjena(routeParams.sifra,e);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        navigate(RouteNames.PRIJEVOZ_GOSTA_PREGLED);
    }


    function obradiSubmit(e){
    e.preventDefault();

    const podaci = new FormData(e.target);

    promjena({
        datumPolaska: moment.utc(podaci.get(('datumPolaska'))).format('YYYY-MM-DD'),
        datumOdlaska: moment.utc(podaci.get(('datumOdlaska'))).format('YYYY-MM-DD'),
        vrstaPrijevoza: podaci.get('vrstaPrijevoza'),
        lokacijaPolazista: podaci.get('lokacijaPolazista'),
        dostupnost: podaci.get('dostupnost'),
        brojPutnika: parseFloat(podaci.get('brojPutnika')),
        gostSifra: parseInt(gostSifra)
    });
    }


    return(
      <>
        Promjena prijevoza gostiju

        <hr style={{marginTop: '15px'}} />
        
          <Form onSubmit={obradiSubmit}>
            <Form.Label>Datum Polaska</Form.Label>
            <Form.Control type="date" name="datumPolaska" required defaultValue={prijevozGosta.datumPolaska}/>
            
            <Form.Label>Datum Odlaska</Form.Label>
            <Form.Control type="date" name="datumOdlaska" required defaultValue={prijevozGosta.datumOdlaska}/>
            
            <Form.Label>Vrsta Prijevoza</Form.Label>
            <Form.Control type="text" name="vrstaPrijevoza" required defaultValue={prijevozGosta.vrstaPrijevoza}/>
            
            <Form.Label>Lokacija Polazišta</Form.Label>
            <Form.Control type="text" name="lokacijaPolazista" required defaultValue={prijevozGosta.lokacijaPolazista}/>
            
            <Form.Label>Dostupnost</Form.Label>
            <Form.Control type="text" name="dostupnost" required defaultValue={prijevozGosta.dostupnost}/>
            
            <Form.Label>Broj Putnika</Form.Label>
            <Form.Control type="number" name="brojPutnika" required defaultValue={prijevozGosta.brojPutnika}/>
            
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
            <hr />
            <Row className="akcije">
              <Col xs={6} sm={12} md={3} lg={6} xl={6} xxl={6}>
                <Link to={RouteNames.PRIJEVOZ_GOSTA_PREGLED} 
                  className="btn btn-danger siroko">Odustani</Link>
              </Col>
              <Col xs={6} sm={12} md={9} lg={6} xl={6} xxl={6}>
                <Button variant="success"
                  type="submit"
                  className="siroko">Promjeni prijevoz gosta</Button>
              </Col>
            </Row>
          </Form>
        
      </>
    )
}