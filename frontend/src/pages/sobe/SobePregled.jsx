import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import SobeService from "../../services/SobeService";
import { NumericFormat } from "react-number-format";
import { GrValidate } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";

export default function SobePregled(){

    const[sobe, setSobe] = useState([]);
    const navigate = useNavigate();

    async function dohvatiSobe() {
        const odgovor = await SobeService.get()
        setSobe(odgovor)
    }

    //hook ili kuka se izvodi prilikom dolaska na straniuc Sobe
    //ovo "glumi" konstruktor u OOP
    useEffect(()=>
        {
         dohvatiSobe();
    },[])

    function obrisi(sifra){
        if(!confirm('Sigurno obrisati')){
            return;
        }
        brisanje(sifra)
    }

    async function brisanje(sifra) {
        const odgovor = await SobeService.obrisi(sifra);
        dohvatiSobe();
    }




    return(
        <>
        
        <Link 
        className="btn btn-success"
        to={RouteNames.SOBA_NOVI} >Dodavanje nove sobe</Link>

        
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
                        <td>{soba.tipSobe}</td>
                        <td className="desno">
                            <NumericFormat
                            value={soba.cijena}
                            displayType={'text'}
                            thousandSeparator='.'
                            decimalSeparator=','
                            suffix={' €'}
                            decimalScale={2}
                            fixedDecimalScale
                            />
                        </td>

                        <td>{soba.dostupnost}</td>
                        {/* <td className="sredina">
                            <GrValidate 
                            size={30}
                            color={sobe.dostupnost ? 'green' : 'red'}
                            title={sobe.dostupnost ? 'DA' : 'NE'}
                        
                            />
                            
                        </td> */}

                        <td>{soba.brojSobe}</td>

                        <td>

                            
                            
                            <Button 
                                onClick={()=>navigate(`/sobe/${soba.sifra}`)}>
                                Promjena
                            </Button>
                            &nbsp;&nbsp;&nbsp;&nbsp;

                            <Button variant="danger"
                                onClick={()=>obrisi(soba.sifra)}>
                                Obriši
                            </Button>

                        </td>

                    </tr>
                ))}

            </tbody>
            
        </Table>
        </>
    )
}