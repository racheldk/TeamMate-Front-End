import ReactDatePicker from "react-datepicker";
import Header from "../components/HeaderMenu";
import Footer from "../components/FooterMenu";
import subDays from "date-fns/subDays";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Select,
    Heading,
    FormControl,
    FormLabel,
} from "@chakra-ui/react";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
    CloseButton,
} from "@chakra-ui/react";
import axios from "axios";
import { DateTime } from "luxon";
import { useParams } from "react-router-dom";

export default function EditGame({ token }) {
    const [params] = useState(useParams());
    const [game, setGame] = useState({});
    const [newGameDate, setNewGameDate] = useState("");
    const [displayDate, setDisplayDate] = useState(null);
    const [newGameLoc, setNewGameLoc] = useState("");
    const [locPK, setlocPK] = useState(game.location);
    const [newGameSessionType, setNewGameSessionType] = useState("");
    const [newGameMatchType, setNewGameMatchType] = useState("");
    const [error, setError] = useState("");
    const [editSubmitted, setEditSubmitted] = useState(false);
    const { isOpen, onClose, onOpen } = useDisclosure();
    const [alertTitle, setAlertTitle] = useState(null);
    const [alertMessage, setAlertMessage] = useState(null);


    console.log(params);
    console.log(newGameDate)
    console.log(displayDate)

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
        console.log(gameData.datetime)
        setNewGameSessionType(gameData.session_type);
        setNewGameLoc(gameData.location_info.park_name);
        setNewGameMatchType(gameData.match_type);
        setlocPK(gameData.location);
        setNewGameDate(DateTime.fromISO(gameData.datetime).toJSDate())
        console.log(gameData.datetime);
    };

    useEffect(() => {
        console.log(params.id);
        console.log(typeof params.id);
        console.log(parseInt(params.id));
        console.log(typeof parseInt(params.id));
        console.log(token);
        console.log("load game to be edited");
        async function getGame() {
            let response = await axios.get(
                `https://teammate-app.herokuapp.com/session/${parseInt(
                    params.id
                )}`,
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            );
            let resJson = await response.data;
            console.log(response.data);
            console.log(resJson);
            setGame(resJson);
            prepareFields(resJson);
        }
        getGame();
        console.log(game);
    }, [params.id, token]);

    const handleSubmitEdit = () => {
        console.log(
            newGameDate,
            newGameSessionType,
            newGameMatchType,
            newGameLoc,
        );
        axios
            .patch(
                `https://teammate-app.herokuapp.com/session/${parseInt(
                    params.id
                )}`,
                {
                    datetime: newGameDate,
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
            .then((res)=>{
            console.log(res)
            if (res.statusText==='OK') {
                console.log('game edited')
                setAlertMessage(`${res.data.location_info.park_name} ${DateTime.fromISO(res.data.datetime).toLocaleString(
                    DateTime.DATETIME_MED_WITH_WEEKDAY
                )}, ${res.data.match_type}, ${res.data.session_type}`)
                setAlertTitle('You have edited your game')
                onOpen()
            }
        })
        .catch((error) => {
            console.log(error);
            const errorDetails = Object.values(error.response.data) 
            console.log(errorDetails)
            const detailMessages = []
            for (const error of errorDetails) {
                detailMessages.push(error[0])
            }
            console.log(detailMessages)
            console.log("there was an error");
            setAlertTitle("Uh oh, something went wrong. Please make sure you fill out all fields.");
            setAlertMessage(detailMessages);
            onOpen()
        });
    };


    return (
        <>
            <Header />
            <Box className="app-body">
                <FormControl className="form" marginTop={5}>
                <Heading className="form-banner" color='#234E52'>Edit your Game</Heading>
                    <FormLabel htmlFor="date-time" m={2} color='#285E61'>Game Day</FormLabel>
                    <ReactDatePicker
                        onChange={(date) => {
                            console.log(date);
                            setNewGameDate(date);
                            setDisplayDate(DateTime.fromJSDate(date).toISO())
                        }}
                        showTimeSelect
                        timeIntervals={15}
                        minDate={subDays(new Date(), 0)}
                        selected={newGameDate}
                        dateFormat="MMM d, yyyy    h:mm aa"
                    />
                    <Box m={2}>
                        <FormLabel htmlFor="location" color='#285E61'>Court</FormLabel>
                        <Select
                            w="100%"
                            onChange={handleChangeGameLoc}
                            value={newGameLoc}
                            id="location"
                            name="location"
                        >
                            <option value={locPK}>{newGameLoc}</option>
                            <option value="2">Pullen Park</option>
                            <option value="1">Sanderford Park</option>
                        </Select>
                    </Box>
                    <Box m={2}>
                        <FormLabel htmlFor="session-type" color='#285E61'>
                            Style
                        </FormLabel>
                        <Select
                            w="100%"
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
                    <Box m={2}>
                        <FormLabel htmlFor="match-type" color='#285E61'>Players</FormLabel>
                        <Select
                            w="100%"
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
                    <Button
                        colorScheme="teal"
                        w="50%"
                        onClick={() => handleSubmitEdit()}
                    >
                        Submit
                    </Button>
                </FormControl>

                <AlertDialog isOpen={isOpen} onClose={onClose}>
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <CloseButton
                                alignSelf="flex-end"
                                position="relative"
                                // right={-1}
                                // top={-1}
                                onClick={() => {
                                    onClose();
                                }}
                            />
                            <AlertDialogHeader>{alertTitle}</AlertDialogHeader>
                            <AlertDialogBody>{alertMessage}</AlertDialogBody>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            </Box>
            <Footer />
        </>
    );
}
