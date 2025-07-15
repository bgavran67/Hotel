import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container } from 'react-bootstrap'
import NavBarEdunova from './components/NavBarEdunova'
import { Route, Routes } from 'react-router-dom'
import { RouteNames } from './constants'
import Pocetna from './pages/Pocetna'
import SobePregled from './pages/sobe/SobePregled'


function App() {
  

  return (
    <Container>
      <NavBarEdunova />

      <Container className="app">
      <Routes>
        <Route path={RouteNames.HOME} element={<Pocetna />} />

        <Route path={RouteNames.SOBA_PREGLED} element={<SobePregled />} />
        
      </Routes>
      </Container>
      
      <hr />
      &copy; Barbara
    </Container>
  )
}

export default App
