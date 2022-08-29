import {
    Text,
    Heading,
    Button,
    Box,
    Modal,
    LinkOverlay,
    LinkBox,
    Stack,
    Image,
    IconButton,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { DateTime } from "luxon";
import axios from "axios";
import noImage from "../images/no-image.jpg";

export default function PastGameDetail({
    setPastGameModalIsOpen,
    token,
    game,
}) {
    const handleCloseModal = () => {
        console.log("click close");
        setPastGameModalIsOpen(false);
    };

    return (
        <Box className="modal-overlay">
            <Box textAlign="right" className="modal"></Box>
            <IconButton
                onClick={() => handleCloseModal()}
                className="close-modal-button"
                variant="outline"
                colorScheme="teal"
            >
                <CloseIcon color="white" />
            </IconButton>
            
            <Box m="auto">
                <Box className="modal-base">
                    <Heading>
                        {game.host_info.first_name} {game.host_info.last_name}
                    </Heading>
                    <Text>@{game.host}</Text>
                </Box>
                <Box className="profile-pic" m={2} boxSize="150px" w="100%">
                    <Image
                        src={game.host_info.profile.profile_image_file}
                        alt={game.host}
                        fallbackSrc={noImage}
                        borderRadius="full"
                    />
                </Box>
                <Box>
                    <Text>NTRP: {game.host_info.profile.ntrp_rating}</Text>
                </Box>
                <Box>
                    <Heading>{game.location_info.park_name}</Heading>
                    <Text>
                        {game.location_info.address.address1}{" "}
                        {game.location_info.address.address2}
                    </Text>
                    <Text>
                        {game.location_info.address.city},{" "}
                        {game.location_info.address.state}{" "}
                        {game.location_info.address.zipcode}
                    </Text>
                </Box>
                <Box>
                    <Text>
                        {game.match_type} | {game.session_type}
                    </Text>
                </Box>
                <Box>
                    <Heading fontSize="xl">
                        {DateTime.fromISO(game.datetime).toLocaleString(
                            DateTime.DATETIME_MED_WITH_WEEKDAY
                        )}
                    </Heading>
                </Box>
                <Button m={2}>
                    <Text>Take Survey</Text>
                </Button>
            </Box>
        </Box>
    );
}
