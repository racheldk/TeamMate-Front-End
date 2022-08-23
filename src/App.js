import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewOpenGame from "./pages/newOpenGame";
import { useEffect, useState } from "react";
import OpenGamesList from "./pages/openGamesPage";
import { ChakraProvider } from "@chakra-ui/react";
import Login from "./pages/login.js";
import Register from "./pages/register";
import Theme from "./components/theme";
import { Text } from "@chakra-ui/react";
import useLocalStorageState from "use-local-storage-state";
import UserProfile from "./pages/userProfile";
import axios from "axios";
import EditGame from "./pages/editGame";
import OpenGameDetail from "./components/OpenGameDetail";
import MyGames from "./pages/myGamesPage";
import OpenGamesPage from "./pages/openGamesPage";
import IncomingRequestDetail from "./components/IncomingRequestDetail";

function App() {
    const [token, setToken] = useLocalStorageState("teammateToken", null);
    const [username, setUsername] = useLocalStorageState(
        "teammateUsername",
        null
    );
    const [listType, setListType] = useState(null);
    //   above is the listType to be used with GamesList component (which is rendered from OpenGamesList and MyGames components)
    const [allGamesList, setAllGamesList] = useState([]);

    const setAuth = (username, token) => {
        setToken(token);
        setUsername(username);
    };

    useEffect(() => {
        // setListType("allOpen")
        axios
            .get("https://teammate-app.herokuapp.com/session/", {
                headers: {
                    Authorization: `Token ${token}`,
                },
            })
            .then((res) => {
                console.log(res.data);
                setAllGamesList(res.data);
            });
    }, [token, setAllGamesList]);

    return (
        <ChakraProvider Theme={Theme} Text={Text}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login setAuth={setAuth} />} />
                    {/* All Open Games (Game List component? separate component?) */}
                    <Route
                        path="/new"
                        element={<NewOpenGame token={token} />}
                    />
                    {/* make a new open game post  */}
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
                            />
                        }
                    />
                    <Route
                        path="open-games/:id"
                        element={<OpenGameDetail token={token}  />}
                    />
                    {/* login */}
                    <Route
                        path="my-games"
                        element={<MyGames token={token} username={username}/>}
                        // element={
                        //     <MyGames
                        //         token={token}
                        //         username={username}
                        //         listType={listType}
                        //         setListType={setListType}
                        //         allGamesList={allGamesList}
                        //     />
                        // }
                    />
                    {/* my games - confirmed, pending requests as guest, pending requests as host, open */}
                    <Route path="/edit/">
                        <Route
                            path=":id"
                            element={<EditGame token={token} />}
                        />
                    </Route>
                    <Route path="incoming/:id" element={<IncomingRequestDetail token={token}/>}/>
                    <Route
                        path=":username"
                        element={
                            <UserProfile
                                token={token}
                                listType={listType}
                                setListType={setListType}
                                allGamesList={allGamesList}
                            />
                        }
                    />
                    {/* This will be a user profile (Team Quokka did something like this with the users/:id route)  */}
                </Routes>
            </BrowserRouter>
        </ChakraProvider>
    );
}

export default App;
