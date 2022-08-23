import ReactDatePicker from "react-datepicker";
import Header from "../components/HeaderMenu";
import Footer from "../components/FooterMenu";
import subDays from "date-fns/subDays";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import { Box, Button, Select, Heading, FormControl, FormLabel } from "@chakra-ui/react";
import axios from "axios";
import { DateTime } from "luxon";
import { useParams } from 'react-router-dom';


export default function EditGame({ token }) {
    const [params] = useState(useParams())
    const [game, setGame] = useState({})
    const [newGameDate, setNewGameDate] = useState("");
    const [newGameTime, setNewGameTime] = useState("");
    const [newGameLoc, setNewGameLoc] = useState("");
    const [locPK, setlocPK] = useState(game.location)
    const [newGameSessionType, setNewGameSessionType] = useState("");
    const [newGameMatchType, setNewGameMatchType] = useState("");
    const [error, setError] = useState("");
    // const [submitted, setSubmitted] = useState(false);
    const [editSubmitted, setEditSubmitted] = useState(false)
    const [convertedDate, setConvertedDate] = useState("");
    const [convertedTime, setConvertedTime] = useState("");

    console.log(params)

    const handleChangeGameLoc = (event) => {
        console.log(event.target.value);
        setNewGameLoc(event.target.value);
    };

    const handleChangeSessionType = (event) => {
        console.log(event.target.value);
        setNewGameSessionType(event.target.value);
    };

    const handleChangeMatchType = (event) => {
        console.log(event.target.value);
        setNewGameMatchType(event.target.value);
    };

    const prepareFields = (gameData) => {
        setNewGameSessionType(gameData.session_type)
        setNewGameLoc(gameData.location_info.park_name)
        setNewGameMatchType(gameData.match_type)
        setConvertedDate(gameData.date)
        setConvertedTime(gameData.time)
        // setNewGameDate(gameData.date)
        setlocPK(gameData.location)
        console.log(gameData.time)
        console.log(gameData.date)
    }

useEffect(() => {
    console.log(params.id)
    console.log(typeof(params.id))
    console.log(parseInt(params.id))
    console.log(typeof(parseInt(params.id)))
    console.log(token)
    console.log('load game to be edited')
    async function getGame() {
        let response = await axios.get(`https://teammate-app.herokuapp.com/session/${parseInt(params.id)}`, {headers: {
            Authorization: `Token ${token}`,
        },
        })
        // .then((res) =>{
        //     console.log(res.data)
        //     setGame(res.data)
        //     setNewGameSessionType(res.data.session_type)
        //     setNewGameLoc(res.data.location_info.park_name)
        //     setNewGameMatchType(res.data.match_type)
        //     setConvertedDate(res.data.date)
        //     setConvertedTime(res.data.time)
        // })
        let resJson = await response.data;
        console.log(response.data)
        console.log(resJson)
        setGame(resJson)
        prepareFields(resJson);
        // setlocPK(resJson.location)
    }
    getGame()
    console.log(game)
}, [params.id, token])

    const handleSubmitEdit = () => {
        console.log(
            newGameDate,
            newGameTime,
            newGameSessionType,
            newGameMatchType,
            newGameLoc,
            convertedDate
        );
        axios
            .patch(
                `https://teammate-app.herokuapp.com/session/${parseInt(params.id)}`,
                {
                    date: convertedDate,
                    time: convertedTime,
                    session_type: newGameSessionType,
                    match_type: newGameMatchType,
                    location: locPK,
                },
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            )
            .then(console.log("edit posted"))
            .catch((error) => {
                alert(error.response.data.detail)
            });
        setEditSubmitted(true);
    };

    if (editSubmitted) {
        return (
            <Box>you submitted an edit! </Box>
        );
    }

    if (error) {
        return { error };
    }

    return (
        <>
        <Header/>
        <Box className="app-body">
            <Heading>Edit your Game</Heading>
            <FormControl>
                <FormLabel htmlFor="date-time">Game Day</FormLabel>
                <ReactDatePicker 
                onChange={(date) => {
                    console.log(date)
                    setNewGameDate(date)
                    setConvertedDate(DateTime.fromJSDate(date).toISODate(DateTime.DATE_MED))
                }}
                minDate={subDays(new Date(), 0)}
                Selected={newGameDate}
                placeholderText={DateTime.fromISO(game.time).toLocaleString(DateTime.DATE_SHORT)}
                />
                <ReactDatePicker
                    Selected={newGameTime}
                    onChange={(date) => {
                        setNewGameTime(date);
                        setConvertedTime(
                            DateTime.fromJSDate(date).toLocaleString(
                                DateTime.TIME_24_WITH_SECONDS
                            )
                        );
                        console.log(newGameTime);
                        console.log(convertedTime);
                    }}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    // placeholderText={newGameTime}

                    placeholderText={DateTime.fromISO(game.time).toLocaleString(DateTime.TIME_SIMPLE)}
                />
                <Box>
                    <FormLabel htmlFor="location">
                       Court
                    </FormLabel>
                    <Select w='50%' size='s' variant='filled'
                        onChange={handleChangeGameLoc}
                        value={newGameLoc}
                        id="location"
                        name="location"
                    >
                        <option value={locPK}>
                            {newGameLoc}
                        </option>
                        <option value="2">Pullen Park</option>
                        <option value="1">Sanderford Park</option>
                    </Select>
                </Box>
                <Box>
                    <FormLabel htmlFor="session-type">
                      Casual or Competitive?
                    </FormLabel>
                    <Select w='50%' size='s' variant='filled'
                        onChange={handleChangeSessionType}
                        value={newGameSessionType}
                        id="session-type"
                        name="session-type"
                    >
                        <option value={newGameSessionType} disabled hidden>
                            {newGameSessionType}
                        </option>
                        <option value="Casual">Casual</option>
                        <option value="Competitive">Competitive</option>
                    </Select>
                </Box>
                <Box>
                    <FormLabel htmlFor="match-type">
                        Game Type
                    </FormLabel>
                    <Select w='50%' size='s' variant='filled'
                        onChange={handleChangeMatchType}
                        value={newGameMatchType}
                        id="match-type"
                        name="match-type"
                    >
                        <option value={newGameMatchType} disabled hidden>
                            {newGameMatchType}
                        </option>
                        <option value="Singles">Singles</option>
                        <option value="Doubles">Doubles</option>
                    </Select>
                </Box>
                <Button colorScheme='teal' w='50%' onClick={()=>handleSubmitEdit()}>Submit</Button>
            </FormControl>  
        </Box>
        <Footer/>
        </>
    );
}


