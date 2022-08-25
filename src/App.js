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
    const [surveyGame, setSurveyGame] = useState(null)
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
                        displayStatus: "open to join",
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

    // this is to hardcode a game to get Survey ready to connect to BE 
    useEffect(() => {
        const sampleGames= [{
        id: 3,
        host: "rachelk",
        host_info: {
            id: 2,
            username: "SampleUser 1",
            first_name: "Rachel",
            last_name: "Kelly",
            profile: {
                id: 1,
                user: "rachelk",
                profile_pic: "",
                ntrp_rating: "2.5",
                profile_image_file: null
            }
        },
        date: "2022-08-27",
        time: "07:00:00",
        session_type: "Competitive",
        match_type: "Singles",
        location: 1,
        location_info: {
            id: 1,
            park_name: "Pullen Park",
            court_count: 5,
            court_surface: "Hard Court",
            address: {
                id: 1,
                court: "Pullen Park",
                address1: null,
                address2: null,
                city: "Raleigh",
                state: "NC",
                zipcode: "27606"
            }
        },
        guest: [],
        guest_info: [
            {
                id: 1,
                user: "SampleUser 2",
                game_session: 13,
                status: "Accepted"
            },
            {
                id: 2,
                user: "SampleUser 3",
                game_session: 12,
                status: "Accepted"
            }
        ],
        confirmed: true
        }]
        setSurveyGame(sampleGames.map((obj)=>({
            displayUsers: [
                obj.host_info,
                ...obj.guest_info,
            ],
            ...obj
        }
        )))
    },[])

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
                        path="survey" element={<Survey setAuth={setAuth} token={token} surveyGame={surveyGame}/>} />
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
                        element={<MyGames token={token} username={username} game={game} setGame={setGame}/>}
                    />
                    <Route path="/edit/">
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
