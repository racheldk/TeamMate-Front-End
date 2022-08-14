import "./App.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import OpenGamesList from "./pages/openGamesPage";
import { useEffect, useState } from "react";

function App() {
const [token, setToken] = useState()

useEffect(()=>{
  setToken("ea54a8e01ca1479e2ba6b5aa99ea04dc434b5298")
}, [])

    return (
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
            <Routes>
                <Route path="/" element={<OpenGamesList token={token}/>}/>
                {/* All Open Games (Game List component? separate component?) */}
                <Route path="/new" />
                {/* make a new open game post  */}
                <Route path="register" />
                {/* register new user */}
                <Route path="login" />
                {/* login */}
                <Route path= "/mygames" />
                {/* my games - confirmed, pending requests as guest, pending requests as host, open */}
                <Route path=":username"/>
                {/* This will be for a user profile (Team Quokka did something like this with the users/:id route)  */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
