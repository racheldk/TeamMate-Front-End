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
import { useState, useEffect } from "react";
import { DateTime } from "luxon";
import { IoMdTennisball } from "react-icons/io";
import GameDetail from "./GameDetail";

export default function GamesList({
    token,
    gamesList,
    setGame,
    game,
    username,
    setRefresh,
    setAllGamesList,
    setReload,
    reload
}) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [rank, setRank] = useState('teal');

    useEffect((game) => {
        if (game && game.host_info.profile.ntrp_rating === 2.5) {
        setRank('brown')
     }
        if (game && game.host_info.profile.ntrp_rating > 2.5) {
        setRank('pink')
     }
    }, [game]);
    
    // console.log(gamesList);


    const handleOpenModal = (game) => {
        console.log("click modal open");
        setModalIsOpen(true);
        setGame(game);
    };

    const handleCloseModal = () => {
        console.log("click close");
        setReload(reload+1);
        console.log('reload from handleCloseModal ' + reload)
        setModalIsOpen(false);
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

    // useEffect(()=>{
    //     console.log('after modal has closed')
    // }, [modalIsOpen])

    

    return (
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
                                <Box>{game.icon}</Box>
                                
                                <Box w='100%' display='inline-block' marginRight='0'>
                                <Heading fontSize={30} color='teal'>{game.location_info.park_name}</Heading>
                                <Text color='#285E61'>{game.match_type} | {game.session_type}</Text>
                                <Text color='#285E61'>
                                    {DateTime.fromISO(game.datetime).toLocaleString(
                                        DateTime.DATETIME_MED_WITH_WEEKDAY
                                    )}
                                </Text></Box>
                            </Box>
                            <Box borderRadius='100px' borderColor='white' bg={game.bgColor} position='absolute' top={0} right={0}>
                            <Icon as={IoMdTennisball} color={rank} fontSize='3em' display='flex' />
                            </Box>
                            </LinkOverlay>
                        </LinkBox>
                    ))}
                </>
            )}

            <Modal
                isOpen={modalIsOpen}
                contentLabel="Game Detail Modal"
                game={game}
                setAllGamesList={setAllGamesList}
                setReload={setReload}

            >
                <GameDetail
                    token={token}
                    game={game}
                    handleCloseModal={handleCloseModal}
                    username={username}
                    setRefresh={setRefresh}
                    setAllGamesList={setAllGamesList}
                    setReload={setReload}
                    reload={reload}


                />
            </Modal>
        </Box>
    );
}
