

function Register() {
    return(
    <div className="app-body">
        <div className='form' style={{ textAlign: "center"}}>
        <div className="form-register">
        
        <h1 className="form-banner">Please register</h1>
        <label className="" >Fisrt Name</label>
        <input id="inputFirstname" className="form-control"  placeholder="First name" required autofocus/>
        <br/> 
        <label className="" >Last Name</label>
        <input id="inputLastname" className="form-control"  placeholder="Last name" required autofocus/>
        <br/> 
        <label className="">Email address</label>
        <input id="inputEmail" className="form-control"  placeholder="Email address" required autofocus/>
        <br/> 
        <label className="" >Username</label>
        <input id="inputUsername" className="form-control"  placeholder="User name" required autofocus/>
        <br/> 
        <label class="sr-only">Password</label>
        <input id="inputPassword" className="form-control" placeholder="Password" required/>
        <br/>
        <button className="form-button" type="submit">Sign Up</button>
    
    </div>
    </div>
    </div>
    )
    }
    export default Register;