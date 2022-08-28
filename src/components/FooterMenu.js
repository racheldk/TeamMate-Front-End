import { IconButton, Box, Text} from '@chakra-ui/react'
import { Link } from "react-router-dom";
import { BsPerson, BsFillHouseFill, BsStickies, BsPlusSquare, BsFillPersonFill, BsPlusSquareFill } from "react-icons/bs";
import { BsPlus } from "react-icons/bs";
import { CgTennis } from "react-icons/cg"
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
                paddingBottom="2px" color="teal"
                border= '1px' variant='' className='footer-button' backgroundColor="white" width="px" height="40px" icon={<GiTennisCourt/>} />
                <Text className='tooltiptext'>Open Games</Text></Box></Link>
            

                <Link to='/new'><Box className='tooltip'><IconButton aria-label='ProfileItem' fontSize='2.1em' colorScheme='teal' 
                border= '1px' color="teal" variant='' className='footer-button' backgroundColor="white" icon={<BsPlus/>} />
                <Text className='tooltiptext'>New Game</Text></Box></Link>  


                <Link to={`/${username}`}><Box className='tooltip'><IconButton aria-label='ProfileItem' fontSize='1.9em' colorScheme='teal' 
                border= '1px' variant='outline' className='footer-button' icon={<Icon as={BsPerson} />} />
                <Text className='tooltiptext' fontSize>My Profile</Text></Box></Link>

                <Link to='/my-games'><Box className='tooltip'><IconButton aria-label='Search Item' fontSize='1.9em' colorScheme='teal' 
                border= '1px' variant='outline' className='footer-button' icon={<CgTennis/>} />
                <Text className='tooltiptext'>My Games</Text></Box></Link>

            </Box>
    

    )


}

export default Footer;


//     return (

//             <Box className="footer">
//                 <Link to='/open-games'><Box className='tooltip'><IconButton aria-label='Search Item' fontSize='1.9em' marginTop="-1px"
//                 paddingBottom="2px" color="white"
//                 border= '1px' variant='' className='footer-button' backgroundColor="teal" width="px" height="40px" icon={<GiTennisCourt/>} />
//                 <Text className='tooltiptext'>Open Games</Text></Box></Link>
            

//                 <Link to='/new'><Box className='tooltip'><IconButton aria-label='ProfileItem' fontSize='2.1em' colorScheme='teal' 
//                 border= '1px' color="white" variant='' className='footer-button' backgroundColor="teal" icon={<BsPlus/>} />
//                 <Text className='tooltiptext'>New Game</Text></Box></Link>  


//                 <Link to={`/${username}`}><Box className='tooltip'><IconButton aria-label='ProfileItem' fontSize='1.9em' colorScheme='teal' 
//                 border= '1px' color="white" variant='outline' className='footer-button' backgroundColor="teal" icon={<Icon as={BsFillPersonFill} />} />
//                 <Text className='tooltiptext' fontSize>My Profile</Text></Box></Link>

//                 <Link to='/my-games'><Box className='tooltip'><IconButton aria-label='Search Item' fontSize='1.9em' colorScheme='teal' 
//                 border= '1px' color="white" variant='outline' className='footer-button' backgroundColor="teal" icon={<IoIosTennisball/>} />
//                 <Text className='tooltiptext'>My Games</Text></Box></Link>

//             </Box>

//     )


//     }

// export default Footer;