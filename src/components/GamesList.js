import {
    Text,
    Heading,
    Button,
    Box,
    Icon,
    Modal,
    LinkOverlay,
    LinkBox,
    Image
} from "@chakra-ui/react";
import { useState } from "react";
import { DateTime } from "luxon";
import { IoMdTennisball } from "react-icons/io";
import GameDetail from "./GameDetail";



export default function GamesList({
    token,
    gamesList,
    setGame,
    game,
    username,
    reload, 
    setReload,
    setNoActionGames,
    confirmedGames,
    pendingPOVGuestGames,
    noGuestGames,
    hostOpenDoublesGames,
    guestOpenDoublesGames,
    test,
}) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [rank, setRank] = useState('teal');

    
    // console.log(gamesList);


    const handleOpenModal = (game) => {
        console.log("click open");
        console.log("modal game" + game);
        setModalIsOpen(true);
        setGame(game);
    };

    const handleCloseModal = () => {
        console.log("click close");
        setModalIsOpen(false);
        setReload(reload+1)
    };

    // console.log(gamesList);
    // console.log(game)

    // if (gamesList.length === 0) {
    //     return (
    //         <Text>
    //             You have no games to display - make a new game or join one.
    //             Trust us, it'll be great (NewGamesList)
    //         </Text>
    //     );
    // }

    
    

    return (
        <>
        <Box display='flex' flexWrap='wrap' maxW="350px" m='auto' justifyContent='center' textAlign='center'>
            
            {gamesList.length > 0 && (
            <>
                    {/* <Heading textTransform='capitalize' color='#285E61'>{gamesList[0].displayStatus}</Heading> */}
                    {gamesList.map((game) => (
                        <LinkBox key={game.game_session_id} cursor='pointer'>
                        <LinkOverlay  onClick={() => {
                                        handleOpenModal(game);
                                    }}>
                            <Box
                                className="game-card"
                                bg={`${game.bgColor}`}
                                key={game.id}
                            >
                                
                                
                                <Box w='100%' display='inline-block' marginRight='0'>
                                <Heading fontSize={24} color='teal'>{game.location_info.park_name}</Heading>
                                <Text color='#285E61'>{game.match_type} | {game.session_type}</Text>
                                <Text fontSize='1.2em' fontWeight='700' color='teal'>
                                    {DateTime.fromISO(game.datetime).toLocaleString(
                                        DateTime.DATETIME_MED_WITH_WEEKDAY
                                    )}
                                </Text></Box>
                            </Box>

    
                            <Box borderRadius='100px' borderColor='white' bg={game.bgColor} position='absolute' top={0} right={0}>
                            <Icon as={game.tennisBall} color={rank} fontSize='3em' display='flex'
                            /> 
                            <Box marginTop={3}> {game.icon}  </Box></Box>

                            <Box borderColor='white' color="teal" position='absolute' top={4} marginLeft="250px" fontSize="10px">RANK&nbsp;</Box>
                            <Box color='teal'  position='absolute' top={3} right={12} fontSize='14px'>{game.host_info.profile.teammate_ntrp}</Box>
                            {/* <Box color='teal' fontSize='14px'> NTRP&nbsp;{game.host_info.profile.ntrp_rating}</Box> */}
                            
                            </LinkOverlay>
                        </LinkBox>
                    ))}
                </>
            )}

            <Modal
                isOpen={modalIsOpen}
                contentLabel="Game Detail Modal"
                game={game}
            >
                <GameDetail
                    token={token}
                    game={game}
                    handleCloseModal={handleCloseModal}
                    setModalIsOpen={setModalIsOpen}
                    username={username}
                    reload={reload}
                    setReload={setReload}
                />
            </Modal>
        </Box>
        </>
    );
}