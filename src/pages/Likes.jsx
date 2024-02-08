import React, { useEffect, useState } from "react";
import { db, auth } from "../lib/firebase.js";
import { Box, Heading, VStack, Text, HStack, Center } from "@chakra-ui/react";
import { doc, getDoc } from "firebase/firestore";

const Likes = () => {
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    const fetchLikes = async () => {
      const user = auth.currentUser;
      if (!user) {
        return;
      }
      const userId = user.uid;
      const likesRef = await getDoc(doc(db, "likes", userId));
      const likesData = likesRef.data();
      setLikes(likesData.likes);
    };

    fetchLikes();
  }, []);

  const artists = [...new Set(likes.map(like => like.artist))];
const albums = [...new Set(likes.map(like => like.album))];
const songs = likes.map(like => like.song).filter(song => song !== null);

  return (
    <Center>
    <HStack spacing={20} mt={50}>
    <VStack spacing={8}>
    <Text
          bgGradient="linear(to-l,#00E9F5 ,#61E294 )"
          bgClip="text"
          fontSize="4xl"
          fontWeight="extrabold"
        >
          Liked Artists
        </Text>
    {artists.map((artist, index) => (
      <Box key={index}>
        <Text fontSize="xl" fontWeight="bold">{artist}</Text>
      </Box>
    ))}
    </VStack>
    
    <VStack spacing={8}>
    <Text
          bgGradient="linear(to-l,#00E9F5 ,#61E294 )"
          bgClip="text"
          fontSize="4xl"
          fontWeight="extrabold"
        >
          Liked Albums
        </Text>
    {albums.map((album, index) => (
      <Box key={index}>
        <Text fontSize="xl" fontWeight="bold">{album}</Text>
      </Box>
    ))} 
    </VStack>
    
    <VStack spacing={8}>
    <Text
          bgGradient="linear(to-l,#00E9F5 ,#61E294 )"
          bgClip="text"
          fontSize="4xl"
          fontWeight="extrabold"
        >
          Liked Songs
        </Text>
    {songs.map((song, index) => (
      <Box key={index}>
        <Text fontSize="xl" fontWeight="bold">{song}</Text>
      </Box>
    ))} 
    </VStack>
    
  </HStack>
  </Center>
  );
};

export default Likes;
