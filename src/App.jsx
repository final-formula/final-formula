import { BrowserRouter, Routes, Route, Link } from "react-router"
import Drivers from "./pages/Drivers"
import Home from "./pages/Home"
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="wrapper">
        <nav>
          <div className="navbar">
            <Link to="/">Home</Link>
            <Link to="/drivers">Drivers</Link>
          </div>


        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/drivers" element={<Drivers />} />

        </Routes>
      </div>


    </BrowserRouter>
  )
}

export default App
