import { IconButton} from '@chakra-ui/react'
import {HamburgerIcon} from '@chakra-ui/icons'



function Header () {
    return (
            <div className="header">
               <IconButton aria-label='Hamburger Menu' fontSize='2em' colorScheme='teal' border= 'none' variant='outline'  icon={<HamburgerIcon />} />
            </div>
       
    )
}

export default Header