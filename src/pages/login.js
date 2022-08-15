import axios from "axios";
import { useState } from "react";
import { baseURL } from "../helpers/constants";
import { Navigate, useNavigate, Link, Routes, Route } from "react-router-dom";



function Login({ token, setToken }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [navigate, setNavigate] = useState(false);



    const Login = (event) => {
        event.preventDefault();
    
        axios
        .post(`${baseURL}auth/token/login`, {
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
        return <Navigate to="/mygames" />;
    }

    return (
        <>
        <div className="spacer">&nbsp;</div>
        <div className="app-body">
        
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
            {/* <div className="checkbox mb-3">
                <label>
                <input type="checkbox" value="remember-me" />Remember me
                </label>
            </div> */}
            <br/>
            
            <button class="" type="submit" onClick={(e) => Login(e)}>LogIn</button>
        
        </div>
        </div>
        
        </div>
        <div className="spacer">&nbsp;</div>
        </>
        )
        }
        export default Login;

