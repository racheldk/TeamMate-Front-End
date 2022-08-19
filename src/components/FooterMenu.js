import { IconButton} from '@chakra-ui/react'
import { Link } from "react-router-dom";
import { BsFillPersonFill, BsFillHouseFill } from "react-icons/bs"
import {SearchIcon, PlusSquareIcon, Icon} from '@chakra-ui/icons'
import useLocalStorageState from "use-local-storage-state";



function Footer () {
    const [username, setUsername] = useLocalStorageState("teammateUsername", null)

    return (
            <div className="footer">
                <Link to='/open-games'><IconButton aria-label='Search Item' fontSize='1.9em' colorScheme='teal' border= 'none' variant='outline' className='footer-button' icon={<BsFillHouseFill />} /></Link>
                <Link to='/new'><IconButton aria-label='ProfileItem' fontSize='1.9em' colorScheme='teal' border= 'none' variant='outline' className='footer-button' icon={<PlusSquareIcon/>} /></Link>
                <Link to={`/${username}`}><IconButton aria-label='ProfileItem' fontSize='1.9em' colorScheme='teal' border= 'none' variant='outline' className='footer-button' icon={<Icon as={BsFillPersonFill} />} /></Link>
            </div>
    

    )
}

export default Footer