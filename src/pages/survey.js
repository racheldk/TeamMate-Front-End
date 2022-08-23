import { IconButton} from '@chakra-ui/react'
import { Button } from "@chakra-ui/react";
import {BsEmojiFrownFill, BsFillEmojiNeutralFill, BsFillEmojiSmileFill } from "react-icons/bs"


export const Survey = () => {



return (
<div className="survey">
    <div className="">
        <h1>Survey</h1>


        <div className="survey-text">
            <p>Did "user" come to the game?:</p>
            <Button variant="ghost"colorScheme="teal">YES</Button>
            <Button variant="ghost"colorScheme="teal">NO</Button>
            <br/>
            <p>Who won?:</p>
            <Button variant="ghost"colorScheme="teal">Me</Button>
            <Button variant="ghost"colorScheme="teal">Username</Button>
            <br/>
            <Button marginLeft="100px" width="100px" height="30px" variant="ghost"
            colorScheme="teal" backgroundColor="teal" color="white">Next</Button>
            <br/>
            <br/>
            <p>Would you play again with "user" again?:</p>
            <Button variant="ghost"colorScheme="teal">YES</Button>
            <Button variant="ghost"colorScheme="teal">NO</Button>
            <br/>
            <p>How do you rate the Court Quality?:</p>
                <div className="icon-survey">
                <IconButton aria-label='ProfileItem' fontSize='2.5em' colorScheme='green' border= 'none' 
                variant='outline' className='footer-button' icon={<BsFillEmojiSmileFill/>} />
                <IconButton aria-label='ProfileItem' fontSize='2.5em' colorScheme='yellow' border= 'none' 
                variant='outline' className='footer-button' icon={<BsFillEmojiNeutralFill/>} />
                <IconButton aria-label='Search Item' fontSize='2.5em' colorScheme='red' border= 'none' 
                variant='outline' className='footer-button' icon={<BsEmojiFrownFill />} />
                </div>
            
            <Button marginLeft="100px" width="100px" height="30px" variant="ghost"
            colorScheme="teal" backgroundColor="teal" color="white">Submit</Button>
        </div>
        </div>
        

</div>
)}

export default Survey;
