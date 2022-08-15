import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import NewOpenGame from './pages/newOpenGame';
import { useEffect, useState } from 'react'
import OpenGamesList from "./pages/openGamesPage";
import { ChakraProvider } from '@chakra-ui/react'
import Login from "./pages/login.js"
import Register from './pages/register';
import Theme from './components/theme'
import { Text } from "@chakra-ui/react"

function App() {
        const [token, setToken] = useState()

useEffect(()=>{
        setToken("ea54a8e01ca1479e2ba6b5aa99ea04dc434b5298")
}, [])

return (
        <ChakraProvider Theme={Theme} Text={Text}>
        <BrowserRouter>
        <header className="">
                        <div className="container">
                        <div class="buttons-header">
                        <Link to="/login"  class="btn">Login</Link>
                        <Link to="/register" class="btn">Register</Link>
                        </div>
                        </div>
                </header>

                <Routes>
                <Route path="/"  element={<Login token={token}/>}/>
                {/* All Open Games (Game List component? separate component?) */}
                <Route path="/new"  element={<NewOpenGame token={token}/>} />
                {/* make a new open game post  */}
                <Route path="register"  element={<Register />} />
                {/* register new user */}
                <Route path="open-games" element={<OpenGamesList token={token}/>}/>
                {/* login */}
                <Route path= "my-games" />
                {/* my games - confirmed, pending requests as guest, pending requests as host, open */}
                <Route path=":username"/>
                {/* This will be a user profile (Team Quokka did something like this with the users/:id route)  */}
                </Routes>
        </BrowserRouter>
        </ChakraProvider>
);
}

export default App;
