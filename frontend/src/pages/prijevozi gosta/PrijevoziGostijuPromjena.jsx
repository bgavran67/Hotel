import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GostiService from "../../services/GostiService";
import { RouteNames } from "../../constants";
import { Form } from "react-bootstrap";

export default function PrijevoziGostaPromjena(){
    const navigate = useNavigate();
    const routeParams = useParams();

    //dodajemo fk
    const [gosti, setGosti] = useState([]);
    const [gostSifra, setGostSifra] = useState(0);

    const [prijevozGosta, setPrijevozGosta] = useState();

    async function dohvatiGoste() {
        const odgovor = await GostiService.get();
        setGosti(odgovor.poruka);
    }

    //nastavljamo za prijevoz g.
    async function dohvatiPrijevozGosta() {
        const odgovor = await Service.getBySifra(routeParams.sifra);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        let prijevozGosta = odgovor.poruka;
        setPrijevozGosta(prijevozGosta);
        setGostSifra(prijevozGosta.gostSifra)
    }     

    async function dohvatiInicijalnePodatke() {
        await dohvatiPrijevoziGosta();
        await dohvatiGoste();
    }

    useEffect(()=>{
        dohvatiInicijalnePodatke();
    },[]);
    
    async function Promjena(e) {
        const odgovor = await Service.promjena(routeParams.sifra,e);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        navigate(RouteNames.PRIJEVOZ_GOSTA_PREGLED);
    }
}

function obradiSubmit(e){
    e.preventDefault();

    const podaci = new FormData(e.target);

    promjena({
        datumPolaska: moment.utc(podaci.get(('datumPolaska'))),
        datumOdlaska: moment.utc(podaci.get(('datumOdlaska'))),
        vrstaPrijevoza: podaci.get('vrstaPrijevoza'),
        //lokacijaPolazista
        dostupnost: podaci.get('dostupnost'),
        brojPutnika: parseFloat(podaci.get('brojPutnika')),
        gostSifra: parseInt(gostSifra)
    })
}
return(
    <>
    Mjenjanje podataka prijevoza gostiju
    
    <Form onSubmit={obradiSubmit}></Form>
    <Form.Label>Datum Polaska</Form.Label>
    <Form.Control type="date-local" name="datumPolaska" required defaultValue={prijevozGosta.datumPolaska}/>
   
   <Form onSubmit={obradiSubmit}></Form>
    <Form.Label>Datum Odlaska</Form.Label>
    <Form.Control type="date-local" name="datumOdlaska" required defaultValue={prijevozGosta.datumOdlaska}/>
   
   <Form onSubmit={obradiSubmit}></Form>
    <Form.Label>Vrsta Prijevoza</Form.Label>
    <Form.Control type="text" name="vrstaPrijevoza" required defaultValue={prijevozGosta.vrstaPrijevoza}/>
   
   <Form onSubmit={obradiSubmit}></Form>
    <Form.Label>Lokacija Polazišta</Form.Label>
    <Form.Control type="text" name="lokacijaPolazista" required defaultValue={prijevozGosta.lokacijaPolazista}/>
   
   <Form onSubmit={obradiSubmit}></Form>
    <Form.Label>Dostupnost</Form.Label>
    <Form.Control type="text" name="dostupnost" required defaultValue={prijevozGosta.dostupnost}/>
   
   <Form onSubmit={obradiSubmit}></Form>
    <Form.Label>Broj Putnika</Form.Label>
    <Form.Control type="number" name="brojPutnika" required defaultValue={prijevozGosta.brojPutnika}/>
   
   
   <Form.Group className='mb-3' controlId="gost">
    <Form.Label>Gost</Form.Label>
    <Form.Select
    value={gostSifra}
   </Form.Group>

    </>

)