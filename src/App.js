import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './component/login';
import Register from './component/register';
import NewOpenGame from './component/newOpenGame';
import { useEffect, useState } from 'react'
import OpenGamesList from "./pages/openGamesPage";


function App() {
  const [token, setToken] = useState()

useEffect(()=>{
  setToken("ea54a8e01ca1479e2ba6b5aa99ea04dc434b5298")
}, [])

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<OpenGamesList token={token}/>}/>
                {/* All Open Games (Game List component? separate component?) */}
                <Route path="/new"  element={<NewOpenGame token={token}/>} />
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
