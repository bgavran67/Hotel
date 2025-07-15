import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import SobeService from "../../services/SobeService";


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
        Pregled soba
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Tip sobe</th>
                    <th>Cijena</th>
                    <th>Dostupnost</th>
                    <th>Broj sobe</th>
                </tr>
            </thead>
            <tbody>
                {sobe && sobe.map((sobe,index)=>(
                    <tr key={index}>
                        <td>{sobe.tipSobe}</td>
                        <td>{sobe.cijena}</td>
                        <td>{sobe.dostupnost}</td>
                        <td>{sobe.brojSobe}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </>
    )
}