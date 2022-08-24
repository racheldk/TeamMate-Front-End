import GamesList from "../components/gamesList";
import Header from "../components/HeaderMenu";
import Footer from "../components/FooterMenu";
import { useEffect, useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import Modal from "react-modal";
import axios from "axios";
import { StarIcon, CloseIcon } from "@chakra-ui/icons";
import { BsPencil } from "react-icons/bs";
import { Text, Heading, Image, Icon, IconButton, Button, Box } from "@chakra-ui/react";
import noImage from "../images/no-image.jpg";

function UserProfile({ token, setToken }) {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useLocalStorageState("teammateUsername", null);
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
        console.log(res.data);
      });
  }, [token, username]);

  const handleOpenModal = (game) => {
    console.log("click modal open");
    // console.log(game)
    setModalIsOpen(true);
    console.log(modalIsOpen);
};

const handleCloseModal = (game) => {
    console.log("click close");
    console.log(game);
    setModalIsOpen(false);
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
                      handleOpenModal();
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
              {user.profile > 0 && 
              <>
              <Box className="profile-pic">
                <Image
                  src={`${user.profile.profile_pic}`}
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
              <Box className="games">  {user.game_session.map((game) => (
          <Box className="game-item" on>
            <Text>{game.date}&nbsp;</Text>
            <Text>{game.location_info.park_name}</Text>
          </Box>
        ))}</Box></>}
            </Box>
            <Modal
                isOpen={modalIsOpen}
                contentLabel="Edit Profile Modal"
                className="modal"
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
                </Button>
            </Modal>
          </>
        )}
      </Box>

      <Footer />
    </>
  );
}

export default UserProfile;
