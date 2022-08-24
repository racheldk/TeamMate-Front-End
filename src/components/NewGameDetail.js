import {
    Text,
    Heading,
    Image,
    Button,
    Box,
} from "@chakra-ui/react";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import noImage from "../images/no-image.jpg";
import axios from "axios";

export default function NewGameDetail({token}) {

    const [params] = useState(useParams());
    const [isLoading, setIsLoading] = useState(true);
    const [currentGame, setCurrentGame] = useState({});

    console.log(params);

    useEffect(() => {
        axios
            .get(
                `https://teammate-app.herokuapp.com/session/${parseInt(
                    params.id
                )}`,
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            )
            .then((res) => {
                console.log(res.data);
                setCurrentGame(res.data);
                setIsLoading(false);
            });
    }, [params.id]);

    if (isLoading) {
        return <Box>Loading...</Box>;
    }
return(
    <Box>
<Heading>OpenGameDetail Component</Heading>
<Box>{currentGame.id}</Box>
<Box className="game-card" key={currentGame.id}>

    {/* the following ternary is so the page doesn't break if the user's profile isn't filled out */}
    {currentGame.host_info.first_name && (
        <>
    <Text>{`${currentGame.host_info.first_name} ${currentGame.host_info.last_name}`}</Text>
    <Text>{currentGame.host}</Text>
    <Image
        src={`${currentGame.host_info.profile.profile_pic}`}
        alt={currentGame.host_info.username}
        fallbackSrc={noImage}
        borderRadius="full"
        boxSize="150px"
        />
    <Text>NTRP: {currentGame.host_info.profile.ntrp_rating} </Text>
        </>
    )}
    
    
    <Text>{currentGame.location_info.park_name}</Text>
    <Text>{currentGame.match_type}</Text>
    <Text>{currentGame.session_type}</Text>
    <Text>
        {DateTime.fromISO(currentGame.date).toLocaleString({
            weekday: "short",
            month: "short",
            day: "numeric",
        })}{" "}
        at{" "}
        {DateTime.fromISO(currentGame.time).toLocaleString(
            DateTime.TIME_SIMPLE
        )}
    </Text>
    <Button>Join</Button>
</Box>
</Box>
)

}

