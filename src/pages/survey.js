import { IconButton} from '@chakra-ui/react'
import { Button } from "@chakra-ui/react";
import {BsEmojiFrownFill, BsFillEmojiNeutralFill, BsFillEmojiSmileFill } from "react-icons/bs"


export const Survey = () => {



return (
<div className="survey">
    <div className="">
        <h1>Survey</h1>


        <div className="survey-text" >
            <p>Did "user" come to the game?:</p>
            <br/>
            <p>Who won?:</p>
            <br/>
            <Button type="button" class="btn btn-primary">Next</Button>
            <br/>
            <br/>
            <p>Would you play again with "user" again?:</p>
            <br/>
            <p>How do you rate the Court Quality?:</p>
            <div className="footer">
                <IconButton aria-label='ProfileItem' fontSize='2.5em' colorScheme='green' border= 'none' 
                variant='outline' className='footer-button' icon={<BsFillEmojiSmileFill/>} />
                <IconButton aria-label='ProfileItem' fontSize='2.5em' colorScheme='yellow' border= 'none' 
                variant='outline' className='footer-button' icon={<BsFillEmojiNeutralFill/>} />
                <IconButton aria-label='Search Item' fontSize='2.5em' colorScheme='red' border= 'none' 
                variant='outline' className='footer-button' icon={<BsEmojiFrownFill />} />
            </div>
            
        </div>
        </div>
        <div class="card-footer text-end">
        <button type="button" class="btn btn-primary">Submit</button>
        
    </div>
</div>
)}

export default Survey;
