import {
    Text,
    Heading,
    Button,
    Box,
    Modal,
    LinkOverlay,
    LinkBox,
    Stack,
    Image
} from "@chakra-ui/react";
import { DateTime } from "luxon";
import axios from "axios";
import noImage from "../images/no-image.jpg";

export default function MiniModal({ setModalIsOpen, token, gameId}) {

console.log(gameId)
const handleCloseModal = () => {
    console.log("click close");
    setModalIsOpen(false);
};

const cancelGuest = (gameId) => {
    console.log("cancel guest click");
    axios
        .delete(
            `https://teammate-app.herokuapp.com/session/${gameId.game_session_id}/guest/`,
            {
                headers: {
                    Authorization: `Token ${token}`,
                },
            }
        )
        .then(handleCloseModal())
        .catch((error) => {
            alert(error.response.data.detail);
        });
};

    return (
        
        <Box className="modal-base">
    
                <Box m='auto'>
            <Heading>{gameId.host_info.first_name} {gameId.host_info.last_name}</Heading>
            <Text>@{gameId.host}</Text>
                </Box>
                <Box  className="profile-pic" m={2} boxSize="150px" w='100%'>
                <Image
                    src={gameId.host_info.profile.profile_image_file}
                    alt={gameId.host}
                    fallbackSrc={noImage}
                    borderRadius="full"
                    
                />
                </Box>
                <Box>
                <Text>NTRP: {gameId.host_info.profile.ntrp_rating}</Text>
                </Box>
                <Box>
                <Heading>{gameId.location_info.park_name}</Heading>
                <Text>{gameId.location_info.address.address1} {gameId.location_info.address.address2}</Text>
                <Text>{gameId.location_info.address.city}, {gameId.location_info.address.state} {gameId.location_info.address.zipcode}</Text>
                </Box>
                <Box>
                <Text>{gameId.match_type} | {gameId.session_type}</Text>
                </Box>
                <Box>
                <Heading fontSize='xl'>
                {DateTime.fromISO(gameId.datetime).toLocaleString(
                            DateTime.DATETIME_MED_WITH_WEEKDAY
                        )}</Heading>
                </Box>
                <Button onClick={()=>cancelGuest(gameId)} colorScheme='red' m={2}>
                    
                <Text>Cancel Game</Text></Button>
        </Box>
    );
}
