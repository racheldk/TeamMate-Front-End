import { IconButton } from "@chakra-ui/react";
import { Button, Box, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
    BsEmojiFrownFill,
    BsFillEmojiNeutralFill,
    BsFillEmojiSmileFill,
} from "react-icons/bs";

const Survey = () => {

    const surveyResponses = []

    const game = {
        id: 3,
        host: "rachelk",
        host_info: {
            id: 2,
            username: "SampleUser 1",
            first_name: "Rachel",
            last_name: "Kelly",
            profile: {
                id: 1,
                user: "rachelk",
                profile_pic: "",
                ntrp_rating: "2.5",
                profile_image_file: null,
            },
        },
        date: "2022-08-27",
        time: "07:00:00",
        session_type: "Competitive",
        match_type: "Doubles",
        location: 1,
        location_info: {
            id: 1,
            park_name: "Pullen Park",
            court_count: 5,
            court_surface: "Hard Court",
            address: {
                id: 1,
                court: "Pullen Park",
                address1: null,
                address2: null,
                city: "Raleigh",
                state: "NC",
                zipcode: "27606",
            },
        },
        guest: [],
        guest_info: [
            {
                id: 1,
                user: "SampleUser 2",
                game_session: 13,
                status: "Accepted",
            },
            {
                id: 2,
                user: "SampleUser 3",
                game_session: 12,
                status: "Accepted",
            },
        ],
        confirmed: true,
        displayUsers: [
            {
                id: 1,
                username: "SampleUser 1",
                first_name: "Rachel",
                last_name: "Kelly",
                profile: {
                    id: 1,
                    user: "rachelk",
                    profile_pic: "",
                    ntrp_rating: "2.5",
                    profile_image_file: null,
                },
            },
            {
                id: 2,
                username: "SampleUser 2",
                game_session: 13,
                status: "Accepted",
            },
            {
                id: 3,
                username: "SampleUser 3",
                game_session: 12,
                status: "Accepted",
            },
            {
                id: 4,
                username: "SampleUser 4",
                game_session: 12,
                status: "Accepted",
            },
        ],
    };

    console.log(game);

    return (
        <Box className="survey">
            <Box>
                <Heading
                    color="teal"
                    size="md"
                    // marginLeft="90px"
                >
                    {game.match_type} game on {game.date}
                </Heading>

                <Box className="survey-text">
                    <Text mt={3}>Did anyone NOT come to the game?</Text>
                    <Button
                        variant="outline"
                        backgroundColor=""
                        colorScheme="teal"
                        color="teal"
                        height="30px"
                        m={1}
                    >
                        No, everyone came
                    </Button>
                    {game.displayUsers.map((user) => (
                        <Button
                            variant="outline"
                            backgroundColor=""
                            colorScheme="teal"
                            color="teal"
                            height="30px"
                            key={user.id}
                            m={1}
                            onClick={()=>
                                {console.log({about_user: user.id, response: "No Show"})
                                surveyResponses.push({about_user: user.id, response: "No Show"})}}
                        >
                            {user.username}
                        </Button>
                    ))}
                    <br />
                    <Text mt={3}>Who won?</Text>
                    {game.displayUsers.map((user) => (
                        <Button
                            variant="outline"
                            backgroundColor=""
                            colorScheme="teal"
                            color="teal"
                            height="30px"
                            key={user.id}
                            m={1}
                        >
                            {user.username}
                        </Button>
                    ))}

                    <br />
                    <Text mt={3}>
                        Would you like to block anyone from your future games?
                    </Text>
                    <Button
                        variant="outline"
                        backgroundColor=""
                        colorScheme="teal"
                        color="teal"
                        height="30px"
                        m={1}
                    >
                        No, I would play with them all again
                    </Button>
                    {game.displayUsers.map((user) => (
                        <Button
                            variant="outline"
                            backgroundColor=""
                            colorScheme="teal"
                            color="teal"
                            height="30px"
                            key={user.id}
                            m={1}
                        >
                            {user.username}
                        </Button>
                    ))}
                    <br />
                    <Text mt={3}>
                        How do you rate the court quality at{" "}
                        {game.location_info.park_name}?
                    </Text>
                    <div className="icon-survey">
                        <IconButton
                            aria-label="ProfileItem"
                            fontSize="2.5em"
                            colorScheme="green"
                            border="none"
                            variant="outline"
                            className=""
                            icon={<BsFillEmojiSmileFill />}
                        />
                        <IconButton
                            aria-label="ProfileItem"
                            fontSize="2.5em"
                            colorScheme="yellow"
                            border="none"
                            variant="outline"
                            className=""
                            icon={<BsFillEmojiNeutralFill />}
                        />
                        <IconButton
                            aria-label="Search Item"
                            fontSize="2.5em"
                            colorScheme="red"
                            border="none"
                            variant="outline"
                            className=""
                            icon={<BsEmojiFrownFill />}
                        />
                    </div>

                    <Button
                        marginLeft="10px"
                        width="300px"
                        height="30px"
                        // variant="ghost"
                        colorScheme="teal"
                        backgroundColor="teal"
                        color="white"
                        onClick={()=>console.log(surveyResponses)}
                    >
                        Submit
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default Survey;

{
    /* <Button
    variant="outline"
    backgroundColor=""
    colorScheme="teal"
    color="teal"
    height="30px"
    width="100px"
    marginRight="30px"
    marginLeft="30px"
    marginTop="10px"
    marginBottom="20px"
>
    Me
</Button>
<Button
    variant="outline"
    backgroundColor=""
    colorScheme="teal"
    color="teal"
    height="30px"
    width="103px"
    marginRight="30px"
    marginTop="10px"
    marginBottom="20px"
>
    Username
</Button> */
}
