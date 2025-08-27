import GostiService from "../../services/GostiService";
import SobeService from "../../services/SobeService";


export default function RezervacijePromjena() {
  const navigate = useNavigate();
  const routeParams = useParams();

  //fk od gosta i sobe
  const [gosti, setGosti] = useState([]);
  const [gostSifra, setGostSifra] = useState(0);

  const [sobe, setSobe] = useState([]);
  const [sobaSifra, setSobeSifra] = useState(0);


  const [rezervacija, setRezervacija] = useState({});

    async function dohvatiGoste() {
    const odgovor = await GostiService.get();
    setGosti(odgovor.poruka);
    }

    async function dohvatiSobe() {
    const odgovor = await SobeService.get();
    setSobe(odgovor.poruka);
    }

    
    async function dohvatiRezervacija() {
    const odgovor = await Service.getBySifra(routeParams.sifra);
    if(odgovor.greska){
      alert(odgovor.poruka);
      return;
  }

  let rezervacija = odgovor.poruka;
    setRezervacija(rezervacija);
    setGostSifra(rezervacija.gostSifra); 
    setSobeSifra(rezervacija.sobaSifra); 
  }


  useEffect(()=>{
    dohvatiInicijalnePodatke();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

 async function promjena(e){
    const odgovor = await Service.promjena(routeParams.sifra,e);
    if(odgovor.greska){
        alert(odgovor.poruka);
        return;
    }
    navigate(RouteNames.REZERVACIJA_PREGLED);
}



}