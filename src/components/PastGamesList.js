import {
    Text,
    Heading,
    Button,
    Box,
    Modal,
    LinkOverlay,
    LinkBox,
} from "@chakra-ui/react";
import { DateTime } from "luxon";
import { useState } from "react";
import PastGamesDetail from "./PastGameDetail";

export default function PastGamesList({ token, gamesList }) {
    const [pastGameModalIsOpen, setPastGameModalIsOpen] = useState(false);
    const [game, setGame] = useState(null)

    const handleOpenPastGameModal = (game) => {
        setPastGameModalIsOpen(true)
        setGame(game)
    };

    const handleClosePastGameModal = () =>{
        setPastGameModalIsOpen(false)
    }

    return (
        <Box>
            <h1>past games list </h1>
            <Box className="games">
                {" "}
                {gamesList.map((game) => (
                    <LinkBox key={game.game_session_id}>
                        <LinkOverlay onClick={() => handleOpenPastGameModal(game)}>
                            <Box className="game-item">
                                <Text>{game.date}&nbsp;</Text>
                                <Text>{game.location_info.park_name}</Text>
                            </Box>
                        </LinkOverlay>
                    </LinkBox>
                ))}
            </Box>
            <Modal
                className="modal"
                isOpen={pastGameModalIsOpen}
                contentLabel="Past Game Detail Modal"
                overlayClassName="modal-overlay"
                game={game}
            >
                <PastGamesDetail
                    token={token}
                    game={game}
                    handleClosePastGameModal={handleClosePastGameModal}
                />
            </Modal>
        </Box>
    );
}
