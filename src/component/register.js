

function Register() {
    return(
        <div className='Register' style={{ textAlign: "center"}}>
        <div className="form-register">
        
        <h1>Please register</h1>
        <label className="" >Fisrt Name</label>
        <input id="inputFirstname" class="" placeholder="First name" required autofocus/>
        <br/> 
        <label className="" >Last Name</label>
        <input id="inputLastname" class="" placeholder="Last name" required autofocus/>
        <br/> 
        <label className="">Email address</label>
        <input id="inputEmail" class="" placeholder="Email address" required autofocus/>
        <br/> 
        <label className="" >Username</label>
        <input id="inputUsername" class="" placeholder="User name" required autofocus/>
        <br/> 
        <label class="sr-only">Password</label>
        <input id="inputPassword" class="form-control" placeholder="Password" required/>
        <br/>
        <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
    
    </div>
    </div>
    )
    }
    export default Register;