import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container } from 'react-bootstrap'
import NavBarEdunova from './components/NavBarEdunova'
import { Route, Routes } from 'react-router-dom'
import { RouteNames } from './constants'
import Pocetna from './pages/Pocetna'
import SobePregled from './pages/sobe/SobePregled'
import SobeDodaj from './pages/sobe/SobeDodaj'
import SobePromjena from './pages/sobe/SobePromjena'
import PrijevoziGostaPregled from './pages/prijevoziGosta/PrijevoziGostaPregled'
import PrijevoziGostaDodaj from './pages/prijevoziGosta/PrijevoziGostaDodaj'
import PrijevoziGostaPromjena from './pages/prijevoziGosta/PrijevoziGostaPromjena'
import GostiPregled from './pages/gosti/GostiPregled'
import GostiPromjena from './pages/gosti/GostiPromjena'
import GostiDodaj from './pages/gosti/GostiDodaj'


function App() {
  

  return (
    <Container>
      <NavBarEdunova />

      <Container className="app">
      <Routes>
        <Route path={RouteNames.HOME} element={<Pocetna />} />

        <Route path={RouteNames.SOBA_PREGLED} element={<SobePregled />} />
        <Route path={RouteNames.SOBA_NOVI} element={< SobeDodaj />} /> 
        <Route path={RouteNames.SOBA_PROMJENA} element={< SobePromjena />} /> 

        <Route path={RouteNames.PRIJEVOZ_GOSTA_PREGLED} element={<PrijevoziGostaPregled />} />
        <Route path={RouteNames.PRIJEVOZ_GOSTA_NOVI} element={<PrijevoziGostaDodaj />} />
        <Route path={RouteNames.PRIJEVOZ_GOSTA_PROMJENA} element={<PrijevoziGostaPromjena />} />

        <Route path={RouteNames.GOST_PREGLED} element={<GostiPregled />} />
        <Route path={RouteNames.GOST_NOVI} element={<GostiDodaj />} />
        <Route path={RouteNames.GOST_PROMJENA} element={<GostiPromjena />} />

        

      </Routes>
      </Container>
      
      <hr />
      &copy; Barbara
    </Container>
  )
}

export default App
