import { useState, useEffect } from "react";
import { Link, Navigate, LinkOverlay } from "react-router-dom";
import { IconButton, Box } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, BellIcon } from "@chakra-ui/icons";

import { Button } from "@chakra-ui/react";
import Modal from "react-modal";
import axios from "axios";
import useLocalStorageState from "use-local-storage-state";

function Header() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    // const [navigate, setNavigate] = useState(false);
    const [token, setToken] = useLocalStorageState("teammateToken", null);
    const [error, setError] = useState([]);
    const [notifications, setNotifications] = useState(null)
    let alertIcon = 'teal'
    let alert = ''

    useEffect(() => {
        axios
          .get(`https://teammate-app.herokuapp.com/notification/count`, {
            headers: {
              Authorization: `Token ${token}`,
            },
          })
          .then((res) => {
            setNotifications(res.data);
            console.log(notifications)
          });
      }, [token]);

    const handleOpenModal = () => {
        console.log("click open");
        setModalIsOpen(true);
    };

    const handleCloseModal = () => {
        console.log("click close");
        setModalIsOpen(false);
    };

    if (notifications && notifications.length > 0) {
        alertIcon = "white"
        alert = "red"
    }

    const handleLogOut = () => {
        axios
            .post(
                `https://teammate-app.herokuapp.com/auth/token/logout/`,
                {}, 
                {headers: { Authorization:`Token ${token}`}}
            )
            .then(() => {
                setToken(null);
                console.log("logout");

            })
            .catch((res) => {
                let error = res.message;
                console.log(error);
                setError(error);
            });

        }
        if (!token) {
            return <Navigate to="/" />;
        }

    return (
        <Box className="header">
<IconButton variant='ghost' bg={alert} borderRadius="20px" fontSize='1.5em' p={2} m={0} w='24px'><BellIcon color={alertIcon} /></IconButton>
<Box display='flex' justifyContent='end' m={2} color='teal'>
<Button colorScheme='teal' variant='outline' m={0} h='24px' p={2}>
<Link
     to="/"
     onClick={(e) => {
     handleLogOut(e);
     }}
    >
      Signout
</Link>
</Button>
</Box>

 </Box>
    );
}

export default Header;
