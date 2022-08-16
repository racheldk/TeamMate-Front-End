// make all the axios requests and pass all those as props
// [] confirmed
// [] pendingPOVguest
// [] pendingPOVhost
// [] myOpen

// listType state is held in App.js

// header
// native menu (menu that's only on this page) to different types of lists
// GamesList component of a certain list type - pass in listType state and the list data as props
// GamesList: confirmed games
// GamesList: pending requests to join other games "pendingPOVGuest"
// GamesList: pending requests to join my games "pendingPOVHost"
// GamesList: my open games (no requests yet to join, so I could delete them without it impacting anyon)

// footer component

import Header from "../components/HeaderMenu";
import Footer from "../components/FooterMenu";

export default function MyGames() {
    const [listTitle, setListTitle] = useState(null)



    return (
        <>
            <Header />
            <div>
                {/* this div will hold the native menu */}
                {/* each button: 
            [] render GamesList 
            [] change listType 
            [] pass props
        */}
                <button>Confirmed Games</button>
                <button>Pending Requests I Have Made</button>
                <button>Pending Requests to Join my Games</button>
                <button>My Open Games</button>
            </div>

            <Footer />
        </>
    );
}
