import ReactDatePicker from "react-datepicker";
import subDays from "date-fns/subDays";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Heading,
    FormControl,
    FormLabel,
    Select,
} from "@chakra-ui/react";
import Header from "../components/HeaderMenu";
import Footer from "../components/FooterMenu";
import axios from "axios";
import { DateTime } from "luxon";
import { Link } from "react-router-dom";

export default function NewOpenGame({ token }) {
    const [newGameDate, setNewGameDate] = useState("");
    const [newGameLoc, setNewGameLoc] = useState("");
    const [newGameSessionType, setNewGameSessionType] = useState("");
    const [newGameMatchType, setNewGameMatchType] = useState("");
    const [error, setError] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [convertedDate, setConvertedDate] = useState("");
    const [convertedTime, setConvertedTime] = useState("");

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

    useEffect(() => {
        console.log(newGameDate);
        console.log(convertedDate);
    }, [newGameDate, convertedDate]);

    const handleSubmit = () => {
        console.log(
            newGameDate,
            newGameSessionType,
            newGameMatchType,
            newGameLoc,
            convertedDate
        );
        axios
            .post(
                "https://teammate-app.herokuapp.com/session/",
                {
                    datetime: newGameDate,
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
            .then(console.log("posted"))
            .catch((error) => {
                setError(error.message);
            });
        setSubmitted(true);
    };

    if (submitted) {
        return <AfterSubmit />;
    }

    if (error) {
        return { error };
    }

    return (
        <>
            <Header />
            <Box className="app-body">
                <FormControl className="form" mt={20}>
                    <Heading className="form-banner" color="#234E52">New Game</Heading>

                    <Box display="Flex" m={4} fontSize="18px" 
                    color='teal' fontWeight="extrabold">

                        <ReactDatePicker 
                            onChange={(date) => {
                                console.log(date);
                                setNewGameDate(date);
                            }}
                            showTimeSelect
                            timeIntervals={15}
                            minDate={subDays(new Date(), 0)}
                            selected={newGameDate}
                            placeholderText="When"
                            dateFormat="MMM d, yyyy    h:mm aa"
                        />
                    </Box>
                    <Box p={3}>
                        <FormLabel htmlFor="location"></FormLabel>
                        <Select
                            onChange={handleChangeGameLoc}
                            value={newGameLoc}
                            id="location"
                            name="location"
                        >
                            
                            <option value="" disabled hidden>
                                Where
                            </option>
                            <option value="1">Pullen Park</option>
                            <option value="2">Sanderford Park</option>
                        </Select>
                    </Box>
                    <Box p={3}>
                        <FormLabel htmlFor="session-type"></FormLabel>
                        <Select
                            onChange={handleChangeSessionType}
                            value={newGameSessionType}
                            id="session-type"
                            name="session-type"
                        >
                            <option value="" disabled hidden>
                                Level
                            </option>
                            <option value="Casual">Casual</option>
                            <option value="Competitive">Competitive</option>
                        </Select>
                    </Box>
                    <Box p={3}>
                        <FormLabel htmlFor="match-type"></FormLabel>
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
                    <Button m={4} colorScheme="teal" onClick={handleSubmit}>
                        Submit
                    </Button>
                </FormControl>
            </Box>
            <Footer />
        </>
    );
}

function AfterSubmit() {
    return (
        <Box className="app-body" display='grid' gridTemplateColumns='auto'>
            <Box p={10} className="form" color="teal"><Heading fontSize='1em' marginBottom={2}>Your Game's Live!</Heading>
            <Link to={"/my-games"} ><Button fontSize="12px"   marginBottom={2} variant="" colorScheme="" color="white" 
            height="30px" width="150px" backgroundColor="teal">Go to My Games</Button></Link>
            <Link to={"/open-games"} ><Button  fontSize="12px" variant="outline" colorScheme="teal" color="teal" 
            height="30px" width="150px">Return to Open Games</Button></Link>
        </Box>
        </Box>
    );
}
