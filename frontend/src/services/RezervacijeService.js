import { FaWineGlassEmpty } from "react-icons/fa6";
import { HttpService } from "./HttpService";

async function get() {
    
    return await HttpService.get('/Rezervacije')
    .then((odgovor)=>{
        return odgovor.data
    })
    .catch((e)=>{console.error(e)})
}

async function getBySifra(sifra) {
    
    return await HttpService.get('/Rezervacije/' + sifra)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch(()=>{
        return{greska: true, poruka: 'Ne postoji Rezervacije!'}
    })
}

async function obrisi(sifra) {
    
    return await HttpService.delete('/Rezervacije/' + sifra)
    .then((odgovor)=>{
        //console.log(odgovor);
        return {greska: false, poruka: odgovor.data}
    })
    .catch(()=>{
        return {greska: true, poruka: 'Rezervacije se ne može obrisati!'}
    })
}

async function dodaj(Rezervacije) {
    return await HttpService.post('/Rezervacije',Rezervacije)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        switch (e.status) {
            case 400:
                let poruke='';
                for(const kljuc in e.response.data.errors){
                    poruke += kljuc + ': ' + e.response.data.errors[kljuc][0] + '\n';
                }
                return {greska: true, poruka: poruke}
            default:
                return {greska: true, poruka: 'Rezervacije se ne može dodati!'}
        }
    })
}


async function promjena(sifra,Rezervacije) {
    return await HttpService.put('/Rezervacije/' + sifra,Rezervacije)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        switch (e.status) {
            case 400:
                let poruke='';
                for(const kljuc in e.response.data.errors){
                    poruke += kljuc + ': ' + e.response.data.errors[kljuc][0] + '\n';
                }
                console.log(poruke)
                return {greska: true, poruka: poruke}
            default:
                return {greska: true, poruka: 'Rezervacije se ne može promjeniti!'}
        }
    })
}


export default{
    get,
    getBySifra,
    obrisi,
    dodaj,
    promjena
}