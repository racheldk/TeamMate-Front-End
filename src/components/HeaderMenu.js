import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { IconButton } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import Modal from "react-modal";
import axios from "axios";


function Header(token, setToken) {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [error, setError] = useState([]);



    const handleOpenModal = () => {
        console.log("click open");
        setModalIsOpen(true);
    };

    const handleCloseModal = () => {
        console.log("click close");
        setModalIsOpen(false);
    };

    const handleLogOut = () => {
        axios
            .post(
                `https://teammate-app.herokuapp.com/auth/token/logout/`,
                {}, {withCredentials: true},
                // {headers: { Authorization:`Token$ {token}`}}
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


    return (
        <div className="header">

            <IconButton
                onClick={() => {
                    handleOpenModal();
                }}
                aria-label="Hamburger Menu"
                on
                fontSize="2em"
                colorScheme="teal"
                border="none"
                variant="outline"
                icon={<HamburgerIcon />}
            />

            <Modal
                className="modal"
                isOpen={modalIsOpen}
                contentLabel="Header Menu Modal"
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

                <div className="header-menu">
                    <Link to="/my-games" className="hamburger-link">
                        My Games
                    </Link>
                    <Link to="" className="hamburger-link">
                        Settings
                    </Link>
                    <Link to="" className="hamburger-link">
                        Support
                    </Link>
                    <>
                        <Link
                            to="/"
                            className="hamburger-link"
                            onClick={(e) => {
                                handleLogOut(e);
                            }}
                        >
                            Sign Out
                        </Link>
                    </>
                </div>
            </Modal>

        </div>
    );
}

export default Header;
