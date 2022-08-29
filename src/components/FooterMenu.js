import { IconButton, Box, Text} from '@chakra-ui/react'
import { Link } from "react-router-dom";
import { BsPerson, BsFillHouseFill, BsStickies, BsPlusSquare, BsFillPersonFill, BsPlusSquareFill, BsPersonFill } from "react-icons/bs";
import { BsPlus } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { IoMdTennisball } from "react-icons/io";
import { GiTennisCourt } from "react-icons/gi";

import { IoIosTennisball } from "react-icons/io"
import { SearchIcon, Icon } from "@chakra-ui/icons";
import useLocalStorageState from "use-local-storage-state";



function Footer() {
    const [username, setUsername] = useLocalStorageState(
        "teammateUsername",
        null
    );

    return (

            <Box className="footer">
                <Link to='/open-games'><Box className='tooltip'><IconButton aria-label='Search Item' fontSize='1.9em' marginTop="-1px"
                paddingBottom="2px" colorScheme="teal"
                variant='solid' className='footer-button'  width="px" height="40px" icon={<GiTennisCourt/>} />
                <Text className='tooltiptext'>Open Games</Text></Box></Link>
            

                <Link to='/new'><Box className='tooltip'><IconButton aria-label='ProfileItem' fontSize='1.9em' colorScheme='teal' 
                 color="teal" variant='solid' className='footer-button' icon={<Icon as={FaPlus} color='white'/>} />
                <Text className='tooltiptext'>New Game</Text></Box></Link>  

                <Link to='/my-games'><Box className='tooltip'><IconButton aria-label='Search Item' fontSize='1.9em' colorScheme='teal' 
                 variant='solid' className='footer-button' icon={<IoMdTennisball/>} />
                <Text className='tooltiptext'>My Games</Text></Box></Link>

                <Link to={`/${username}`}><Box className='tooltip'><IconButton aria-label='ProfileItem' fontSize='1.9em' colorScheme='teal' 
                variant='solid' className='footer-button' icon={<Icon as={BsPersonFill} />} />
                <Text className='tooltiptext' fontSize>My Profile</Text></Box></Link>

            </Box>
    

    )


}

export default Footer;
