import './App.css';
import { BrowserRouter, Link, Routes, Route, Navigate } from "react-router-dom";
import Login from './component/login';
import Register from './component/register';


function App() {
    return(
    <BrowserRouter>
        <header className="">
            <div className="container">
                <div class="buttons-header">
                <Link to="/login"  class="btn">Login</Link>
                <Link to="/register" class="btn">Register</Link>
                </div>
            </div>
        </header>

        <hr/>
        <h1 style={{ textAlign: "center" }}>TeamMate!</h1>

        <Routes><Route path="/" element={<Login/>} /></Routes>
      {/* All Open Games (Game List component? separate component? */}
        <Routes><Route path="/new" /></Routes>
                {/* make a new open game post  */}
        <Routes><Route path="/register" element={<Register/>} /></Routes>
                {/* register new user */}
        <Routes><Route path="login" element={<Login/>} /> </Routes>
                {/* login */}
        <Routes><Route path= "/mygames" /></Routes>
                {/* my games - confirmed, pending requests as guest, pending requests as host, open */}
        <Routes><Route path=":username"/></Routes>
                {/* This will be for a user profile (Team Quokka did something like this with the users/:id route)  */}
    </BrowserRouter>
    )
    }

export default App;
