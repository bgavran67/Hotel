import slika from '../assets/hotelSlika.png'

export default function Pocetna(){
    return(
        <>
        Dobrodošli <hr />
        <img src={slika} style={{maxWidth: 200, border: '2px solid blue'}} />
        </>
    )
}