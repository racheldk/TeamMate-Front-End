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
import { TbBallTennis } from "react-icons/tb";
import {
    Text,
    Heading,
    Image,
    Icon,
    IconButton,
    Button,
    Box,
    Center,
    Spinner
} from "@chakra-ui/react";
import noImage from "../images/no-image.jpg";
import PastGamesList from "../components/PastGamesList";
import { IoMdTennisball } from "react-icons/io";
import GameDetail from "../components/GameDetail";
import { Navigate, useParams } from "react-router-dom";
import { paste } from "@testing-library/user-event/dist/paste";


function UserProfile({ token, setToken, reload, setReload }) {
    const [profileUser, setProfileUser] = useState(null);
    const [username, setUsername] = useLocalStorageState(
        "teammateUsername",
        null
    );
    const [historyGames, setHistoryGames] = useState(null);
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [params, setParams] = useState(useParams());
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        if (params) {
        axios
            .get(`https://teammate-app.herokuapp.com/${params.username}`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            })
            .then((res) => {
                setProfileUser(res.data);
                console.log(res.data);
            });}
    }, []);

    useEffect(() => {
        axios
            .get(
                `https://teammate-app.herokuapp.com/${params.username}/games/?my-games=MyPreviousGames`,
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
                    const confirmedPlayersUsernames = []
                    for (const player of confirmedPlayers) {
                        confirmedPlayersUsernames.push(player.user)
                    }
                    const tookSurvey = []
                    for (const survey of game.survey_info) {
                        tookSurvey.push(survey.respondent)
                    }
                    console.log(tookSurvey)
                    console.log(confirmedPlayersUsernames)
                    const expandedGame = {
                        displayStatus: "past",
                        bgColor: "#ffffff",
                        tennisBall: IoMdTennisball,
                        icon: null,
                        displayUsers: confirmedPlayers,
                        displayUsersUsernames: confirmedPlayersUsernames,
                        historyStatus: "past",
                        tookSurvey: tookSurvey,
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
                setIsLoading(false)
            });
    }, [token, setProfileUser]);

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

    if (isLoading) {
        return (
            <Box>
                <Center h="400px">
                    <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="#234E52;"
                        size="xl"
                    />
                </Center>
            </Box>
        );
    }

    return (
        <>
            <Header token={token} setToken={setToken} />

            <Box className="app-body">
                {profileUser && (
                    <>
                        <Box className="profile-body" marginTop={4}>
                            <Box className="user-name">
                            <Heading size='2xl' color="white">{profileUser.first_name} {profileUser.last_name}</Heading>
                                <Heading size="lg" color="white">
                                    @{profileUser.username}&nbsp;

                                    {username===profileUser.username && 
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
                                    />}
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
                                        src={profileUser.profile.profile_image_file}
                                        alt={profileUser.username}
                                        fallbackSrc={noImage}
                                        borderRadius="full"
                                    />
                                </Box>
                            </Box>
                            <Box w='100%' m='auto' mb={2} display='flex' justifyContent='center' alignItems='center'>
                                <Heading fontSize='2xl' color='white'>TeamMate NTRP</Heading> 
                                <Box bg='#ffffff' borderRadius='10px' pl={2} pr={2} ml={2}
                                    paddingRight='.2em' color='teal' justifyContent='center' alignItems='center' maxW='100px' display='flex'><Heading>{profileUser.profile.teammate_ntrp}</Heading> <Icon as={TbBallTennis} fontSize='2em' color={profileUser.profile.teammate_rank}/></Box>
                            </Box>

                            <Box className="ranks" >
                                <Heading color="white" fontSize='2xl' display='flex' justifyContent='center'>
                                    USTA NTRP&nbsp;<Box bg='#ffffff' borderRadius='10px' maxW='40%' paddingLeft='.2em' 
                                    paddingRight='.2em' color='teal' textAlign='center'>{profileUser.profile.ntrp_rating}</Box>
                                </Heading>
                    
                            </Box>
 
                            <Box className="confirmed-games" w="100%" justifyContent='center'>
                            
                                <Box className="games">
                                <Heading color="#234E52" m={2} textAlign='center'>
                    Game History
                </Heading>
                                {profileUser.profile.wins_losses!==null && (
                            <Box w='100%' textAlign='center' bg='white' maxW='200px' m='auto' borderRadius='10px' color='#234E52'>
                                <Text>Record: {profileUser.profile.wins_losses}</Text>
                            </Box>

                            )}
                                    {historyGames.length>0 && (
                                        <PastGamesList
                                            gamesList={historyGames}
                                            token={token}
                                            setParams={setParams}
                                            setModalIsOpen={setModalIsOpen}
                                            reload={reload}
                                            setReload={setReload}
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
