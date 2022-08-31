import axios from "axios";
import { Button, Box, Text, Heading, FormControl, FormLabel } from '@chakra-ui/react'
import { useEffect, useState } from "react";
import useLocalStorageState from "use-local-storage-state";

export default function EditProfile({token, setEditModalIsOpen}) {
    const [username, setUsername] = useLocalStorageState(
        "teammateUsername",
        null
    );
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [rank, setRank] = useState('');
    const [picture,  setPicture] = useState('')
    const handleCloseModal = (game) => {
        console.log("click close");
        setEditModalIsOpen(false);
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

    if (rank) {
    axios
    .patch(
        `https://teammate-app.herokuapp.com/profile/`,
        {
            ntrp_rating: rank,
            first_name: firstname,
            last_name: lastname
        },
        {
            headers: {
                Authorization: `Token ${token}`,
            }
        }
    )
    .then(handleCloseModal())}
    handleCloseModal()
   ;}

   if (firstname) {
    axios
    .patch(
        `https://teammate-app.herokuapp.com/${username}`,
        {
            first_name: firstname,
        },
        {
            headers: {
                Authorization: `Token ${token}`,
            }
        }
    )
}

if (lastname) {
    axios
    .patch(
        `https://teammate-app.herokuapp.com/${username}`,
        {
            last_name: lastname
        },
        {
            headers: {
                Authorization: `Token ${token}`,
            }
        }
    )
}
   




    return (
        <Box w='100%' display='flex' justifyContent='center'><FormControl id="edit-user-form" className="user-form" m={2}>
        <Heading className="form-banner" color='#234E52'>Edit Profile</Heading>
        <FormLabel className="" color='#234E52' pl={2} pt={2}>First Name</FormLabel>
        <input id="inputFirstName" className="form-control"  placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}/>
        <FormLabel className="" color='#234E52' pl={2} pt={2} >Last  Name</FormLabel>
        <input id="inputFirstName" className="form-control"  placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}/>
        <FormLabel className="" color='#234E52' pl={2} pt={2} encType="multipart/form-data" >Profile Picture</FormLabel>
        <input id="inputPicture" type='file' accept=".png,.jpg" className="form-control"  placeholder="Profile Picture"
            onChange={(e) => setPicture(e.target.value)}/>
        <br/>
        <FormLabel className="" color='#234E52' pl={2} pt={2}>NTRP Rating</FormLabel>
        <input id="inputRank" className="form-control"  placeholder="NTRP Rating"
            onChange={(e) => setRank(e.target.value)}/>
        <br/>
        <Button colorScheme="teal" type="submit" onClick={(e) => PatchProfile(e)} mt={4} mb={2}>Submit</Button>
        </FormControl></Box>
    )
}