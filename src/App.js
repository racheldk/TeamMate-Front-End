import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewOpenGame from './pages/newOpenGame';
import { useEffect, useState } from 'react'
import OpenGamesList from "./pages/openGamesPage";
import { ChakraProvider } from '@chakra-ui/react'
import Login from "./pages/login.js"
import Register from './pages/register';
import Theme from './components/theme'
import { Text } from "@chakra-ui/react"
import useLocalStorageState from "use-local-storage-state";

function App() {
  const [token, setToken] = useLocalStorageState("teammateToken", null)
  const [username, setUsername] = useLocalStorageState("teammateUsername", null)

  const setAuth=(username, token)=>{
  setToken(token)
  setUsername(username)
  }


    return (
        <ChakraProvider Theme={Theme} Text={Text}>
        <BrowserRouter>
            <Routes>
                <Route path="/"  element={<Login setToken={setToken} setAuth={setAuth}/>}/>
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
