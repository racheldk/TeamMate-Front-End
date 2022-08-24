
import { Button, Box, Heading, FormControl, FormLabel, Text, Link } from '@chakra-ui/react'
import axios from 'axios'
import { useState } from 'react'
import { Navigate, useNavigate, Link } from 'react-router-dom'
import useLocalStorageState from "use-local-storage-state";

export const Register = ({ setAuth }) => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [token, setToken] = useLocalStorageState("teammateToken", null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios

        .post(`https://teammate-app.herokuapp.com/auth/users/`, {
            first_name: firstname,
            last_name: lastname, 
            username: username,
            password: password,
        })
        .then(() => {
            axios
        .post('https://teammate-app.herokuapp.com/auth/token/login/', {
            username: username,
            password: password,
        }, console.log("logged in"))
        .then((res) => {
        const token = res.data.auth_token;
        setAuth(username, token)
        setToken(token)
    })

        })

    }
    if (token) {
        return <Navigate to="/open-games" />;
    }

    return (
        <>
        <Box className="spacer">&nbsp;</Box>
        <Box className="app-body">

        <Box className="form">
        <Heading color='teal' className="form-banner">Registration</Heading>
        {error && <Box className="error">{error}</Box>}
        <FormControl id="new-user-form">
        <Box m={2}>
        <FormLabel display='inline-block' color='#2C7A7B'>First Name</FormLabel>
        <input id="inputFirstname" className="form-control"  placeholder="First name"
            onChange={(e) => setFirstname(e.target.value)}/>
        </Box>
        <Box m={2}>
        <FormLabel display='inline-block' color='#2C7A7B'>Last Name</FormLabel>
        <input id="inputLastname" className="form-control"  placeholder="Last name"
            onChange={(e) => setLastname(e.target.value)}/>
        </Box>
        <FormLabel display='inline-block' color='#2C7A7B'>Username</FormLabel>
        <input id="inputUsername" className="form-control"  placeholder="Username"
            onChange={(e) => setUsername(e.target.value)} type="username"/>
        <Box m={2}>
        <FormLabel display='inline-block' color='#2C7A7B'>Password</FormLabel>
        <input id="inputPassword" className="form-control" placeholder="Password"
            onChange={(e) => setPassword(e.target.value)} type="password"/>
        </Box>    
        <Box w='100' display='flex' justifyContent='center' m={2}> <Button colorScheme="teal" type="submit" onClick={(e) => handleSubmit(e)}>Submit</Button></Box>
       
        </FormControl>
        <Link to="/"><Text color='#285E61' fontSize='12px'>Back to Login</Text></Link>
        </Box>
        </Box>
        <Box className="spacer">&nbsp;</Box>
        </>
    )
    }

export default Register;
