import { Button, ButtonGroup } from '@chakra-ui/react'

function Login() {
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
