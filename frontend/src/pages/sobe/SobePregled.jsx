import { use, useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import SobeService from "../../services/SobeService";
import { NumericFormat } from "react-number-format";
import { GrValidate } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";

export default function SobePregled(){

    const navigate = useNavigate();
    const[sobe, setSobe] = useState([]);


    async function dohvatiSobe() {
        const odgovor = await SobeService.get();
        if(odgovor.greska){
            alert(odgovor.poruka)
            return
        }
        setSobe(odgovor.poruka)
        
    }

    //hook ili kuka se izvodi prilikom dolaska na stranicu Sobe
    useEffect(()=>{
        dohvatiSobe();
    },[])


    function obrisi(sifra){
        if(!confirm('Sigurno obrisati')){
            return;
        }
        brisanjeSobe(sifra)
    }

    async function brisanjeSobe(sifra) {
        const odgovor = await SobeService.brisanje(sifra);
        if(odgovor.greska){
            alert(odgovor.poruka)
            return
        }
        dohvatiSobe();
    }




    return(
        <>
        
        <Link to={RouteNames.SOBA_NOVI}
        className="btn btn-success siroko">Dodaj novu sobu </Link>

        
        <Table striped bordered hover responsive>
            
            <thead>
                <tr>
                    <th>Tip sobe</th>
                    <th>Cijena (u eurima)</th>
                    <th>Dostupnost</th>
                    <th>Broj sobe</th> 
                    <th>Akcija</th>
                </tr>

            </thead>

            <tbody>

                {sobe && sobe.map((soba,index)=>(
                    <tr key={index}>

                    <td> 
                        {soba.tipSobe}
                    </td>

                   
                    
                    <td className={soba.cijena==null ? 'sredina' : 'desno'}>
                        {soba.cijena==null ? 'Nije definirano' : 
                        <NumericFormat 
                        value = {soba.cijena}
                        displayType={'text'}
                        thousandSeparator='.'
                        decimalSeparator=','
                        prefix={'€'}
                        decimalScale={2}
                        fixedDecimalScale
                        />

             }    
                        
                    </td>
                    
                     <td> {soba.dostupnost}</td>

                    <td>{soba.brojSobe}</td>
                   

                <td> 

                            <Button 
                                variant="danger"
                                onClick={()=>obrisi(soba.sifra)}
                                >
                                    Obriši
                            </Button>
                            &nbsp;&nbsp;&nbsp;&nbsp;

                            <Button 
                                onClick={()=>navigate(`/Sobe/${soba.sifra}`)}
                                
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