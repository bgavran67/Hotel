import { use, useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import { GrValidate } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import GostiService from "../../services/GostiService";

export default function GostiPregled(){

    const navigate = useNavigate();
    const[gosti, setGosti] = useState([]);


    async function dohvatiGoste() {
        const odgovor = await GostiService.get();
        if(odgovor.greska){
            alert(odgovor.poruka)
            return
        }
        setGosti(odgovor.poruka)
        
    }

    //hook ili kuka se izvodi prilikom dolaska na stranicu Sobe
    useEffect(()=>{
        dohvatiGoste();
    },[])


    function obrisi(sifra){
        if(!confirm('Sigurno obrisati')){
            return;
        }
        brisanjeGosta(sifra)
    }

    async function brisanjeGosta(sifra) {
        const odgovor = await GostiService.brisanje(sifra);
        if(odgovor.greska){
            alert(odgovor.poruka)
            return
        }
        dohvatiGoste();
    }




    return(
        <>
        
        <Link to={RouteNames.GOST_NOVI}
        className="btn btn-success siroko">Dodaj novog gosta </Link>

        
        <Table striped bordered hover responsive>
            
            <thead>
                <tr>
                    <th>Ime</th>
                    <th>Prezime</th>
                    <th>Email</th>
                    <th>Telefon</th> 
                    <th>Adresa</th>
                    <th>Akcija</th>
                </tr>

            </thead>

            <tbody>

                {gosti && gosti.map((gost,index)=>(
                    <tr key={index}>

                    <td> 
                        {gost.ime}
                    </td>

                     <td> 
                        {gost.prezime}
                    </td>

                     <td> 
                        {gost.email}
                    </td>

                     <td> 
                        {gost.telefon}
                    </td>

                     <td> 
                        {gost.adresa}
                    </td>
                   

                <td> 

                            <Button 
                                variant="danger"
                                onClick={()=>obrisi(gost.sifra)}
                                >
                                    Obriši
                            </Button>
                            &nbsp;&nbsp;&nbsp;&nbsp;

                            <Button 
                                onClick={()=>navigate(`/Gosti/${gost.sifra}`)}
                                
                            >

                            Promjena    
                            </Button>


                            



                        </td>

                    </tr>
                ))}

            </tbody>
            
        </Table>
        </>
    )
}