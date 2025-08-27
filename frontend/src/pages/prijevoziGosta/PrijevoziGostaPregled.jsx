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
        await Service.get()
        .then((odgovor)=>{
            //console.log(odgovor);
            setPrijevoziGosta(Array.isArray(odgovor));

        })
        .catch((e)=>{console.log(e)});
    }

    async function obrisiPrijevozGosta(sifra) {
        const odgovor = await Service.obrisi(sifra);
        //console.log(odgovor);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        dohvatiPrijevozeGosta();
    }

    useEffect(()=>{
        dohvatiPrijevozeGosta();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);


    return (

        <Container>
            <Link to={RouteNames.PRIJEVOZ_GOSTA_NOVI} className="btn btn-success siroko">
                <IoIosAdd
                size={25}
                /> Dodaj
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
                            <td>{entitet.datumDolaska}</td>
                            <td>{entitet.datumOdlaska}</td>
                            <td>{entitet.vrstaPrijevoza}</td>
                            <td>{entitet.lokacijaPolazista}</td>
                            <td>{entitet.dostupnost}</td>
                            <td>{entitet.brojPutnika}</td>
                            <td>{entitet.gost.ime} {entitet.gost.prezime}</td>


                            <td className="sredina">
                                    <Button
                                        variant='primary'
                                        onClick={()=>{navigate(`/prijevoziGosta/${entitet.sifra}`)}}
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