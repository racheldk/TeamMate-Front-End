import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './component/login';
import Register from './component/register';
import NewOpenGame from './component/newOpenGame';
import { useEffect, useState } from 'react'


function App() {
  const [token, setToken] = useState()

  useEffect(() =>{
    setToken('ea54a8e01ca1479e2ba6b5aa99ea04dc434b5298')
  }, [setToken])

    return(
    <BrowserRouter>
        <Routes><Route path="/" element={<Login/>} /></Routes>
      {/* All Open Games (Game List component? separate component? */}
        <Routes><Route path="/new" element={<NewOpenGame token={token} />} /></Routes>
                {/* make a new open game post  */}
        <Routes><Route path="/register" element={<Register/>} /></Routes>
                {/* register new user */}
        <Routes><Route path="login" element={<Login/>} /> </Routes>
                {/* login */}
        <Routes><Route path= "/mygames" /></Routes>
                {/* my games - confirmed, pending requests as guest, pending requests as host, open */}
        <Routes><Route path=":username"/></Routes>
                {/* This will be a user profile (Team Quokka did something like this with the users/:id route)  */}
    </BrowserRouter>
    )
    }

export default App;
