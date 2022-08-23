import { IconButton} from '@chakra-ui/react'
import { Button, Box, Heading, } from "@chakra-ui/react";
import {BsEmojiFrownFill, BsFillEmojiNeutralFill, BsFillEmojiSmileFill } from "react-icons/bs"


export const Survey = () => {



return (
<Box className="survey">
    <Box className="">
    <Heading color='teal' marginLeft="90px">Survey</Heading>
        


        <Box className="survey-text">
            <p>Did "user" come to the game?:</p>
            <Button variant="outline" backgroundColor="" colorScheme="teal" color="teal" 
            height="30px" width="100px" marginRight="30px" marginLeft="30px" marginTop="10px"  
            marginBottom="20px">Yes</Button>
            <Button variant="outline" backgroundColor="" colorScheme="teal" color="teal" 
            width="103px" height="30px" marginTop="10px"  marginBottom="20px">No</Button>
            <br/>
            <p>Who won?:</p>
            <Button variant="outline" backgroundColor="" colorScheme="teal" color="teal" 
            height="30px" width="100px" marginRight="30px"marginLeft="30px"marginTop="10px"  
            marginBottom="20px">Me</Button>
            <Button variant="outline" backgroundColor="" colorScheme="teal" color="teal" 
            height="30px" width="103px" marginRight="30px"marginTop="10px" marginBottom="20px">Username</Button>
            <br/>
            <p>Would you play again with "user" again?:</p>
            <Button variant="outline" backgroundColor="" colorScheme="teal" color="teal" 
            height="30px" width="100px" marginRight="30px" marginLeft="30px" marginTop="10px"  
            marginBottom="20px">Yes</Button>
            <Button variant="outline" backgroundColor="" colorScheme="teal" color="teal" 
            width="103px" height="30px" marginTop="10px" marginBottom="20px">No</Button>
            <br/>
            <p>How do you rate the Court Quality?:</p>
                <div className="icon-survey">
                <IconButton aria-label='ProfileItem' fontSize='2.5em' colorScheme='green' border= 'none' 
                variant='outline' className='' icon={<BsFillEmojiSmileFill/>} />
                <IconButton aria-label='ProfileItem' fontSize='2.5em' colorScheme='yellow' border= 'none' 
                variant='outline' className='' icon={<BsFillEmojiNeutralFill/>} />
                <IconButton aria-label='Search Item' fontSize='2.5em' colorScheme='red' border= 'none' 
                variant='outline' className='' icon={<BsEmojiFrownFill />} />
                </div>
            
            <Button marginLeft="10px" width="300px" height="30px" variant="ghost"
            colorScheme="teal" backgroundColor="teal" color="white">Submit</Button>
        </Box>
        </Box>
        

</Box>
)}

export default Survey;
