import ReactDatePicker from "react-datepicker";
import subDays from "date-fns/subDays";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import { Box, Button, Heading, FormControl, FormLabel, Select, Text, Modal } from "@chakra-ui/react";
import Header from "../components/HeaderMenu";
import Footer from "../components/FooterMenu";
import axios from "axios";
import { DateTime } from "luxon";
import { Link } from "react-router-dom";
import { CloseIcon } from "@chakra-ui/icons";


export default function NewOpenGame({ token }) {
    const [newGameDate, setNewGameDate] = useState("");
    const [newGameTime, setNewGameTime] = useState("");
    const [newGameLoc, setNewGameLoc] = useState("");
    const [newGameSessionType, setNewGameSessionType] = useState("");
    const [newGameMatchType, setNewGameMatchType] = useState("");
    const [error, setError] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [convertedDate, setConvertedDate] = useState("");
    const [convertedTime, setConvertedTime] = useState("");
    const [errorModalIsOpen, setErrorModalIsOpen] = useState(false);


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

    const handleCloseModal = () => {
        console.log("click close error modal");
        setErrorModalIsOpen(false);
    };

    useEffect(() => {
        console.log(newGameDate);
        console.log(convertedDate);
    }, [newGameDate, convertedDate]);

    const handleSubmit = () => {
        console.log(
            newGameDate,
            newGameTime,
            newGameSessionType,
            newGameMatchType,
            newGameLoc,
            convertedDate
        );
        axios
            .post(
                "https://teammate-app.herokuapp.com/session/",
                {
                    date: convertedDate,
                    time: convertedTime,
                    session_type: newGameSessionType,
                    match_type: newGameMatchType,
                    location: newGameLoc,
                },
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            )
            // .then((res)=>{
            //     console.log("posted")
            //     console.log(res)
            // })      
            .catch((error) => {
                setError(error);
                setErrorModalIsOpen(true)

                // alert(error)
            });
    };

    if (submitted) {
        return (
            <AfterSubmit/>
        );
    }

    // if (error) {
    //     return (<Text>Uh oh, something went wrong. Please choose an option for every field before submitting a new game</Text>);
    // }

    if (submitted && !newGameDate) {
        return(<Box><Text>Please choose an option in each of the required fields</Text></Box>)
    }
    // could have this be a modal that opens 

    return (
        <>
        <Header/>
        <Box className="app-body">
            
            <FormControl className="form" mt={20} isRequired>
            <Heading className="form-banner" color='#2C7A7B'>Post a New Game</Heading>
                <FormLabel htmlFor="date-time" p={2}>When would you like to play?</FormLabel>
                <ReactDatePicker
                    onChange={(date) => {
                        console.log(date);
                        setNewGameDate(date);
                        setConvertedDate(
                            DateTime.fromJSDate(date).toISODate(
                                DateTime.DATE_MED
                            )
                        );
                        console.log(newGameDate);
                        console.log(convertedDate);
                    }}
                    minDate={subDays(new Date(), 0)}
                    selected={newGameDate}
                    placeholderText="Click to select a date"
                />
                <ReactDatePicker
                    selected={newGameTime}
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
                    placeholderText="Click to select a time"
                />
                <Box p={2}>
                    <FormLabel htmlFor="location">
                        Where would you like to play?
                    </FormLabel>
                    <Select
                        onChange={handleChangeGameLoc}
                        value={newGameLoc}
                        id="location"
                        name="location"
                    >
                        <option value="" disabled hidden>
                            Choose a location
                        </option>
                        <option value="2">Pullen Park</option>
                        <option value="1">Sanderford Park</option>

                        {/* We could also make an API request for a list of parks, then map through them as dropdown option. This might also help store whatever data other than the park name the backend needs.  */}
                    </Select>
                </Box>
                <Box p={2}>
                    <FormLabel htmlFor="session-type">
                        How competitive would you like your game to be?
                    </FormLabel>
                    <Select
                        onChange={handleChangeSessionType}
                        value={newGameSessionType}
                        id="session-type"
                        name="session-type"
                    >
                        <option value="" disabled hidden>
                            Choose a competitive level
                        </option>
                        <option value="Casual">Casual</option>
                        <option value="Competitive">Competitive</option>
                    </Select>
                </Box>
                <Box p={2}>
                    <FormLabel htmlFor="match-type">
                        Would you like to play singles or doubles?
                    </FormLabel>
                    <Select
                        onChange={handleChangeMatchType}
                        value={newGameMatchType}
                        id="match-type"
                        name="match-type"
                    >
                        <option value="" disabled hidden>
                            Choose number of players
                        </option>
                        <option value="Singles">Singles</option>
                        <option value="Doubles">Doubles</option>
                    </Select>
                </Box>
                <Button colorScheme='teal' onClick={handleSubmit}>Submit</Button>
            </FormControl>

        </Box>
        <Footer/>
            <Modal
                className="modal"
                isOpen={errorModalIsOpen}
                contentLabel="Error Message Modal"
                // className="modal-base"
                overlayClassName="modal-overlay"
            >
                <Button
                    onClick={() => {
                        handleCloseModal();
                    }}
                    className="close-modal-button"
                    variant="ghost"
                    colorScheme="teal"
                >
                    <CloseIcon color="white" />
                </Button><Text>Uh oh, something went wrong. Please choose an option for every field before submitting a new game</Text>
                </Modal>
        </>
    );
}

function AfterSubmit() {
    return (
        <Box>
            <Box>you submitted a game! </Box>
            <Link to={"/my-games"} >Return to My Games</Link>
        </Box>
    );
}