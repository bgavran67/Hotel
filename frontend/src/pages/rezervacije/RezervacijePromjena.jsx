import { Button, Col, Form, Row} from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { RouteNames } from '../../constants';
import GostiService from "../../services/GostiService";
import SobeService from "../../services/SobeService";


export default function RezervacijePromjena() {
  const navigate = useNavigate();
  const routeParams = useParams();

  //fk od gosta i sobe
  const [gosti, setGosti] = useState([]);
  const [gostSifra, setGostSifra] = useState(0);

  const [sobe, setSobe] = useState([]);
  const [sobaSifra, setSobeSifra] = useState(0);


  const [rezervacija, setRezervacija] = useState({});

    async function dohvatiGoste() {
    const odgovor = await GostiService.get();
    setGosti(odgovor.poruka);
    }

    async function dohvatiSobe() {
    const odgovor = await SobeService.get();
    setSobe(odgovor.poruka);
    }

    
    async function dohvatiRezervacija() {
    const odgovor = await Service.getBySifra(routeParams.sifra);
    if(odgovor.greska){
      alert(odgovor.poruka);
      return;
  }

  let rezervacija = odgovor.poruka;
    setRezervacija(rezervacija);
    setGostSifra(rezervacija.gostSifra); 
    setSobeSifra(rezervacija.sobaSifra); 
  }


  useEffect(()=>{
    dohvatiInicijalnePodatke();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

 async function promjena(e){
    const odgovor = await Service.promjena(routeParams.sifra,e);
    if(odgovor.greska){
        alert(odgovor.poruka);
        return;
    }
    navigate(RouteNames.REZERVACIJA_PREGLED);
}

function obradiSubmit(e){
    e.preventDefault();

    const podaci = new FormData(e.target);

    promjena({
        ukupnaCijena: parseFloat(podaci.get('ukupnaCijena')),
        vrijemeDatumPrijave: moment.utc(podaci.get(('vrijemeDatumPrijave'))),
        vrijemeDatumOdjave: moment.utc(podaci.get(('vrijemeDatumOdjave'))),
        gostSifra: parseInt(gostSifra),
        sobaSifra: parseInt(sobaSifra)
    });
  }


  return(
    <>
      Promjena rezervacije

      <hr style={{marginTop: '15px'}} />

      <Form onSubmit={obradiSubmit}>

        <Form.Label>Ukupna Cijena</Form.Label>
        <Form.Control type="number" name="ukupnaCijena" required defaultValue={rezervacija.ukupnaCijena} />

        <Form.Label>Vrijeme i Datum Prijave</Form.Label>
        <Form.Control type="datetime" name="vrijemeDatumPrijave" required defaultValue={moment(rezervacija.vrijemeDatumPrijave)} />

        <Form.Label>Vrijeme i Datum Odjave</Form.Label>
        <Form.Control type="datetime" name="vrijemeDatumOdjave" required defaultValue={moment(rezervacija.vrijemeDatumOdjave)} />

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
            onChange={(e)=>{setSobeSifra(e.target.value)}}
            >
            {sobe && sobe.map((s,index)=>(
              <option key={index} value={s.sifra}>
                {s.tipSobe} {s.cijena} 
              </option>
            ))}
            </Form.Select>
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
                  Promjeni rezervaciju
              </Button>
              </Col>
       </Row>

      </Form>
    </>
  )


}