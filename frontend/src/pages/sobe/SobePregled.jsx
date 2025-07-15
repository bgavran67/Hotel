import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import SobeService from "../../services/SobeService";
import { NumericFormat } from "react-number-format";
import { GrValidate } from "react-icons/gr";


export default function SobePregled(){

    const[sobe, setSobe] = useState([]);

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

    return(
        <>
        Tablični pregled soba
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Tip sobe</th>
                    <th>Cijena (u eurima)</th>
                    <th>Dostupnost</th>
                    <th>Broj sobe</th>
                </tr>
            </thead>
            <tbody>
                {sobe && sobe.map((sobe,index)=>(
                    <tr key={index}>
                        <td>{sobe.tipSobe}</td>
                        <td className="desno">
                            <NumericFormat
                            value={sobe.cijena}
                            displayType={'text'}
                            thousandSeparator='.'
                            decimalSeparator=','
                            suffix={' €'}
                            decimalScale={2}
                            fixedDecimalScale
                            />
                        </td>
                        <td className="sredina">
                            <GrValidate 
                            size={30}
                            color={sobe.dostupnost ? 'green' : 'red'}
                            title={sobe.dostupnost ? 'DA' : 'NE'}
                        
                            />
                        </td>
                        <td>{sobe.brojSobe}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </>
    )
}