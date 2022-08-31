<Box
    display="flex"
    flexWrap="wrap"
    maxW="350px"
    m="auto"
    justifyContent="center"
    textAlign="center"
>
    {gamesList.length > 0 && (
        <>
            {/* <Heading textTransform='capitalize' color='#285E61'>{gamesList[0].displayStatus}</Heading> */}
            {gamesList.map((game) => (
                <LinkBox key={game.game_session_id} cursor="pointer">
                    <LinkOverlay
                        onClick={() => {
                            handleOpenModal(game);
                        }}
                    >
                        <Box
                            className="game-card"
                            bg={`${game.bgColor}`}
                            key={game.id}
                        >
                            <Box
                                w="100%"
                                display="inline-block"
                                marginRight="0"
                            >
                                <Heading fontSize={24} color="teal">
                                    {game.location_info.park_name}
                                </Heading>
                                <Text color="#285E61">
                                    {game.match_type} | {game.session_type}
                                </Text>
                                <Text
                                    fontSize="1.2em"
                                    fontWeight="700"
                                    color="teal"
                                >
                                    {DateTime.fromISO(
                                        game.datetime
                                    ).toLocaleString(
                                        DateTime.DATETIME_MED_WITH_WEEKDAY
                                    )}
                                </Text>
                            </Box>
                        </Box>

                        <Box
                            borderRadius="100px"
                            borderColor="white"
                            bg={game.bgColor}
                            position="absolute"
                            top={0}
                            right={0}
                        >
                            <Icon
                                as={game.tennisBall}
                                color={rank}
                                fontSize="3em"
                                display="flex"
                            />
                            <Box marginTop={3}> {game.icon} </Box>
                        </Box>

                        <Box
                            borderColor="white"
                            color="teal"
                            position="absolute"
                            top={4}
                            marginLeft="250px"
                            fontSize="10px"
                        >
                            RANK&nbsp;
                        </Box>
                        <Box
                            color="teal"
                            position="absolute"
                            top={3}
                            right={12}
                            fontSize="14px"
                        >
                            {game.host_info.profile.teammate_ntrp}
                        </Box>
                        {/* <Box color='teal' fontSize='14px'> NTRP&nbsp;{game.host_info.profile.ntrp_rating}</Box> */}
                    </LinkOverlay>
                </LinkBox>
            ))}
        </>
    )}

    <Modal isOpen={modalIsOpen} contentLabel="Game Detail Modal" game={game} />
</Box>;
