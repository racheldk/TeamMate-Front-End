import {
    Button,
    Box,
    Text,
    Heading,
    FormControl,
    FormLabel,
    useDisclosure,
} from "@chakra-ui/react";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";

function Login({ setAuth }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState([]);
    const [token, setToken] = useLocalStorageState("teammateToken", null);
    const { isOpen, onClose, onOpen } = useDisclosure();

    const handleLogin = (event) => {
        event.preventDefault();

        axios
            .post(`https://teammate-app.herokuapp.com/auth/token/login/`, {
                username: username,
                password: password,
            })
            .then((res) => {
                const token = res.data.auth_token;
                setAuth(username, token);
                setToken(token);
            })
            .catch((res) => {
                console.log(res);
                let error = res.response.data.non_field_errors;
                setError(error);
                onOpen();
            });
    };

    if (token) {
        return <Navigate to="/open-games" />;
    }

    return (
        <>
            <Box className="spacer">&nbsp;</Box>
            <Box className="app-body">
                <Box className="login-box">
                    {/* <Button onClick={()=>{onOpen(); setError("testing error")}}>Test Alert</Button> */}
                    <FormControl className="form" w="300px" textAlign="center">
                        <Heading className="form-banner" color="#285E61">
                            Login
                        </Heading>
                        <FormLabel
                            w="100%"
                            textAlign="center"
                            mt={5}
                            mb={0}
                            color="#285E61"
                        >
                            Username
                        </FormLabel>
                        <input
                            id="inputUsername"
                            class="form-control"
                            placeholder="Username"
                            required
                            autofocus
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <br />
                        <FormLabel
                            for="inputPassword"
                            w="100%"
                            textAlign="center"
                            mt={5}
                            mb={0}
                            color="#285E61"
                        >
                            Password
                        </FormLabel>
                        <input
                            type="password"
                            id="inputPassword"
                            class="form-control"
                            placeholder="Password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <br />
                        <Button
                            colorScheme="teal"
                            type="submit"
                            m={2}
                            onClick={(e) => handleLogin(e)}
                        >
                            Login
                        </Button>
                        <br />
                        <Link to="register">
                            <Text color="#285E61" fontSize="12px">
                                New User? Create an Account
                            </Text>
                        </Link>
                    </FormControl>

                    <AlertDialog isOpen={isOpen} onClose={onClose}>
                        <AlertDialogOverlay>
                            <AlertDialogContent>
                                <AlertDialogHeader>Uh oh!</AlertDialogHeader>
                                <AlertDialogBody>{error}</AlertDialogBody>
                                <AlertDialogFooter>
                                    <Button onClick={() => onClose()}>
                                        Close
                                    </Button>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialogOverlay>
                    </AlertDialog>
                </Box>
            </Box>
            <Box className="spacer">&nbsp;</Box>
        </>
    );
}
export default Login;
