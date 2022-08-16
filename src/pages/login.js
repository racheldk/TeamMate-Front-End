import { Button } from '@chakra-ui/react'
import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";



function Login({setAuth}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState([]);
    const [token, setToken] = useState(null)


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
    <div className="spacer">&nbsp;</div>
    <div className="app-body">
    <div className="login-box">
        <div className='form'>
        <div className="form-login">
        
        <h1 className="form-banner">Login</h1>
        <label className="sr-only">Username</label>
        <input id="inputUsername" class="form-control" placeholder="Username" required autofocus
            onChange={(e) => setUsername(e.target.value)}/>
        <br/> 
        <label for="inputPassword" className="sr-only">Password</label>
        <input type="password" id="inputPassword" class="form-control" placeholder="Password" required
            onChange={(e) => setPassword(e.target.value)}/>
    
        <br/>
        <Button colorScheme="teal" type="submit" 
        onClick={(e) => handleLogin(e)}>Login</Button>
    
    </div>
    </div>
    </div>
    </div>
    <div className="spacer">&nbsp;</div>
    </>
    )
    }
    export default Login;
