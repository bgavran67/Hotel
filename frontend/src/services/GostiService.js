import {HttpService} from "./HttpService";

async function get() {
    return await HttpService.get('/Gost')
    // sve je u redu, dobili smo odgovor
    .then((odgovor)=>{
        //console.log(odgovor.data)
        return{greska: false, poruka: odgovor.data}
    })
    // nastala je greška, obradi ju
    .catch((e)=>{
        return {greska: true, poruka: 'Problem kod dohvaćanja gosta' }
    })
}

async function brisanje(sifra){
return await HttpService.delete('/Gost/' + sifra)
//sve je u redu, dobili smo odgovor
.then((odgovor)=>{
    // console.log(odgovor.data)
    return {greska: false, poruka: 'Obrisano'}
})
.catch(()=>{
    return {greska: true, poruka: 'Problem kod brisanja gosta'}
})
}


async function dodaj(gost) {
    return await HttpService.post('/Gost', gost)
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
                default: return {greska: true, poruka: 'Gost se ne može dodati!'}
        }
    })
}

async function promjena(sifra,gost){
    return await HttpService.put('/Gost/' + sifra,gost)
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
                return {greska: true, poruka: 'Gost se ne može promjeniti!'}
        }
    })
}

async function getBySifra(sifra){
    return await HttpService.get('/Gost/'+sifra)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        return {greska: true, poruka: 'Problem kod dohvaćanja gosta sa šifrom '+sifra}   
    })
}


export default{
    get,
    brisanje,
    dodaj,
    getBySifra,
    promjena
}