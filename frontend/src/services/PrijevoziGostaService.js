
import {HttpService} from "./HttpService";

async function get() {
    return await HttpService.get('/PrijevozGosta')
    // sve je u redu, dobili smo odgovor
    .then((odgovor)=>{
        //console.log(odgovor.data)
        return{greska: false, poruka: odgovor.data}
    })
    // nastala je greška, obradi ju
    .catch((e)=>{
        return {greska: true, poruka: 'Problem kod dohvaćanja prijevoza gosta' }
    })
}

async function brisanje(sifra){
return await HttpService.delete('/PrijevozGosta/' + sifra)
//sve je u redu, dobili smo odgovor
.then((odgovor)=>{
    // console.log(odgovor.data)
    return {greska: false, poruka: 'Obrisano'}
})
.catch(()=>{
    return {greska: true, poruka: 'Problem kod brisanja prijevoza gosta'}
})
}


async function dodaj(prijevozGosta) {
    return await HttpService.post('/PrijevozGosta',prijevozGosta)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        switch (e.status){
            case 400:
                let poruke='';
                for(const kljuc in e.reposnse.data.errors){
                    poruke += kljuc + ': ' + e.reposnse.data.errors[kljuc][0] + '\n';
                }
                return {greska: true, poruka: poruke}
                default: return {greska: true, poruka: 'Prijevoz gosta se ne može dodati!'}
        }
    })
}

async function promjena(sifra,prijevozGosta){
    return await HttpService.put('/PrijevozGosta/' + sifra,prijevozGosta)
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
                return {greska: true, poruka: 'Prijevoz gosta se ne može promjeniti!'}
        }
    })
}

async function getBySifra(sifra){
    return await HttpService.get('/PrijevozGosta/'+sifra)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        return {greska: true, poruka: 'Problem kod dohvaćanja prijevoz gosta sa šifrom '+sifra}   
    })
}


export default{
    get,
    brisanje,
    dodaj,
    getBySifra,
    promjena
}
