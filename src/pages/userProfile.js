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
import { IoMdTennisball } from "react-icons/io";
import { Text, Heading, Image, Icon, IconButton, Button, Box } from "@chakra-ui/react";
import noImage from "../images/no-image.jpg";

function UserProfile({ token, setToken }) {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useLocalStorageState("teammateUsername", null);
  const [history, setHistory] = useState(null)
  const [confirmed, setConfirmed] = useState(null)
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
  }, [token, username, modalIsOpen]);

  useEffect(() => {
    axios
      .get(`https://teammate-app.herokuapp.com/${username}/games/?my-games=AllConfirmed`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setConfirmed(res.data);
        console.log(res.data);
      });
  }, [token, username, modalIsOpen]);
  

  useEffect(() => {
    axios
      .get(`https://teammate-app.herokuapp.com/${username}/games/?my-games=MyPreviousGames`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setHistory(res.data);
        console.log(res.data);
      });
  }, [token, username]);

  const handleOpenModal = (game) => {
    console.log("click modal open");
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
        {user && 
          <>
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
                    colorScheme="teal"
                    border="none"
                    variant='solid'
                    icon={<Icon as={BsPencil} color='white'/>}
                  />
                </Heading>
              </Box>
              <>
              <Box w='100%' display='flex' justifyContent='center'>
              <Box className="profile-pic" m={2} boxSize="150px">
                <Image
                  src={user.profile.profile_image_file}
                  alt={user.username}
                  fallbackSrc={noImage}
                  borderRadius="full"
                  
                />
              </Box></Box>
              <Box className="ranks">
                <Heading color="white">
                  NTRP: {user.profile.ntrp_rating}
                </Heading>
              </Box>
              <Box className='confirmed-games' w='100%'>  {confirmed && 
              <Box className="games">
              <Heading color='#234E52' m={2}>Upcoming Games</Heading>
            {confirmed.map((game) => (
          <Box className="profile-item" display='flex' flexWrap='wrap' p={.5} marginTop={2}>
          <Icon as={IoMdTennisball} color='teal' fontSize='3em' display='flex'/>
          <Box w='80%' m='auto' marginBottom='0' marginTop='0'>
          <Heading fontSize='xl' color='teal'>{game.location_info.park_name}</Heading>
            <Text color='teal'>{DateTime.fromISO(game.datetime).toLocaleString(
                     DateTime.DATETIME_MED_WITH_WEEKDAY
                  )}</Text>
           </Box>
          </Box>
        ))}</Box>}</Box>
              {history && 
              <Box className="games">  {history.map((history) => (
          <Box className="profile-item">
            <Text>{history.date}&nbsp;</Text>
            <Text>{history.location_info.park_name}</Text>
          </Box>
        ))}</Box>}</>
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
                <EditProfile token={token} setModalIsOpen={setModalIsOpen}/>
            </Modal>
          </>
        }
      </Box>

      <Footer />
    </>
  );
}

export default UserProfile;
