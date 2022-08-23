import axios from "axios";
import { Button } from '@chakra-ui/react'
import { useEffect, useState } from "react";




export default function EditProfile({token}) {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [rank, setRank] = useState('');
    const [picture,  setPicture] = useState('')

const PatchProfile = () => {
    axios
    .patch(
        `https://teammate-app.herokuapp.com/profile/`, 
        {
            headers: {
                Authorization: `Token ${token}`,
            },
            first_name: firstname,
            last_name: lastname, 
            ntrp_rating: rank,
            profile_pic: picture,
        }
    )
    .catch((error) => {
        alert(error.response.data.detail);
    });}

    return (
        <div><form id="edit-user-form" onSubmit={PatchProfile}>

        <label className="">First Name</label>
        <input id="inputFirstname" className="form-control"  placeholder="First name"
            onChange={(e) => setFirstname(e.target.value)}/>
        <br/> 
        <label className="" >Last Name</label>
        <input id="inputLastname" className="form-control"  placeholder="Last name"
            onChange={(e) => setLastname(e.target.value)}/>
        <br/>
        <label className="" >Profile Picture</label>
        <input id="inputPicture" type='file' className="form-control"  placeholder="Profile Picture"
            onChange={(e) => setPicture(e.target.value)}/>
        <br/>
        <label className="" >Profile Picture</label>
        <input id="inputRank" className="form-control"  placeholder="NTRP Rating"
            onChange={(e) => setRank(e.target.value)}/>
        <br/>
        <Button colorScheme="teal" type="submit" >Submit</Button>
        </form></div>
    )
}