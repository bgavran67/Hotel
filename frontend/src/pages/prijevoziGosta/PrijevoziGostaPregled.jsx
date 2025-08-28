import { useEffect, useState } from "react";
import { Button, Table, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import Service from "../../services/PrijevoziGostaService";
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function PrijevoziGostaPromjena(){
    const [prijevoziGosta,setPrijevoziGosta] = useState([]);
    let navigate = useNavigate(); 

    async function dohvatiPrijevozeGosta(){
        const odgovor = await Service.get();
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        // console.log(odgovor.poruka);
        setPrijevoziGosta(odgovor.poruka);
    }

    async function obrisiPrijevozGosta(sifra) {
        const odgovor = await Service.brisanje(sifra);
        //console.log(odgovor);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        dohvatiPrijevozeGosta();
    }

    useEffect(()=>{
        dohvatiPrijevozeGosta();
    },[]);


    return (

        <Container>
            <Link to={RouteNames.PRIJEVOZ_GOSTA_NOVI} className="btn btn-success siroko">
               Dodaj novi prijevoz gosta
            </Link>
            
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Datum dolaska</th>
                        <th>Datum odlaska</th>
                        <th>Vrsta prijevoza</th>
                        <th>Lokacija polazišta</th>
                        <th>Dostupnost</th>
                        <th>Broj putnika</th>
                        <th>Gost</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                
                <tbody>
                    {prijevoziGosta && prijevoziGosta.map((entitet,index)=>(
                        <tr key={index}>
                            <td>{entitet.datumPolaska}</td>
                            <td>{entitet.datumOdlaska}</td>
                            <td>{entitet.vrstaPrijevoza}</td>
                            <td>{entitet.lokacijaPolazista}</td>
                            <td>{entitet.dostupnost}</td>
                            <td>{entitet.brojPutnika}</td>
                            <td>{entitet.gostIme} {entitet.gostPrezime}</td>


                            <td className="sredina">
                                    <Button
                                        variant='primary'
                                        onClick={()=>{navigate(`/prijevozgosta/${entitet.sifra}`)}}
                                    >
                                        <FaEdit 
                                    size={25}
                                    />
                                    </Button>
                               
                                
                                    &nbsp;&nbsp;&nbsp;

                                    <Button
                                        variant='danger'
                                        onClick={() => obrisiPrijevozGosta(entitet.sifra)}
                                    >
                                        <FaTrash
                                        size={25}/>
                                    </Button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>

    );

}