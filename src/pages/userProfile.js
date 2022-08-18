import GamesList from "../components/gamesList"
import Header from "../components/HeaderMenu"
import Footer from "../components/FooterMenu"
import { useEffect, useState } from 'react'
import useLocalStorageState from "use-local-storage-state";
import axios from "axios";
import { Text, Heading } from '@chakra-ui/react'

function UserProfile({token, setToken}) {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useLocalStorageState("teammateUsername", null);

    useEffect(() => {
        axios
            .get(`https://teammate-app.herokuapp.com/${username}`,
            { headers: {
                Authorization: `Token ${token}`,
              },
    })
            .then((res) => {
                setUser(res.data);
                console.log(res.data)
            });
    }, [token]);

    return (

        <>
        <Header token={token} setToken={setToken}/>
        
        <div className="app-body">
        {user && 
        <>
        <div className="profile-body">
        <Heading size='2xl'>
        {user[0].username} 
        </Heading>
        </div>
        </>
        }
        </div>
        
        <Footer/>
        </>
    )
} 

export default UserProfile