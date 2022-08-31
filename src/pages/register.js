import {
    Button,
    Box,
    Heading,
    FormControl,
    FormLabel,
    Text,
    Link,
    Image
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { Navigate, Link as ReactLink } from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
    CloseButton,
} from "@chakra-ui/react";
import logo from "../images/teammate-logo-3.png";

export const Register = ({ setAuth }) => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [token, setToken] = useLocalStorageState("teammateToken", null);
    const { isOpen, onClose, onOpen } = useDisclosure();
    const [alertTitle, setAlertTitle] = useState(null);
    const [alertMessage, setAlertMessage] = useState(null);


    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios

            .post(`https://teammate-app.herokuapp.com/auth/users/`, {
                first_name: firstname,
                last_name: lastname,
                username: username,
                password: password,
            })
            .then(() => {
                axios
                    .post(
                        "https://teammate-app.herokuapp.com/auth/token/login/",
                        {
                            username: username,
                            password: password,
                        },
                        console.log("logged in")
                    )
                    .then((res) => {
                        const token = res.data.auth_token;
                        setAuth(username, token);
                        setToken(token);
                    })
                    
                    }).catch((error) => {
                        console.log(error);
                        console.log("there was an error");
                        console.log(error.request.responseText)
                        setAlertTitle("Uh oh, something went wrong. ");
                        setAlertMessage(error.request.responseText);
                        onOpen();
            });
    };


    if (token) {
        return <Navigate to="/open-games" />;
    }

    return (
        <>
                            <Box display='flex' justifyContent='center'> <Image
                    src={logo}
                    alt='TeamMate logo'
                    w='300px'
                />
                </Box>
            <Box h='100px' >&nbsp;</Box>
            <Box className="app-body">
                <Box className="form">
                    <Heading color="#285E61" className="form-banner">
                        Registration
                    </Heading>
                    {error && <Box className="error">{error}</Box>}
                    <FormControl id="new-user-form">
                        <Box m={2}>
                            <FormLabel display="inline-block" color="#2C7A7B">
                                First Name
                            </FormLabel>
                            <input
                                id="inputFirstname"
                                className="form-control"
                                placeholder="First name"
                                onChange={(e) => setFirstname(e.target.value)}
                            />
                        </Box>
                        <Box m={2}>
                            <FormLabel display="inline-block" color="#2C7A7B">
                                Last Name
                            </FormLabel>
                            <input
                                id="inputLastname"
                                className="form-control"
                                placeholder="Last name"
                                onChange={(e) => setLastname(e.target.value)}
                            />
                        </Box>
                        <FormLabel display="inline-block" color="#2C7A7B">
                            Username
                        </FormLabel>
                        <input
                            id="inputUsername"
                            className="form-control"
                            placeholder="Username"
                            onChange={(e) => setUsername(e.target.value)}
                            type="username"
                        />
                        <Box m={2}>
                            <FormLabel display="inline-block" color="#2C7A7B">
                                Password
                            </FormLabel>
                            <input
                                id="inputPassword"
                                className="form-control"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                            />
                        </Box>
                        <Box
                            w="100"
                            display="flex"
                            justifyContent="center"
                            m={2}
                        >
                            {" "}
                            <Button
                                colorScheme="teal"
                                type="submit"
                                onClick={(e) => handleSubmit(e)}
                            >
                                Submit
                            </Button>
                        </Box>
                    </FormControl>
                    <ReactLink to="/">
                        <Text color="#285E61" fontSize="12px">
                            Back to Login
                        </Text>
                    </ReactLink>
                </Box>
                <AlertDialog isOpen={isOpen} onClose={onClose}>
                        <AlertDialogOverlay>
                            <AlertDialogContent>
                                <CloseButton
                                    alignSelf="flex-end"
                                    position="relative"
                                    // right={-1}
                                    // top={-1}
                                    onClick={() => {
                                        onClose();
                                    }}
                                />
                                <AlertDialogHeader>
                                    {alertTitle}
                                </AlertDialogHeader>
                                <AlertDialogBody>
                                    {alertMessage}
                                </AlertDialogBody>
                            </AlertDialogContent>
                        </AlertDialogOverlay>
                    </AlertDialog>
            </Box>
            <Box className="spacer">&nbsp;</Box>
        </>
    );
};

export default Register;
