<<<<<<< HEAD
=======
import { BrowserRouter, Routes, Route, Link } from "react-router"
import Drivers from "./pages/Drivers"
import Home from "./pages/Home"
import './App.css'
>>>>>>> 8c19fdb0753c75d68c1c48196724a44801271de4

function App() {

  return (
<<<<<<< HEAD
    <>
    </>
=======
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
>>>>>>> 8c19fdb0753c75d68c1c48196724a44801271de4
  )
}

export default App
