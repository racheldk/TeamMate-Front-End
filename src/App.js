import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <div>
                <h1>TeamMate!</h1>
                <Route path="/" />
                {/* All Open Games (Game List component? separate component?) */}
                <Route path="/new" />
                {/* make a new open game post  */}
                <Route path="register" />
                {/* register new user */}
                <Route path="login" />
                {/* login */}
                <Route path= "/mygames" />
                {/* my games - confirmed, pending requests as guest, pending requests as host, open */}
                <Route/>
                {/* This will be for the user profile, but I need to look at how that works again  */}

            </div>
        </BrowserRouter>
    );
}

export default App;
