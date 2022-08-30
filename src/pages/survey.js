import { IconButton, scaleFadeConfig } from "@chakra-ui/react";
import { Button, Box, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
    BsEmojiFrownFill,
    BsFillEmojiNeutralFill,
    BsFillEmojiSmileFill,
} from "react-icons/bs";
import axios from "axios";
import { useParams } from "react-router-dom";
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
import { DateTime } from "luxon";


const Survey = ({ token }) => {
    const [surveyPK, setSurveyPK] = useState(null);
    const [params] = useState(useParams());
    const [isLoading, setIsLoading] = useState(true);
    const { isOpen, onClose, onOpen } = useDisclosure();
    const [alertTitle, setAlertTitle] = useState(null);
    const [alertMessage, setAlertMessage] = useState(null);
    const [game, setGame] = useState(null)

    const surveyResponses = [];

    console.log(game)

    useEffect(() => {
        console.log(params.id);
        console.log("load game data");
        axios
            .get(
                `https://teammate-app.herokuapp.com/session/${parseInt(
                    params.id
                )}`,
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            )
            .then((res) => {
                console.log(res.data);
                const confirmedPlayers = [];
                for (let guest of res.data.guest_info) {
                    if (
                        guest.status === "Host" ||
                        guest.status === "Accepted"
                    ) {
                        confirmedPlayers.push(guest);
                    }
                }
                const game = {
                    displayUsers: confirmedPlayers,
                    ...res.data,
                };
                setGame(game)
            })
            .catch((error) => {
                console.log(error);
                console.log("there was an error");
                setAlertTitle("Uh oh, something went wrong. ");
                setAlertMessage(error.message);
                onOpen();
            });

        setIsLoading(false)
    }, [params]);

    useEffect(() => {
        console.log('send post request to create survey object')
        axios.post(`https://teammate-app.herokuapp.com/session/${parseInt(
            params.id
        )}/survey`, {

        },{
            headers: {
                Authorization: `Token ${token}`,
            },
        }
        )
        .then((res) =>{
            console.log(res)
            setSurveyPK(8)
            // setSurveyPK(res.data)
        })
        .catch((error) => {
            console.log(error);
            console.log("there was an error");
            setAlertTitle("Uh oh, something went wrong. ");
            setAlertMessage(error.message);
            onOpen();
        });
    }, []);

    // const sampleResponses = [
    //     {
    //         about_user: 1,
    //         response: "Winner",
    //     },
    //     {
    //         about_user: 2,
    //         response: "No Show",
    //     },
    // ];

    const handleSubmit = () => {
        console.log(surveyResponses);
        console.log(surveyPK);
        const axiosPosts = surveyResponses.map((obj) =>
            axios
                .post(
                    `https://teammate-app.herokuapp.com/session/${game.id}/survey/${surveyPK}/response`,
                    {
                        obj,
                    },
                    {
                        headers: {
                            Authorization: `Token ${token}`,
                        },
                    }
                )
                .then((res) => {
                    console.log(res);
                })
                .catch((error) => {
                    console.log(error);
                    console.log("there was an error");
                    setAlertTitle("Uh oh, something went wrong. ");
                    setAlertMessage(error.message);
                    onOpen();
                })
        );
        console.log(axiosPosts);
    };
    // ??!!! Where does the user go after their survey is submitted?

    if(isLoading) {
        return <Box>...Loading</Box>
    }

    return (
        <Box className="survey">
            {game && (

                <Box>
                <Heading
                    color="teal"
                    size="md"
                    // marginLeft="90px"
                    >
                    {game.session_type}{" "}{game.match_type} on {DateTime.fromISO(game.datetime).toLocaleString(
                            DateTime.DATETIME_MED
                        )}
                </Heading>

                <Box marginLeft="10px" marginRight="12px">
                    <Text
                        mt={4}
                        colorScheme="teal"
                        backgroundColor="teal"
                        paddingLeft="10px"
                        borderRadius="5px"
                        height="40px"
                        fontSize="14px"
                        width="335px"
                        display="table-cell"
                        verticalAlign="middle"
                        color="white"
                        >
                        Did anyone NOT come to the game?
                    </Text>
                    <Button
                        _focus={{ backgroundColor: "#4FD1C5" }}
                        _active={{
                            transform: "translateY(5px)",
                            color: "white",
                        }}
                        variant="outline"
                        backgroundColor="white"
                        colorScheme=""
                        color="teal"
                        height="30px"
                        width="318px"
                        letterSpacing="1px"
                        fontSize="13px"
                        m={2}
                        >
                        No, everyone came
                    </Button>
                    {game.displayUsers.map((user) => (
                        <Button
                        className="won"
                        _focus={{ backgroundColor: "#4FD1C5" }}
                        _active={{
                            transform: "translateY(5px)",
                            color: "white",
                        }}
                        variant="outline"
                        backgroundColor="white"
                        colorScheme=""
                        color="teal"
                        height="30px"
                        width="150px"
                        letterSpacing="2px"
                        fontSize="13px"
                        key={user.user_info.user_id}
                        m={2}
                        onClick={() => {
                            console.log({
                                about_user: user.user_info.user_id,
                                response: "No Show",
                            });
                            surveyResponses.push({
                                about_user: user.user_info.user_id,
                                response: "No Show",
                            });
                            console.log(surveyResponses)
                        }}
                        >
                            {user.user_info.first_name}
                        </Button>
                    ))}
                    <br />

                    <Text
                        mt={3}
                        backgroundColor="teal"
                        paddingLeft="10px"
                        borderRadius="5px"
                        height="40px"
                        color="white"
                        fontSize="14px"
                        width="335px"
                        display="table-cell"
                        verticalAlign="middle"
                        >
                        Who won?
                    </Text>
                    {game.displayUsers.map((user) => (
                        <Button
                        _focus={{ backgroundColor: "#4FD1C5" }}
                        _active={{
                            transform: "translateY(5px)",
                            color: "white",
                        }}
                        variant="outline"
                        backgroundColor="white"
                        colorScheme=""
                        color="teal"
                        height="30px"
                        width="150px"
                        letterSpacing="2px"
                        fontSize="13px"
                        key={user.user_info.user_id}
                        m={2}
                        onClick={() => {
                            console.log({
                                about_user: user.user_info.user_id,
                                response: "Winner",
                            });
                            surveyResponses.push({
                                about_user: user.user_info.user_id,
                                response: "Winner",
                            });
                            console.log(surveyResponses)
                        }}
                        >
                            {user.user_info.first_name}
                        </Button>
                    ))}

                    <br />
                    <Text
                        mt={3}
                        backgroundColor="teal"
                        paddingLeft="10px"
                        borderRadius="5px"
                        color="white"
                        height="40px"
                        fontSize="14px"
                        width="335px"
                        display="table-cell"
                        verticalAlign="middle"
                        >
                        Would you like to block anyone from your future games?
                    </Text>
                    <Button
                        _focus={{ backgroundColor: "#4FD1C5" }}
                        _active={{
                            transform: "translateY(5px)",
                            color: "white",
                        }}
                        variant="outline"
                        backgroundColor="white"
                        colorScheme=""
                        color="teal"
                        height="30px"
                        width="318px"
                        letterSpacing="1px"
                        fontSize="13px"
                        m={2}
                        >
                        No, I would play with them again
                    </Button>
                    {game.displayUsers.map((user) => (
                        <Button
                        _focus={{ backgroundColor: "#4FD1C5" }}
                        _active={{
                            transform: "translateY(5px)",
                            color: "white",
                        }}
                        variant="outline"
                        backgroundColor="white"
                        colorScheme=""
                        color="teal"
                        height="30px"
                        width="150px"
                        letterSpacing="2px"
                        fontSize="13px"
                        key={user.user_info.user_id}
                        m={2}
                        onClick={() => {
                            console.log({
                                about_user: user.user_info.user_id,
                                response: "Block User",
                            });
                            surveyResponses.push({
                                about_user: user.user_info.user_id,
                                response: "Block User",
                            });
                            console.log(surveyResponses)
                        }}
                        >
                            {user.user_info.first_name}
                        </Button>
                    ))}
                    <br />
                    <Text
                        mt={3}
                        backgroundColor="teal"
                        paddingLeft="10px"
                        borderRadius="5px"
                        color="white"
                        height="40px"
                        fontSize="14px"
                        width="335px"
                        display="table-cell"
                        verticalAlign="middle"
                        >
                        How do you rate the court quality at{" "}
                        {game.location_info.park_name}?
                    </Text>
                    <div className="icon-survey">
                        <IconButton
                            aria-label="ProfileItem"
                            fontSize="2.5em"
                            colorScheme="green"
                            color="#8fbc8f"
                            _focus={{ color: "#32CD32" }}
                            _hover={{ transform: "scale(1.5)" }}
                            border="none"
                            variant="outline"
                            className=""
                            icon={<BsFillEmojiSmileFill />}
                            onClick={() => {
                                console.log({
                                    about_court: game.location,
                                    response: "High Quality",
                                });
                                surveyResponses.push({
                                    about_court: game.location,
                                    response: "High Quality",
                                });
                                console.log(surveyResponses)
                            }}
                            />
                        <IconButton
                            aria-label="ProfileItem"
                            fontSize="2.5em"
                            colorScheme="yellow"
                            color="#f0e68c"
                            _focus={{ color: "#ffd700" }}
                            _hover={{ transform: "scale(1.5)" }}
                            border="none"
                            variant="outline"
                            className=""
                            icon={<BsFillEmojiNeutralFill />}
                            onClick={() => {
                                console.log({
                                    about_court: game.location,
                                    response: "Average Quality",
                                });
                                surveyResponses.push({
                                    about_court: game.location,
                                    response: "Average Quality",
                                });
                                console.log(surveyResponses)
                            }}
                            />
                        <IconButton
                            aria-label="Search Item"
                            fontSize="2.5em"
                            colorScheme="red"
                            color="#ab4b52"
                            _focus={{ color: "#ed1c24" }}
                            _hover={{ transform: "scale(1.5)" }}
                            border=""
                            variant="outline"
                            className=""
                            icon={<BsEmojiFrownFill />}
                            onClick={() => {
                                console.log({
                                    about_court: game.location,
                                    response: "Poor Quality",
                                });
                                surveyResponses.push({
                                    about_court: game.location,
                                    response: "Poor Quality",
                                });
                                console.log(surveyResponses)
                            }}
                            />
                    </div>

                    <Button
                        marginLeft="85px"
                        width="150px"
                        height="30px"
                        // variant="ghost"
                        colorScheme="teal"
                        backgroundColor="teal"
                        color="white"
                        onClick={() => handleSubmit()}
                        >
                        Submit
                    </Button>
                </Box>
            </Box>
        )}
        </Box>
    );
};

export default Survey;


