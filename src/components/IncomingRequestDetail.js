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

export default function IncomingRequestDetail() {
return(
    <Box>
        <Heading>Incoming Game Detail component</Heading>
    </Box>
)

}