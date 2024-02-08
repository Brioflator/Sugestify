import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Heading,
  Input,
  Text,
  Spinner,
  Center,
  VStack,
    Code,
} from "@chakra-ui/react";

const Lyrics = () => {
  const [lyrics, setLyrics] = useState("");
  const [artist, setArtist] = useState("");
  const [song, setSong] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLyrics = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.lyrics.ovh/v1/${artist}/${song}`
        );
        setLyrics(response.data.lyrics);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching lyrics:', error);
        setLoading(false);
      }
    };

    if (artist && song) {
      fetchLyrics();
    }
  }, [artist, song]);

  return (
    <Center>
      <VStack>
      <Text
          bgGradient="linear(to-l,#00E9F5 ,#61E294 )"
          bgClip="text"
          fontSize="6xl"
          fontWeight="extrabold"
        >
          Search Lyrics
        </Text>
        <Input
          type="text"
          placeholder="Artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          my={4}
        />
        <Input
          type="text"
          placeholder="Song"
          value={song}
          onChange={(e) => setSong(e.target.value)}
          my={4}
        />
        {loading && <Spinner />}
      <Box width="100%" p={4}>
        <Code colorScheme="teal" fontSize="lg" p={4} whiteSpace="pre">{lyrics}</Code>
      </Box>
      </VStack>
    </Center>
  );
};

export default Lyrics;
