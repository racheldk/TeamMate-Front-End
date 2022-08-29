import { Button, Box, Text, Heading, FormControl, FormLabel, Image } from '@chakra-ui/react'
import axios from "axios";
import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";
import logo from "../images/teammate-logo.png";


function Login({setAuth}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState([]);
    const [token, setToken] = useLocalStorageState("teammateToken", null);


    const handleLogin = (event) => {
        event.preventDefault();
    
        axios
        .post(`https://teammate-app.herokuapp.com/auth/token/login/`, {
            username: username,
            password: password,
        })
        .then((res) => {
            const token = res.data.auth_token;
            setAuth(username, token)
            setToken(token)
        })
        .catch((res) => {
            console.log(res);
            let error = res.response.data.non_field_errors;
            setError(error);
        });
        

    };

    if (token) {
        return <Navigate to="/open-games" />;
    }


    return(
    <>
    <Box w='100%' m='auto' display='flex' justifyContent='center'>  <Image
                  src={logo}
                  alt='TeamMate logo'
                  w='150px'
                /></Box>
      
    <Box h='72px'>&nbsp;</Box>

    <Box className="app-body">

    <Box className="login-box">
        <FormControl className='form' w='300px' textAlign='center'>
        <Heading className="form-banner" color='#285E61'>Login</Heading>
        <FormLabel w='100%' textAlign='center' mt={5} mb={0} color='#285E61'>Username</FormLabel>
        <input id="inputUsername" class="form-control" placeholder="Username" required autofocus
            onChange={(e) => setUsername(e.target.value)}/>
        <br/> 
        <FormLabel for="inputPassword" w='100%' textAlign='center' mt={5} mb={0} color='#285E61'>Password</FormLabel>
        <input type="password" id="inputPassword" class="form-control" placeholder="Password" required
            onChange={(e) => setPassword(e.target.value)}/>
    
        <br/>
        <Button colorScheme="teal" type="submit" m={2}
        onClick={(e) => handleLogin(e)}>Login</Button>
        <br/>
        <Link to="register"><Text color='#285E61' fontSize='12px'>New User? Create an Account</Text></Link>
    </FormControl>
    </Box>
    </Box>
    <Box className="spacer">&nbsp;</Box>
    </>
    )
    }
    export default Login;
