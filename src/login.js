
function Login() {
    return(
    <div className="app-body">

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
        <button className="form-button" type="submit">Sign in</button>
    
    </div>
    </div>
    
    </div>
    )
    }
    export default Login;