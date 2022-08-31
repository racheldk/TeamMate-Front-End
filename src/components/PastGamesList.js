import {
    Text,
    Heading,
    Button,
    Box,
    Modal,
    LinkOverlay,
    LinkBox,
    Icon
} from "@chakra-ui/react";
import { DateTime } from "luxon";
import { useState } from "react";
import GameDetail from "./GameDetail";
import { IoMdTennisball } from "react-icons/io";


export default function PastGamesList({ token, gamesList }) {
    const [ModalIsOpen, setModalIsOpen] = useState(false);
    const [game, setGame] = useState(null);
    const [user, setUser] = useState(null);





    const handleOpenPastGameModal = (game) => {
        console.log("open past game modal");
        console.log(game);
        setModalIsOpen(true);
        setGame(game);
    };

    const handleClosePastGameModal = () => {
        setModalIsOpen(false);
    };

    return (
        <Box>
            <Box className="games">
            {/* {user && ( */}
                    <>
                {" "}
          
                {/* {user.wins_losses} */}
                {gamesList.map((game) => (
                    <LinkBox key={game.game_session_id} cursor="pointer">
                        <LinkOverlay
                            onClick={() => handleOpenPastGameModal(game)}
                        >
                            <Box
                                className="profile-item"
                                display="flex"
                                flexWrap="wrap"
                                p={0.5}
                                marginTop={2}
                            >
                                <Icon
                                    as={IoMdTennisball}
                                    color="teal"
                                    fontSize="3em"
                                    display="flex"
                                />
                                <Box
                                    w="80%"
                                    m="auto"
                                    marginBottom="0"
                                    marginTop="0"
                                >
                                    <Heading fontSize="xl" color="teal">
                                        <Text>
                                            {game.location_info.park_name}
                                        </Text>
                                    </Heading>
                                    <Text color="teal">
                                        {DateTime.fromISO(
                                            game.datetime
                                        ).toLocaleString(
                                            DateTime.DATETIME_MED_WITH_WEEKDAY
                                        )}
                                    </Text>{" "}
                                </Box>
                            </Box>
                        </LinkOverlay>
                    </LinkBox>
                ))}
            </>
            {/* )} */}
            </Box>
            <Modal
                className="modal"
                isOpen={ModalIsOpen}
                contentLabel="Past Game Detail Modal"
                overlayClassName="modal-overlay"
                game={game}
            >
                <GameDetail
                    token={token}
                    game={game}
                    // handleClosePastGameModal={handleClosePastGameModal}
                    handleClosePastGameModal={handleClosePastGameModal}
                    setModalIsOpen={setModalIsOpen}
                />
            </Modal>
        </Box>
    );
}
