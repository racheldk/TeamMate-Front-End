import {
    Text,
    Heading,
    Image,
    Button,
    IconButton,
    Box,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { DateTime } from "luxon";
import noImage from "../images/no-image.jpg";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useState } from "react";
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

export default function GameDetail({
    token,
    game,
    username,
    reload,
    setReload,
    setPastGameModalIsOpen,
    setModalIsOpen,
}) {
    const [editClicked, setEditClicked] = useState(false);
    const [surveyClicked, setSurveyClicked] = useState(false);
    const { isOpen, onClose, onOpen } = useDisclosure();
    const [alertTitle, setAlertTitle] = useState(null);
    const [alertMessage, setAlertMessage] = useState(null);

    console.log(game);
    console.log(token);

    const handleCloseModal = () => {
        console.log("click close");
        setModalIsOpen(false);
    };

    // const handleClosePastGameModal = () => {
    //     setPastGameModalIsOpen(false);
    // };


    const handleClick = (game, button) => {
        if (game.displayStatus === "join") {
            joinSession(game);
        }
        if (button.job === "handleAccept") {
            acceptRequest(game);
        }
        if (button.job === "handleReject") {
            rejectRequest(game);
        }
        if (
            (game.displayStatus === "confirmed" && game.host === username) ||
            button.label === "Delete this game" ||
            game.displayStatus === "host open doubles"
        ) {
            cancelGame(game);
        }
        if (
            (game.displayStatus === "confirmed" && game.host !== username) ||
            game.displayStatus === "pendingPOVGuest" ||
            game.displayStatus === "guest open doubles"
        ) {
            cancelGuest(game);
        }
        if (button.label === "Edit this game") {
            console.log("edit clicked");
            handleCloseModal();
            setEditClicked(true);
        }
        if (button.label === "Take Survey") {
            console.log("take survey clicked")
            handleCloseModal()
            setSurveyClicked(true)
        }
    };

    if (editClicked) {
        console.log(game);
        return <Navigate to={`edit/${game.game_session_id}`} />;
    }

    if (surveyClicked) {
        console.log(game)
        return <Navigate to={`survey/${game.game_session_id}`} />
    }

    const joinSession = (game) => {
        console.log("join click");
        console.log(game);
        axios
            .post(
                `https://teammate-app.herokuapp.com/session/${game.game_session_id}/guest/`,
                {},
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            )

            .then((res) => {
                console.log(res.data);
                console.log("guest posted");
                if (res.data.guest_id) {
                    console.log("if includes guest - yes");
                    setAlertMessage(`Your request to join this game has been sent. Stay tuned for a confirmation from the host.`);
                    setAlertTitle("Yay!");
                    onOpen()
                } else {
                    setAlertTitle("oh nooooo!!!!");
                    setAlertMessage("Something has gone terribly wrong");
                }
                // setReload(reload+1) This happen when the alert is closed
            })
            .catch((error) => {
                console.log(error)
                console.log('there was an error')
                setAlertTitle('Uh oh, something went wrong. ')
                setAlertMessage(error.message)
                onOpen()
            })
    };

    const acceptRequest = (game) => {
        console.log("accept request click");
        console.log(game);
        axios
            .patch(
                `https://teammate-app.herokuapp.com/session/${game.game_session_id}/guest/${game.displayUsers[0].guest_id}/`,
                { status: "Accepted" },
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            )
            .then((res) => {
                console.log(res)
                console.log("acceptRequest patch sent");
                if (res.data.status==='Accepted') {
                    console.log("response includes accepted guest status");
                    setAlertMessage(`You accepted a ${res.data.user_info.first_name}'s request to join your game.`);
                    setAlertTitle("This is going to be a great game!");
                    onOpen()
                } else {
                    setAlertTitle("oh nooooo!!!!");
                    setAlertMessage("Something has gone terribly wrong");
                }
                
            })
            .catch((error) => {
                console.log(error)
                console.log('there was an error')
                setAlertTitle('Uh oh, something went wrong. ')
                setAlertMessage(error.message)
                onOpen()
            })
    };

    const rejectRequest = (game) => {
        console.log("reject request click");
        console.log(game);
        axios
            .patch(
                `https://teammate-app.herokuapp.com/session/${game.game_session_id}/guest/${game.displayUsers[0].guest_id}/`,
                { status: "Rejected" },
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            )
            .then((res) => {
                console.log(res)
                console.log("rejectRequest patch sent");
                if (res.data.status==='Rejected') {
                    console.log("response includes rejected guest status");
                    setAlertMessage(`You chose not to accept ${res.data.user_info.first_name}'s request to join your game.`);
                    setAlertTitle("Request not accepted.");
                    onOpen()
                } else {
                    setAlertTitle("oh nooooo!!!!");
                    setAlertMessage("Something has gone terribly wrong");
                }
            })
            .catch((error) => {
                console.log(error)
                console.log('there was an error')
                setAlertTitle('Uh oh, something went wrong. ')
                setAlertMessage(error.message)
                onOpen()
            })
    };

    const cancelGame = (game) => {
        console.log("join click");
        console.log(game);
        axios
            .delete(`https://teammate-app.herokuapp.com/session/${game.game_session_id}`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            })
            .then((res) => {
                console.log(res)
                console.log("delete game sent");
                if (res.status===204) {
                    console.log("response indicates game deleted");
                    setAlertMessage(`We get it, you didn't want to play that game.`);
                    setAlertTitle("Game deleted");
                    onOpen()
                } else {
                    setAlertTitle("oh nooooo!!!!");
                    setAlertMessage("Something has gone terribly wrong");
                }
            })
            .catch((error) => {
                console.log(error)
                console.log('there was an error')
                setAlertTitle('Uh oh, something went wrong. ')
                setAlertMessage(error.message)
                onOpen()
            })
    };

    const cancelGuest = (game) => {
        console.log("cancel guest click");
        console.log(game);
        axios
            .delete(
                `https://teammate-app.herokuapp.com/session/${game.game_session_id}/guest/`,
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            )
            .then((res) => {
                console.log(res)
                console.log("delete guest session sent");
                if (res.status===204) {
                    console.log("response indicates game deleted");
                    setAlertMessage(`We get it, you didn't want to play that game.`);
                    setAlertTitle("Guest request deleted");
                    onOpen()
                } else {
                    setAlertTitle("oh nooooo!!!!");
                    setAlertMessage("Something has gone terribly wrong");
                    onOpen()
                }
            })
            .then(() =>{
                console.log('2nd then')
                setReload(reload+1)
            })
            .catch((error) => {
                console.log(error)
                console.log('there was an error')
                setAlertTitle('Uh oh, something went wrong. ')
                setAlertMessage(error.message)
                onOpen()
            })
    };

    return (
        <Box className="modal-overlay">
            <Box textAlign="right" className="modal">
                <IconButton
                    onClick={() => handleCloseModal()}
                    className="close-modal-button"
                    variant="outline"
                    colorScheme="teal"
                >
                    <CloseIcon color="white" />
                </IconButton>

                <Box
                    className="modal-base"
                    display="flex"
                    flexWrap="wrap"
                    key={game.id}
                    justifyContent="center"
                >
                    <Box
                        w="350px"
                        display="flex"
                        justifyContent="center"
                        flexWrap="wrap"
                    >
                        {game.displayUsers.length > 0 &&
                            game.displayUsers.map((user) => (
                                <Box key={user.user_id} m="auto" p=".5em">
                                    <Heading fontSize="xl">{`${user.user_info.first_name} ${user.user_info.last_name}`}</Heading>
                                    <Text>{`@${user.user}`}</Text>
                                    <Box w="100px" h="100px" m="auto">
                                        <Image
                                            className="profile_pic"
                                            src={`${user.user_info.profile.profile_image_file}`}
                                            alt={user.user}
                                            w="100%"
                                            h="100%"
                                            objectFit="cover"
                                            fallbackSrc={noImage}
                                            borderRadius="full"
                                        />
                                    </Box>
                                    <Text>
                                        NTRP:{" "}
                                        {user.user_info.profile.ntrp_rating}{" "}
                                    </Text>
                                </Box>
                            ))}
                    </Box>

                    <Heading fontWeight="700" w="100%">
                        {game.location_info.park_name}
                    </Heading>
                    <Text w="100%">{game.location_info.address.address1} </Text>
                    <Text>
                        {game.location_info.address.city},{" "}
                        {game.location_info.address.state}{" "}
                        {game.location_info.address.zipcode}
                    </Text>

                    <Text w="100%" marginTop={0}>
                        {game.match_type} | {game.session_type}
                    </Text>
                    <Text fontWeight="700" fontSize="xl">
                        {DateTime.fromISO(game.datetime).toLocaleString(
                            DateTime.DATETIME_MED_WITH_WEEKDAY
                        )}
                    </Text>

                    <Box w="100%" m={3} >
                        {game.buttonTitle && (
                            <Text w='100%'>
                                {game.buttonTitle}
                                {game.displayUsers[0].user_info.first_name}?
                            </Text>
                        )}
                    <Box display='flex' justifyContent='center' >
                        {game.buttons.map((button) => (
                            <Button m={2}
                                colorScheme="teal"
                                key={button.label}
                                onClick={() => handleClick(game, button)}
                            >
                                <Text color="white">{button.label} </Text>
                            </Button>
                        ))}</Box>
                    </Box>
                </Box>

                <AlertDialog isOpen={isOpen} onClose={onClose}>
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <CloseButton
                                alignSelf="flex-end"
                                position="relative"
                                // right={-1}
                                // top={-1}
                                onClick={()=>{
                                    onClose()
                                handleCloseModal()}}
                            />
                            <AlertDialogHeader>{alertTitle}</AlertDialogHeader>
                            <AlertDialogBody>{alertMessage}</AlertDialogBody>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            </Box>
        </Box>
    );
}
