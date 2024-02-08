import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, VStack, Text, Center } from "@chakra-ui/react";
import axios from "axios";

const HomePage = () => {

  const navigate = useNavigate();

  const navigateToSuggestions = () => {
    navigate('/suggestions');
  };

  return (
    <Center>
      <VStack>
        <Text
          bgGradient="linear(to-l,#00E9F5 ,#61E294 )"
          bgClip="text"
          fontSize="6xl"
          fontWeight="extrabold"
        >
          Welcome to Musicfy
        </Text>
        <Text fontSize="xl" fontWeight="bold">
          Your go to place for music and lyrics
        </Text>
        <Button colorScheme="green" mt={4} onClick={navigateToSuggestions}>
          Start exploring
        </Button>
      </VStack>
    </Center>
  );
};

export default HomePage;
