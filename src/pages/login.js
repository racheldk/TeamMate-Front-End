import { Button } from '@chakra-ui/react'



function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [navigate, setNavigate] = useState(false);
    const [token, setToken] = useState()



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

    return(

    <>
    <div className="spacer">&nbsp;</div>
    <div className="app-body">
    <div className="login-box">
        <div className='form'>
        <div className="form-login">
        
        <h1 className="form-banner">Login</h1>
        <label className="sr-only">Username</label>
        <input id="inputUsername" class="form-control" placeholder="Username" required autofocus/>
        <br/> 
        <label for="inputPassword" className="sr-only">Password</label>
        <input type="password" id="inputPassword" class="form-control" placeholder="Password" required/>
        {/* <div className="checkbox mb-3">
            <label>
            <input type="checkbox" value="remember-me" />Remember me
            </label>
        </div> */}
        <br/>
        <Button colorScheme="teal" type="submit">Sign in</Button>
    
    </div>
    </div>
    </div>
    </div>
    <div className="spacer">&nbsp;</div>
    </>
    )
    }
    export default Login;
