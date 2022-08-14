function Login() {
    return (
        <div className="Login" style={{ textAlign: "center" }}>
            <div className="form-login">
                <h1>Please Login</h1>
                <label className="sr-only">User name</label>
                <input
                    id="inputUsername"
                    class="form-control"
                    placeholder="User name"
                    required
                    autofocus
                />
                <br />
                <label htmlFor="inputPassword" class="sr-only">
                    Password
                </label>
                <input
                    type="password"
                    id="inputPassword"
                    class="form-control"
                    placeholder="Password"
                    required
                />
                {/* <div className="checkbox mb-3">
            <label>
            <input type="checkbox" value="remember-me" />Remember me
            </label>
        </div> */}
                <br />
                <button class="btn btn-lg btn-primary btn-block" type="submit">
                    Sign in
                </button>
            </div>
        </div>
    );
}
export default Login;
