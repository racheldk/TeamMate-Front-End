import { useState } from "react";
import axios from "axios";
import {Navigate} from 'react-router-dom';
import { baseURL } from "../helpers/constants";


function Register() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    // const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState(''); 
    const [navigate, setNavigate] = useState(false);

    const submit = async e => {
        e.preventDefault();

        axios.post(`${baseURL}auth/users/`, {
            username: username, 
            password: password,
            first_name: firstname,
            last_name: lastname 
        });
        setNavigate(true);
    }

    if (navigate) {
        return <Navigate to="/login" />;
    }

    return(
        <div className='Register' style={{ textAlign: "center"}}>
            <form onSubmit={submit}>
                <div className="form-register">

                <h1>Please register</h1>
                <label className="" >Fisrt Name</label>
                <input id="inputFirstname" class="" placeholder="First name" 
                    onChange={(e) => setFirstname(e.target.value)}/>
                <br/> 
                <label className="" >Last Name</label>
                <input id="inputLastname" class="" placeholder="Last name"
                    onChange={(e) => setLastname(e.target.value)}/>
                <br/> 
                {/* <label className="">Email address</label>
                <input id="inputEmail" class="" placeholder="Email address" 
                    onChange={(e) => setEmail(e.target.value)}/> */}
                <br/> 
                <label className="" >Username</label>
                <input id="inputUsername" class="" placeholder="User name"
                    onChange={(e) => setUsername(e.target.value)}/>
                <br/> 
                <label class="sr-only">Password</label>
                <input id="inputPassword" class="form-control" placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}/>
                <br/>
                <button class="" type="submit">Sign in</button>
                </div>
            </form>
        </div>
    )
    }
    export default Register;