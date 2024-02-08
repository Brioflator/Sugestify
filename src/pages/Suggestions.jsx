import React, { useState } from "react";
import {
  Input,
  Button,
  Box,
  Heading,
  Text,
  Center,
  VStack,
  Code,
  HStack,
} from "@chakra-ui/react";
import axios from "axios";
import { db } from "../lib/firebase.js";
import { auth } from "../lib/firebase.js";
import { AddIcon } from "@chakra-ui/icons";
import { doc, getDoc, setDoc } from "firebase/firestore";

const Suggestions = () => {
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [result, setResult] = useState(null);
  const [resultAlbum, setResultAlbum] = useState(null);

  const handleSearch = async () => {
    try {
      const artistData = await axios.get(
        `https://musicbrainz.org/ws/2/artist/?query=${artist}&fmt=json`
      );
      const artistId = artistData.data.artists[0].id; // Access the data property and the first artist

      const albumData = await axios.get(
        `https://musicbrainz.org/ws/2/release?artist=${artistId}&album=${album}&fmt=json`
      );
      const matchingAlbum = albumData.data.releases.find(
        (release) => release.title === album
      );
      let albumId;
      if (matchingAlbum) {
        albumId = matchingAlbum.id;
      } else {
        albumId = albumData.data.releases[0].id;
      }

      const songData = await axios.get(
        `https://musicbrainz.org/ws/2/release/${albumId}?inc=recordings&fmt=json`
      );
      const songs = songData.data.media[0].tracks; // Access the data property, the first media, and its tracks

      setResult(songs);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAlbumSearch = async () => {
    try {
      const artistData = await axios.get(
        `https://musicbrainz.org/ws/2/artist/?query=${artist}&fmt=json`
      );
      const artistId = artistData.data.artists[0].id; // Access the data property and the first artist

      const albumData = await axios.get(
        `https://musicbrainz.org/ws/2/release?artist=${artistId}&album=${album}&fmt=json`
      );
      const albums = albumData.data.releases;

      const albumTitles = [...new Set(albums.map((album) => album.title))];
      const albumTitlesString = albumTitles.join("\n");

      setResultAlbum(albumTitles);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleLike = async (artist, album, song) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        return;
      }

      const userId = user.uid;
      const likeRef = doc(db, "likes", userId);

      const likeSnapshot = await getDoc(likeRef);
      let likesData = likeSnapshot.data();

      if (!likesData) {
        likesData = {
          user: userId,
          likes: [],
        };
      }

      const newLike = { artist, album, song };
      if (
        !likesData.likes.some(
          (like) => JSON.stringify(like) === JSON.stringify(newLike)
        )
      ) {
        likesData.likes.push(newLike);
      }

      await setDoc(likeRef, likesData);

      console.log("Like saved successfully");
    } catch (error) {
      console.error("Error saving like:", error);
    }
  };

  return (
    <Center>
      <VStack>
        <Box width="max-content">
        <Text
          bgGradient="linear(to-l,#00E9F5 ,#61E294 )"
          bgClip="text"
          fontSize="6xl"
          fontWeight="extrabold"
        >
          Find albums and songs
        </Text>
          <HStack>
            <Input
              type="text"
              placeholder="Enter artist name"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              my={4}
            />
            <Button onClick={handleAlbumSearch} bg={"green.300"}>
              Search albums
            </Button>
          </HStack>

          <HStack>
            <Input
              type="text"
              placeholder="Enter album name"
              value={album}
              onChange={(e) => setAlbum(e.target.value)}
              my={4}
            />
            <Button onClick={handleSearch} bg={"green.300"}>
              Search songs
            </Button>
          </HStack>

          <HStack spacing={8}>
            <Box w="50%" borderWidth={1} borderRadius="lg" p={4}>
              <Heading>Albums</Heading>
              {resultAlbum &&
                resultAlbum.map((title, index) => (
                  <HStack>
                    <Button
                      colorScheme="white"
                      variant="ghost"
                      onClick={() => handleLike(artist, title, null)}
                    >
                      {<AddIcon />}
                    </Button>
                    <Text key={index}>{title}</Text>
                  </HStack>
                ))}
            </Box>{" "}
            <Box w="50%" borderWidth={1} borderRadius="lg" p={4}>
              {" "}
              <Heading>Songs</Heading>{" "}
              {result &&
                result.map((release, index) => (
                  <HStack key={index}>
                    <Button
                      colorScheme="white"
                      variant="ghost"
                      onClick={() => handleLike(artist, album, release.title)}
                    >
                      {<AddIcon />}
                    </Button>
                    <Text>{release.title}</Text>
                  </HStack>
                ))}
            </Box>
          </HStack>
        </Box>
      </VStack>
    </Center>
  );
};

export default Suggestions;
