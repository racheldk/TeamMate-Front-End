import axios from "axios";
import { Button, Box, Text, Heading, FormControl, FormLabel } from '@chakra-ui/react'
import { useEffect, useState } from "react";




export default function EditProfile({token, setModalIsOpen}) {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [rank, setRank] = useState('');
    const [picture,  setPicture] = useState('')
    const handleCloseModal = (game) => {
        console.log("click close");
        setModalIsOpen(false);
    };

if (picture) {
    const selectedFile = document.getElementById('inputPicture').files[0];
    axios
    .patch(
        `https://teammate-app.herokuapp.com/profile/`, selectedFile,
        {
            headers: {
                Authorization: `Token ${token}`,
                'Content-Type': selectedFile.type,
                'Content-Disposition': `attachment; filename=${selectedFile.name}`
            }
        }
    )
}

const PatchProfile = (event) => {
    event.preventDefault();

    axios
    .patch(
        `https://teammate-app.herokuapp.com/profile/`,
        {
            ntrp_rating: rank,
        },
        {
            headers: {
                Authorization: `Token ${token}`,
            }
        }
    )
    .then(handleCloseModal())
   ;}



    return (
        <Box className='modal-base'><FormControl id="edit-user-form" >
        <FormLabel className="" enctype="multipart/form-data" >Profile Picture</FormLabel>
        <input id="inputPicture" type='file' accept=".png,.jpg,.gif" className="form-control"  placeholder="Profile Picture"
            onChange={(e) => setPicture(e.target.value)}/>
        <br/>
        <FormLabel className="" >NTRP Rating</FormLabel>
        <input id="inputRank" className="form-control"  placeholder="NTRP Rating"
            onChange={(e) => setRank(e.target.value)}/>
        <br/>
        <Button colorScheme="teal" type="submit" onClick={(e) => PatchProfile(e)} >Submit</Button>
        </FormControl></Box>
    )
}