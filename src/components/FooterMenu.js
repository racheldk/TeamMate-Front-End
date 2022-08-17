import { IconButton} from '@chakra-ui/react'
import { Link } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs"
import {SearchIcon, PlusSquareIcon, Icon} from '@chakra-ui/icons'



function Footer () {
    return (
            <div className="footer">
               <Link to='/'><IconButton aria-label='Search Item' fontSize='1.9em' colorScheme='teal' border= 'none' variant='outline' className='footer-button' icon={<SearchIcon />} /></Link>
               <Link to='/new'><IconButton aria-label='ProfileItem' fontSize='1.9em' colorScheme='teal' border= 'none' variant='outline' className='footer-button' icon={<PlusSquareIcon/>} /></Link>
               <Link to='/'><IconButton aria-label='ProfileItem' fontSize='1.9em' colorScheme='teal' border= 'none' variant='outline' className='footer-button' icon={<Icon as={BsFillPersonFill} />} /></Link>
            </div>
       
    )
}

export default Footer