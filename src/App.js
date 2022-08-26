import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewOpenGame from "./pages/newOpenGame";
import { useEffect, useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Login from "./pages/login.js";
import Register from "./pages/register";
import Theme from "./components/theme";
import { Text } from "@chakra-ui/react";
import useLocalStorageState from "use-local-storage-state";
import UserProfile from "./pages/userProfile";
import axios from "axios";
import EditGame from "./pages/editGame";
import MyGames from "./pages/myGamesPage";
import OpenGamesPage from "./pages/openGamesPage";
import Survey from "./pages/survey";


function App() {
    const [token, setToken] = useLocalStorageState("teammateToken", null);
    const [username, setUsername] = useLocalStorageState(
        "teammateUsername",
        null
    );
    const [allGamesList, setAllGamesList] = useState([]);
    const [currentGame, setCurrentGame] = useState({});
    const [game, setGame] = useState()


    const setAuth = (username, token) => {
        setToken(token);
        setUsername(username);
    };

    useEffect(() => {
        axios
            .get("https://teammate-app.herokuapp.com/session/", {
                headers: {
                    Authorization: `Token ${token}`,
                },
            })
            .then((res) => {
                console.log(res.data);
                setAllGamesList(
                    res.data.map((obj) => ({
                        displayStatus: "join",
                        bgColor: "pink",
                        icon: null,
                        displayUsers: [obj.host_info],
                        buttons: [
                            { label: "Join", job: "send a join request" },
                        ],
                        route: `host/${obj.id}`,
                        ...obj,
                    }))
                );
            });
    }, [token, setAllGamesList]);

    return (
        <ChakraProvider Theme={Theme} Text={Text}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login setAuth={setAuth} />} />
                    <Route
                        path="/new"
                        element={<NewOpenGame token={token} />}
                    />
                    <Route
                        path="survey" element={<Survey setAuth={setAuth}/>} />
                    <Route
                        path="register"
                        element={<Register setAuth={setAuth} />}
                    />
                    <Route
                        path="open-games/"
                        element={
                            <OpenGamesPage
                                token={token}
                                allGamesList={allGamesList}
                                username={username}
                                setGame={setGame}
                                game={game}
                            />
                        }
                    />
                    <Route
                        path="my-games/"
                        element={<MyGames token={token} username={username} game={game} setGame={setGame}/>}>

                        </Route>
                    <Route path="my-games/edit/">
                        <Route
                            path=":id"
                            element={<EditGame token={token} />}
                        />
                    </Route>
                    
                    <Route
                        path=":username"
                        element={
                            <UserProfile
                                token={token}
                                allGamesList={allGamesList}
                            />
                        }
                    />
                </Routes>
            </BrowserRouter>
        </ChakraProvider>
    );
}

export default App;
