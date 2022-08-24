import {
    Text,
    Heading,
    Image,
    Button,
    Box,
    Icon,
    LinkBox,
    LinkOverlay, 
    Modal
} from "@chakra-ui/react";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import noImage from "../images/no-image.jpg";
import axios from "axios";
import { Link as ReactLink} from "react-router-dom";
import UpdatedGameDetail from "./UpdatedGameDetail";

export default function NewGamesList({token, gamesList, setGame, game, setNoActionGames, confirmedGames, pendingPOVGuestGames, noGuestGames, hostOpenDoublesGames, guestOpenDoublesGames, test}) {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    // useEffect(()=>{
    //     const combinedLists = confirmedGames.concat(
    //         pendingPOVGuestGames,
    //         noGuestGames,
    //         hostOpenDoublesGames,
    //         guestOpenDoublesGames
    //     );
    //     console.log(combinedLists);
    //     const sortedCombined = combinedLists.sort(
    //         (objA, objB) => Number(objA.date) - Number(objB.date)
    //     );
    //     console.log(sortedCombined);
    //     setNoActionGames(sortedCombined);
    // },[pendingPOVGuestGames, confirmedGames, noGuestGames, hostOpenDoublesGames, guestOpenDoublesGames, setNoActionGames])

console.log(test)
console.log(gamesList)

    useEffect(()=> {
        console.log(test)
        console.log(confirmedGames)
        console.log(pendingPOVGuestGames)
        console.log(noGuestGames)
        console.log(hostOpenDoublesGames)
        console.log(guestOpenDoublesGames)


        const combinedLists = []
        // if (confirmedGames){
        //     combinedLists.push(...confirmedGames)
        // }
            combinedLists.push(...pendingPOVGuestGames)
        
            combinedLists.push(...noGuestGames)
        
        // if (hostOpenDoublesGames){
        //     combinedLists.push(...hostOpenDoublesGames)
        // }
        // if (guestOpenDoublesGames){
        //     combinedLists.push(...guestOpenDoublesGames)
        // }
        console.log(combinedLists)
        // setNoActionGames(combinedLists)
    }, [pendingPOVGuestGames, confirmedGames, noGuestGames, hostOpenDoublesGames, guestOpenDoublesGames, setNoActionGames, test])

    const handleOpenModal = (game) => {
        console.log("click open");
        console.log("modal game" + game)
        setModalIsOpen(true);
        setGame(game)
    };

    const handleCloseModal = () => {
        console.log("click close");
        setModalIsOpen(false);
    };


    console.log(gamesList)
    // console.log(game)


    if (gamesList.length == 0) {
        return (<Text>You have no games to display - make a new game or join one. Trust us, it'll be great (NewGamesList)</Text>)
    }

    return(
        <Box>
            <Heading>NewGamesList Component</Heading>
            {gamesList.length>0 &&

            <Box>
            <Text>Category: {gamesList[0].displayStatus}</Text>
            {gamesList.map((game) => (
                <Box>
                {/* <LinkOverlay as={ReactLink} to={`${game.route}`}> */}
                    <Box className="game-card" bg=
                {`${game.bgColor}`} key={game.id}>
                    {/* final version won't have host name, id, or confirmed just to check data is rendering correctly */}


                    <Text>{game.id} </Text>
                    <Box>
                        <Text>(This will be an icon)</Text>
                        <Icon as={`Fa${game.icon}`} color={`${game.backgroundColor}`}/>
                    </Box>
                    <Text>{game.location_info.park_name}</Text>
                    <Text>{game.match_type}</Text>
                    <Text>{game.session_type}</Text>
                    <Text>
                        {DateTime.fromISO(game.date).toLocaleString({
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                        })}{" "}
                        at{" "}
                        {DateTime.fromISO(game.time).toLocaleString(
                            DateTime.TIME_SIMPLE
                        )}
                    </Text>
                    <Button onClick={() => handleOpenModal(game)} >Manage This Game</Button>
                    </Box>
                {/* </LinkOverlay> */}
                </Box>
            ))} 
            </Box>
            } 
        

            <Modal
                className="modal"
                isOpen={modalIsOpen}
                contentLabel="Game Detail Modal"
                overlayClassName="modal-overlay"            
                game={game}
            >
                <UpdatedGameDetail token={token} game={game} handleCloseModal={handleCloseModal}/>

            </Modal>

        </Box>
    
    )
}