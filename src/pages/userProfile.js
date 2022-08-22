import GamesList from "../components/gamesList";
import Header from "../components/HeaderMenu";
import Footer from "../components/FooterMenu";
import { useEffect, useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import Modal from "react-modal";
import axios from "axios";
import { StarIcon, CloseIcon } from "@chakra-ui/icons";
import { BsPencil } from "react-icons/bs";
import { Text, Heading, Image, Icon, IconButton, Button } from "@chakra-ui/react";
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
    
    setModalIsOpen(true);
    console.log(modalIsOpen);
};

const handleCloseModal = (game) => {
    console.log("click close");;
    setModalIsOpen(false);
};

  return (
    <>
      <Header token={token} setToken={setToken} />

      <div className="app-body">
        {user && (
          <>
            <div className="spacer">&nbsp;</div>
            <div className="profile-body">
            
              <div className="user-name">
                <Heading size="2xl" color="white">
                  {user[0].username}
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
              </div>
              {user[0].profile > 0 && 
              <>
              <div className="profile-pic">
                <Image
                  src={`${user[0].profile.profile_pic}`}
                  alt={user[0].username}
                  fallbackSrc={noImage}
                  borderRadius="full"
                  boxSize="150px"
                />
              </div>
              <div className="ranks">
                <Heading color="white">
                  NTRP: {user[0].profile.ntrp_rating}
                </Heading>
              </div>
              <div className="games">  {user[0].game_session.map((game) => (
          <div className="game-item" on>
            <Text>{game.date}&nbsp;</Text>
            <Text>{game.location_info.park_name}</Text>
          </div>
        ))}</div></>}
            </div>
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
      </div>

      <Footer />
    </>
  );
}

export default UserProfile;
