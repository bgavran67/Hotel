import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Service from "../../services/RezervacijeService";
import { RouteNames } from "../../constants";

export default function RezervacijePregled(){
    const [rezervacije, setRezervacije] = useState([]);
    let navigate = useNavigate();
 
    async function dohvatiRezervacije(){
        const odgovor = await Service.get();
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        // console.log(odgovor.poruka);
        setRezervacije(odgovor.poruka);
    }


    async function obrisiRezervaciju(sifra){
        const odgovor = await Service.obrisi(sifra);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        dohvatiRezervacije();  
    }

    useEffect(()=>{
        dohvatiRezervacije();
    },[]);

    return(
        <Container>
            <Link to={RouteNames.REZERVACIJA_NOVI} className="btn btn-success siroko">
                <IoIosAdd
                size={25}
                /> Dodaj novu rezervaciju
            </Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Ukupna cijena</th>
                        <th> Vrijeme i datum prijave</th>
                        <th>Vrijeme i datum odjave</th>
                        <th>Gost</th>
                        <th>Soba</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {rezervacije && rezervacije.map((entitet,index)=>(
                        <tr key={index}>
                            <td>{entitet.ukupnaCijena}</td>
                            <td>{entitet.vrijemeDatumPrijave}</td>
                            <td>{entitet.vrijemeDatumOdjave}</td>
                            <td>{entitet.gost}</td>
                            <td>{entitet.soba}</td>
                            <td className="sredina">
                                    <Button
                                        variant='primary'
                                        onClick={()=>{navigate(`/rezervacije/${entitet.sifra}`)}}
                                    >
                                        <FaEdit 
                                    size={25}
                                    />
                                    </Button>
                               
                                
                                    &nbsp;&nbsp;&nbsp;
                                    <Button
                                        variant='danger'
                                        onClick={() => obrisiRezervaciju(entitet.sifra)}
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