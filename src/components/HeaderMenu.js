import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IconButton } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Button, ButtonGroup } from '@chakra-ui/react'


import Modal from "react-modal";

function Header() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOpenModal = () => {
    console.log("click open");
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    console.log("click close");
    setModalIsOpen(false);
  };

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
      <Modal className="modal" isOpen={modalIsOpen} contentLabel="Header Menu Modal" 
    overlayClassName= "modal-overlay">
       <Button onClick={() => {
          handleCloseModal();
        }} className="close-modal-button" variant='ghost' colorScheme='teal'><CloseIcon color='white'/></Button>
      <div className="header-menu">
          <Link to="" className="hamburger-link">My Games</Link>
          <Link to="" className="hamburger-link">Settings</Link>
          <Link to="" className="hamburger-link">Support</Link>
          <Link to="" className="hamburger-link">Sign Out</Link>
    </div>
      </Modal>
    </div>
  );
}

export default Header;
