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

      </Routes>
      </Container>
      
      <hr />
      &copy; Barbara
    </Container>
  )
}

export default App
