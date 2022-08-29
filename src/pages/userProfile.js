import Header from "../components/HeaderMenu";
import Footer from "../components/FooterMenu";
import EditProfile from "../components/editProfile";
import { useEffect, useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import Modal from "react-modal";
import axios from "axios";
import { DateTime } from "luxon";
import { CloseIcon } from "@chakra-ui/icons";
import { BsPencil } from "react-icons/bs";
import {
    Text,
    Heading,
    Image,
    Icon,
    IconButton,
    Button,
    Box,
} from "@chakra-ui/react";
import noImage from "../images/no-image.jpg";
import PastGamesList from "../components/PastGamesList";
import { IoMdTennisball } from "react-icons/io";
import GameDetail from "../components/GameDetail";

function UserProfile({ token, setToken }) {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useLocalStorageState(
        "teammateUsername",
        null
    );
    const [historyGames, setHistoryGames] = useState(null);
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        axios
            .get(`https://teammate-app.herokuapp.com/${username}`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            })
            .then((res) => {
                setUser(res.data);
                // console.log(res.data);
            });
    }, [token, username, editModalIsOpen]);

    useEffect(() => {
        axios
            .get(
                `https://teammate-app.herokuapp.com/${username}/games/?my-games=MyPreviousGames`,
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            )
            .then((res) => {
                console.log(res.data);
                const responseGames = res.data;
                const expandedPastGames = [];
                for (let game of responseGames) {
                    const confirmedPlayers = [];
                    for (let guest of game.guest_info) {
                        console.log(guest);
                        if (
                            guest.status === "Host" ||
                            guest.status === "Accepted"
                        ) {
                            // console.log("Confirmed Player");
                            confirmedPlayers.push(guest);
                        }
                        console.log(confirmedPlayers);
                    }
                    const expandedGame = {
                        displayStatus: "past",
                        bgColor: "#ffffff",
                        tennisBall: IoMdTennisball,
                        icon: null,
                        displayUsers: confirmedPlayers,
                        buttonTitle: null,
                        buttons: [
                            {
                                label: "Take Survey",
                                job: "open survey",
                            },
                        ],
                        ...game,
                    };
                    console.log(expandedGame);
                    expandedPastGames.push(expandedGame);
                }
                console.log(expandedPastGames);
                setHistoryGames(expandedPastGames);
            });
    }, [token, username]);

    const handleOpenEditModal = (game) => {
        console.log("click modal open");
        setEditModalIsOpen(true);
        console.log(editModalIsOpen);
    };


    const handleCloseEditModal = (game) => {
        console.log("click close");
        console.log(game);
        setEditModalIsOpen(false);
    };

    return (
        <>
            <Header token={token} setToken={setToken} />

            <Box className="app-body">
                {user && (
                    <>
                        <Box className="profile-body" marginTop={4}>
                            <Box className="user-name">
                            <Heading size='2xl' color="white">{user.first_name} {user.last_name}</Heading>
                                <Heading size="lg" color="white">
                                    @{user.username}&nbsp;
                                    <IconButton
                                        aria-label="ProfileEdit"
                                        o
                                        onClick={() => {
                                            handleOpenEditModal();
                                        }}
                                        fontSize=".7em"
                                        colorScheme="teal"
                                        border="none"
                                        size='sm'
                                        variant="solid"
                                        icon={
                                            <Icon as={BsPencil} color="white" />
                                        }
                                    />
                                </Heading>
                            </Box>
                        </Box>
                        <>
                            <Box
                                w="100%"
                                display="flex"
                                justifyContent="center"
                            >
                                <Box
                                    className="profile-pic"
                                    m={2}
                                    boxSize="150px"
                                >
                                    <Image
                                        src={user.profile.profile_image_file}
                                        alt={user.username}
                                        fallbackSrc={noImage}
                                        borderRadius="full"
                                    />
                                </Box>
                            </Box>
                            <Box className="ranks">
                                <Heading color="white" display='flex' justifyContent='center'>
                                    NTRP&nbsp;<Box bg='#ffffff' borderRadius='10px' maxW='10%' paddingLeft='.2em' paddingRight='.2em' color='teal' textAlign='center'>{user.profile.ntrp_rating}</Box>
                                </Heading>
                            </Box>
                            <Box className="confirmed-games" w="100%" justifyContent='center'>
                                <Box className="games">
                                    {historyGames && (
                                        <PastGamesList
                                            gamesList={historyGames}
                                            token={token}
                                            setModalIsOpen={setModalIsOpen}
                                        />
                                    )}
                                </Box>
                            </Box>
                        </>
                        <Modal
                            isOpen={editModalIsOpen}
                            contentLabel="Edit Profile Modal"
                            className="modal"
                            overlayClassName="modal-overlay"
                        >
                            <Button
                                onClick={() => {
                                    handleCloseEditModal();
                                }}
                                className="close-modal-button"
                                variant="ghost"
                                colorScheme="teal"
                            >
                                <CloseIcon color="white" />
                            </Button>
                            <EditProfile
                                token={token}
                                setEditModalIsOpen={setEditModalIsOpen}
                            />
                        </Modal>
                    </>
                )}
            </Box>
            <Footer />
        </>
    );
}

export default UserProfile;
