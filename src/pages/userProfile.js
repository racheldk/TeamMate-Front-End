import Header from "../components/HeaderMenu";
import Footer from "../components/FooterMenu";
import EditProfile from "../components/editProfile";
import { useEffect, useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import Modal from "react-modal";
import axios from "axios";
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

function UserProfile({ token, setToken }) {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useLocalStorageState(
        "teammateUsername",
        null
    );
    const [historyGames, setHistoryGames] = useState(null);
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);

    useEffect(() => {
        axios
            .get(`https://teammate-app.herokuapp.com/${username}`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            })
            .then((res) => {
                setUser(res.data);
                console.log(res.data);
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
                setHistoryGames(res.data);
                console.log(res.data);
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
                        <Box className="spacer">&nbsp;</Box>
                        <Box className="profile-body">
                            <Box className="user-name">
                                <Heading size="2xl" color="white">
                                    {user.username}
                                    <IconButton
                                        aria-label="ProfileEdit"
                                        o
                                        onClick={() => {
                                            handleOpenEditModal();
                                        }}
                                        fontSize=".5em"
                                        colorScheme="white"
                                        border="none"
                                        variant="ghost"
                                        className="edit-profile"
                                        icon={<Icon as={BsPencil} />}
                                    />
                                </Heading>
                            </Box>
                            <>
                                <Box className="profile-pic" m={2}>
                                    <Image
                                        src={user.profile.profile_image_file}
                                        alt={user.username}
                                        fallbackSrc={noImage}
                                        borderRadius="full"
                                        boxSize="150px"
                                    />
                                </Box>
                                <Box className="ranks">
                                    <Heading color="white">
                                        NTRP: {user.profile.ntrp_rating}
                                    </Heading>
                                </Box>


                            </>
                        </Box>
                                {historyGames.length>0 &&
                                <PastGamesList 
                                token={token}
                                gamesList={historyGames}
                                /> }
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
