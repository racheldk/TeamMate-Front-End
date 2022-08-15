import axios from "axios";
import { useState, useEffect } from "react";
import { baseURL } from "../helpers/constants";
import { Navigate } from "react-router-dom";
import { Button } from '@chakra-ui/react'



function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [navigate, setNavigate] = useState(false);
    const [token, setToken] = useState()

//     useEffect(()=>{
//         setToken("ea54a8e01ca1479e2ba6b5aa99ea04dc434b5298")
// }, [])


    const Login = (event) => {
        event.preventDefault();
    
        axios
        .post(`${baseURL}auth/token/login/`, {
            username: username,
            password: password,
        })

        
        .then((res) => {
            let auth_token = res.data.auth_token;
            token = auth_token;
            localStorage.setItem("token", auth_token);
            setLoggedIn(true);
            setToken(token);
            
        })
        .catch((res) => {
            console.log(res);
            let error = res.response.data.non_field_errors;
            setError(error);
        });

        setNavigate(true);
    };

    if (navigate) {
        return <Navigate to="open-games" />;

    }


    return (
    <>
        <div className="spacer">&nbsp;</div>
        <div className="app-body">
        <div className="login-box">
            <div className='form'>
            <div className="form-login">
            
            <h1 className="form-banner">Login</h1>
            <label className="sr-only">Username</label>
            <input id="inputUsername" class="form-control" placeholder="User name"
                        onChange={(e) => setUsername(e.target.value)}/>
                    <br/> 
    
                    <label for="inputPassword" class="sr-only">Password</label>
                    <input type="password" id="inputPassword" class="form-control" placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}/>
            <br/>
            
            <Button colorScheme="teal" type="submit" onClick={(e) => Login(e)}>LogIn</Button>
        </div>
        </div>
        </div>
        </div>
        <div className="spacer">&nbsp;</div>
        </>
    )
    }
export default Login;

