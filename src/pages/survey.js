import { IconButton, scaleFadeConfig } from "@chakra-ui/react";
import { Button, Box, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
    BsEmojiFrownFill,
    BsFillEmojiNeutralFill,
    BsFillEmojiSmileFill,
} from "react-icons/bs";
import axios from "axios";
import { useParams } from "react-router-dom";

const Survey = ({token}) => {
    const [surveyPK, setSurveyPK] = useState(null)
    const [params] = useState(useParams())
    const [isLoading, setIsLoading] = useState(true)
    const [surveyGame, setSurveyGame] = useState(null)


    
    
    const surveyResponses = []

// use params to get game information 

useEffect(()=>{
    console.log(params.id)
    console.log('load game data')
    axios.get(`https://teammate-app.herokuapp.com//session/${parseInt(params.id)}`, {headers: {
        Authorization: `Token ${token}`,
    },
}).then((res)=>{
    // adapt data to have only host and accepted players in displayUsers
    console.log(res.data)})
    
    
    
    setIsLoading(false)
},[params.id, token])


useEffect(()=>{
    // get surveyPK
    setSurveyPK(1)
},[])

    const sampleResponses = [
        {
            about_user: 1,
            response: 'Winner'
        },
        {
            about_user: 2,
            response: 'No Show'
        }
    ]

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

    
    const handleSubmit = () => {
        console.log(surveyResponses)
        console.log(surveyPK)
        const axiosPosts = sampleResponses.map((obj)=> (
            axios.post(`https://teammate-app.herokuapp.com/session/${game.id}/survey/${surveyPK}/response`, {
                obj
            },  {
                headers: {
                    Authorization: `Token ${token}`,
                },
            }).then((res)=>{
                console.log(res)
            }).catch((error)=>{
                console.log(error)
                alert(error)
            })
        ))
        console.log(axiosPosts)
    
    }
    // ??!!! Where does the user go after their survey is submitted? 

    if(isLoading) {
        return <Box>...Loading</Box>
    }



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

                <Box marginLeft="10px" marginRight="12px">
                    <Text mt={4} colorScheme="teal"
                        backgroundColor="teal"
                        paddingLeft="10px"
                        borderRadius="5px"
                        height="40px"
                        fontSize="14px"
                        width="335px"
                        display="table-cell"
                        verticalAlign="middle"
                        color="white"
                        >Did anyone NOT come to the game?</Text>
                    <Button
                    _focus={ {backgroundColor:"#4FD1C5"}}
                    _active={{
                        transform: 'translateY(5px)', color:"white"}}
                        variant="outline"
                        backgroundColor="white"
                        colorScheme=""
                        color="teal"
                        height="30px"
                        width="318px"
                        letterSpacing="1px"
                        fontSize="13px"
                        m={2}
                    >
                        No, everyone came
                    </Button>
                    {game.displayUsers.map((user) => (
                    <Button className="won"
                        _focus={ {backgroundColor:"#4FD1C5"}}
                        _active={{transform: 'translateY(5px)', color:"white"}}
                        variant="outline"
                        backgroundColor="white"
                        colorScheme=""
                        color="teal"
                        height="30px"
                        width="150px"
                        letterSpacing="2px"
                        fontSize="13px"
                        key={user.id}
                        m={2}
                        onClick={()=>
                            {console.log({about_user: user.id, response: "No Show"})
                            surveyResponses.push({about_user: user.id, response: "No Show"})}}
                    >
                        {user.username}
                    </Button>
                    
                    ))}
                    <br />
                    
                    <Text mt={3}  backgroundColor="teal"
                        paddingLeft="10px"
                        borderRadius="5px"
                        height="40px"
                        color="white"
                        fontSize="14px"
                        width="335px"
                        display="table-cell"
                        verticalAlign="middle"
                        >Who won?</Text>
                    {game.displayUsers.map((user) => (
                    <Button
                        _focus={ {backgroundColor:"#4FD1C5"}}
                        _active={{transform: 'translateY(5px)', color:"white"}}
                            variant="outline"
                            backgroundColor="white"
                            colorScheme=""
                            color="teal"
                            height="30px"
                            width="150px"
                            letterSpacing="2px"
                            fontSize="13px"
                            key={user.id}
                            m={2}
                            onClick={()=>
                                {console.log({about_user: user.id, response: "Winner"})
                                surveyResponses.push({about_user: user.id, response: "Winner"})}}
                        >
                            {user.username}
                        </Button>
                    ))}
                    
                
                    <br />
                    <Text mt={3}  backgroundColor="teal"
                        paddingLeft="10px"
                        borderRadius="5px"
                        color="white"
                        height="40px"
                        fontSize="14px"
                        width="335px"
                        display="table-cell"
                        verticalAlign="middle"
                        >Would you like to block anyone from your future games?
                    </Text>
                    <Button
                    _focus={ {backgroundColor:"#4FD1C5"}}
                    _active={{
                        transform: 'translateY(5px)', color:"white"}}
                        variant="outline"
                        backgroundColor="white"
                        colorScheme=""
                        color="teal"
                        height="30px"
                        width="318px"
                        letterSpacing="1px"
                        fontSize="13px"
                        m={2}
                    >
                        No, I would play with them again
                    </Button>
                    {game.displayUsers.map((user) => (
                        <Button
                        _focus={ {backgroundColor:"#4FD1C5"}}
                        _active={{transform: 'translateY(5px)', color:"white"}}
                        variant="outline"
                        backgroundColor="white"
                        colorScheme=""
                        color="teal"
                        height="30px"
                        width="150px"
                        letterSpacing="2px"
                        fontSize="13px"
                        key={user.id}
                        m={2}
                            onClick={()=>
                                {console.log({about_user: user.id, response: "Block User"})
                                surveyResponses.push({about_user: user.id, response: "Block User"})}}
                        >
                            {user.username}
                        </Button>
                    ))}
                    <br />
                    <Text mt={3}  backgroundColor="teal"
                        paddingLeft="10px"
                        borderRadius="5px"
                        color="white"
                        height="40px"
                        fontSize="14px"
                        width="335px"
                        display="table-cell"
                        verticalAlign="middle"
                        >How do you rate the court quality at{" "}
                        {game.location_info.park_name}?
                    </Text>
                    <div className="icon-survey">
                        <IconButton
                            aria-label="ProfileItem"
                            fontSize="2.5em"
                            colorScheme="green"
                            color="#8fbc8f"
                            _focus={ {color:"#32CD32"}}
                            _hover={{ transform: "scale(1.5)" }}
                            border="none"
                            variant="outline"
                            className=""
                            icon={<BsFillEmojiSmileFill />}
                            onClick={()=>
                                {console.log({about_court: game.location, response: "High Quality"})
                                surveyResponses.push({about_court: game.location, response: "High Quality"})}}
                        />
                        <IconButton
                            aria-label="ProfileItem"
                            fontSize="2.5em"
                            colorScheme="yellow"
                            color="#f0e68c"
                            _focus={ {color:"#ffd700"}}
                            _hover={{ transform: "scale(1.5)" }}
                            border="none"
                            variant="outline"
                            className=""
                            icon={<BsFillEmojiNeutralFill />}
                            onClick={()=>
                                {console.log({about_court: game.location, response: "Average Quality"})
                                surveyResponses.push({about_court: game.location, response: "Average Quality"})}}
                        />
                        <IconButton
                            aria-label="Search Item"
                            fontSize="2.5em"
                            colorScheme="red"
                            color="#ab4b52"
                            _focus={{color:"#ed1c24"}}
                            _hover={{ transform: "scale(1.5)" }}
                            border=""
                            variant="outline"
                            className=""
                            icon={<BsEmojiFrownFill />}
                            onClick={()=>
                                {console.log({about_court: game.location, response: "Poor Quality"})
                                surveyResponses.push({about_court: game.location, response: "Poor Quality"})}}
                        />
                    </div>
                    

                    <Button
                        marginLeft="85px"
                        width="150px"
                        height="30px"
                        // variant="ghost"
                        colorScheme="teal"
                        backgroundColor="teal"
                        color="white"
                        onClick={()=>handleSubmit()}
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
