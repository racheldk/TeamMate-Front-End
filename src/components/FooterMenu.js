import { IconButton, Box, Text} from '@chakra-ui/react'
import { Link } from "react-router-dom";
import { BsFillPersonFill, BsFillHouseFill, BsStickies } from "react-icons/bs";
import { SearchIcon, PlusSquareIcon, Icon } from "@chakra-ui/icons";
import useLocalStorageState from "use-local-storage-state";

function Footer() {
    const [username, setUsername] = useLocalStorageState(
        "teammateUsername",
        null
    );

    return (

            <Box className="footer">
                <Link to='/open-games'><Box className='tooltip'><IconButton aria-label='Search Item' fontSize='1.9em' colorScheme='teal' 
                border= 'none' variant='outline' className='footer-button' icon={<BsFillHouseFill />} />
                <Text className='tooltiptext'>Open Games</Text></Box></Link>
            


                <Link to='/new'><Box className='tooltip'><IconButton aria-label='ProfileItem' fontSize='1.9em' colorScheme='teal' 
                border= 'none' variant='outline' className='footer-button' icon={<PlusSquareIcon/>} />
                <Text className='tooltiptext'>New Game</Text></Box></Link>  


                <Link to={`/${username}`}><Box className='tooltip'><IconButton aria-label='ProfileItem' fontSize='1.9em' colorScheme='teal' 
                border= 'none' variant='outline' className='footer-button' icon={<Icon as={BsFillPersonFill} />} />
                <Text className='tooltiptext' fontSize>My Profile</Text></Box></Link>

                <Link to='/my-games'><Box className='tooltip'><IconButton aria-label='Search Item' fontSize='1.9em' colorScheme='teal' 
                border= 'none' variant='outline' className='footer-button' icon={<BsStickies/>} />
                <Text className='tooltiptext'>My Games</Text></Box></Link>

            </Box>
    

    )


}

export default Footer;
