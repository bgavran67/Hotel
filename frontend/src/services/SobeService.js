
import {HttpService} from "./HttpService"

async function get() {
    return await HttpService.get('/Soba')
    // sve je u redu, dobili smo odgovor
    .then((odgovor)=>{
        //console.log(odgovor.data)
        return odgovor.data
    })
    // nastala je greška, obradi ju
    .catch((e)=>{})
}

async function getBySifra(sifra){
return await HttpService.get('/Soba/' + sifra)
//sve je u redu, dobili smo odgovor
.then((odgovor)=>{
    // console.log(odgovor.data)
    return odgovor.data
})

//nastala je greška, obradi ju!
.catch((e)=>{})
}

async function dodaj(soba) {
    return await HttpService.post('/Soba',soba)
    .then((odgovor)=>{return true})
    .catch((e)=>{return false})
}

async function obrisi(sifra) {
    return await HttpService.delete('/Soba/'+sifra)
    .then((odgovor)=>{return true})
    .catch((e)=>{return false})
}

async function promjeni(sifra,soba) {
    return await HttpService.put('/Soba/'+sifra, soba)
    .then((odgovor)=>{return true})
    .catch((e)=>{return false})
}


export default{
    get,
    getBySifra,
    dodaj,
    obrisi,
    promjeni
}

