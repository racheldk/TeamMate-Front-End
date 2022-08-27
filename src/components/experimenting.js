// loop through each object received from GET request. 
// within each new object need another loop to create the guest objects inside of displayUsers. 

// or just have separate host and guest keys inside game? 

// want displayUsers data to be shaped like: 
datafromBEarray.map((game) =>(
    {   host: {type: "host",
            guestStatus: "host",
            username: {game.host},
            first_name: {game.host_info.first_name},
            last_name: {game.host_info.last_name},
            id: {game.host_info.id},
            profile_pic: {game.host_info.profile.profile_image_file},
            ntrp: {game.host_info.profile.ntrp_rating}
        }, 
        displayGuests: [
        {type: "guest",
        guestStatus: "pending",
        username: {game.guest_info.user},
        first_name: {game.guest_info.user_info.first_name},
        last_name: {game.guest_info.user_info.last_name},
        id: {game.guest_info.user_info.id},
        profile_pic: {game.guest_info.user_info.profile.profile_image_file},
        ntrp: {game.guest_info.user_info.ntrp_rating}
        }
        ],
        ...game
    }
))

// if restructuring the BE data doesn't work, take the map out of state setter and make the array first and then set the state with it 

