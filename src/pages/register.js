import { Button, Link } from '@chakra-ui/react'
import axios from 'axios'
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import useLocalStorageState from "use-local-storage-state";

export const Register = ({setAuth}) => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('')
    const [password,  setPassword] = useState('')
    const [error, setError] = useState(null)
    const [token, setToken] = useLocalStorageState("teammateToken", null);


    const handleSubmit = async e => {
        e.preventDefault()
        
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
        <div className="app-body">
        <div className="register-box" style={{ textAlign: "center"}}>
        <h1 className="form-banner">Please register</h1>

        <div className='form-register'>
        {error && <div className="error">{error}</div>}
        <form id="new-user-form" onSubmit={handleSubmit}>

        <label className="">First Name</label>
        <input id="inputFirstname" className="form-control"  placeholder="First name"
            onChange={(e) => setFirstname(e.target.value)}/>
        <br/> 
        <label className="" >Last Name</label>
        <input id="inputLastname" className="form-control"  placeholder="Last name"
            onChange={(e) => setLastname(e.target.value)}/>
        <br/> 
        <label className="" >Username</label>
        <input id="inputUsername" className="form-control"  placeholder="User name"
            onChange={(e) => setUsername(e.target.value)} type="username"/>
        <br/> 
        <label class="sr-only">Password</label>
        <input id="inputPassword" className="form-control" placeholder="Password"
            onChange={(e) => setPassword(e.target.value)} type="password"/>
        <br/>
        <br/>
        <Button colorScheme="teal" type="submit" >Submit</Button>
        </form>
        </div>
        </div>
        </div>
    )
    }

    export default Register

    
