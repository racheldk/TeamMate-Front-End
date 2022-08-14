<<<<<<< HEAD
import './App.css';
import { BrowserRouter, Link, Routes, Route, Navigate } from "react-router-dom";
import { ChakraProvider} from '@chakra-ui/react'
import Login from './login';
import Header from './component/HeaderMenu.js'
import Footer from './component/FooterMenu.js'
import Register from './register';
import Theme from './component/theme'
import { Text } from "@chakra-ui/react"




function App(Icons) {
    return(
   
    <ChakraProvider Theme={Theme} Text={Text}>
    <Header></Header>
    <BrowserRouter>
        <Routes>
        <Route path="/" element={<Login/>} />
                {/* All Open Games (Game List component? separate component? */}
        <Route path="/new" />
                {/* make a new open game post  */}
        <Route path="/register" element={<Register/>} />
                {/* register new user */}
        <Route path="/games" /> 
                {/* login */}
        <Route path= "/my-games" />
                {/* my games - confirmed, pending requests as guest, pending requests as host, open */}
        <Route path=":username"/>
                {/* This will be for a user profile (Team Quokka did something like this with the users/:id route)  */}
        </Routes> 
   </BrowserRouter>
   <Footer></Footer>
   </ChakraProvider>
    )
    }
=======
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import OpenGamesList from "./pages/openGamesPage";
import { useEffect, useState } from "react";

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
>>>>>>> 54c50bf6ece1b4ea29d05821a3f28d43e3709e64

export default App;
