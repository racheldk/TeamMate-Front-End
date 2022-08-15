import { IconButton} from '@chakra-ui/react'
import {SearchIcon, SettingsIcon, StarIcon,AddIcon} from '@chakra-ui/icons'



function Footer () {
  return (
          <div className="footer">
          <IconButton aria-label='Home Item' fontSize='2em' colorScheme='teal' border= 'none' variant='outline'  icon={<AddIcon/>} />
            <IconButton aria-label='Search Item' fontSize='2em' colorScheme='teal' border= 'none' variant='outline'  icon={<SearchIcon />} />
            <IconButton aria-label='ProfileItem' fontSize='2em' colorScheme='teal' border= 'none' variant='outline'  icon={<StarIcon/>} />
            <IconButton aria-label='ProfileItem' fontSize='2em' colorScheme='teal' border= 'none' variant='outline'  icon={<SettingsIcon/>} />
        </div>
    
  )
}

export default Footer