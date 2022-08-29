import { Text, Heading, Image, Button, Box } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { DateTime } from "luxon";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useState } from "react";


export default function IrrelevantPastGamesDetail({ token, handleClosePastGameModal, game }) {
    const [surveyOpen, setSurveyOpen] = useState(false)
    
    console.log(game)
    
    const handleOpenSurvey=()=>{
        console.log('survey clicked')
        handleClosePastGameModal()
        setSurveyOpen(true)
    }

    if(surveyOpen) {
        console.log(game)
        return <Navigate to={`survey/${game.game_session_id}`} />
    }

    return (
        <Box className="modal-overlay">
            <Box className="modal-base">
                <Button
                    onClick={() => {
                        handleClosePastGameModal();
                    }}
                    className="close-modal-button"
                    // variant="ghost"
                    colorScheme="teal"
                >
                    <CloseIcon color="white" />
                </Button>
                <h1>past games detail </h1>
                <text>game details will go here, waiting until structure is finalized to input, but will be similar to GameDetail</text>
                <Button  onClick={()=> handleOpenSurvey(game)}>Take Survey</Button>
            </Box>
        </Box>
    );
}
