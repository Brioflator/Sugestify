import { Link, Outlet, useMatch } from "react-router-dom";
import { Button, Box, HStack, Text, useColorModeValue, useColorMode } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { useTheme } from "../../store/Theme.context";
import { CloseIcon } from "@chakra-ui/icons";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";

const Navbar = () => {
  const homeMatch = useMatch("/");
  const lyricsMatch = useMatch("/lyrics");
  const suggestionsMatch = useMatch("/suggestions");
  const likesMatch = useMatch("/likes");

  const { colorMode, toggleColorMode } = useColorMode();
  const { theme, switchTheme } = useTheme();

  const bgColor = useColorModeValue("light", "dark");
  const colorUnselected = useColorModeValue("#004346", "gray");
  const Icon = colorMode === "light" ? MoonIcon : SunIcon;

  return (
    <>
      <HStack bg= {bgColor} p="3" spacing="10">
        <Box p="3">
          <Link to="/">
            <Text
              color={homeMatch ? "#61E294" : colorUnselected}
              fontWeight="bold"
              fontSize="20"
            >
              Home
            </Text>
          </Link>
        </Box>

        <Box>
          <Link to="/lyrics">
            <Text
              color={lyricsMatch ? "#61E294" : colorUnselected}
              fontWeight="bold"
              fontSize="20"
            >
              Lyrics
            </Text>
          </Link>
        </Box>

        <Box>
          <Link to="/suggestions">
            <Text
              color={suggestionsMatch ? "#61E294" : colorUnselected}
              fontWeight="bold"
              fontSize="20"
            >
              Albums
            </Text>
          </Link>
        </Box>

        <Box>
          <Link to="/likes">
            <Text
              color={likesMatch ? "#61E294" : colorUnselected}
              fontWeight="bold"
              fontSize="20"
            >
              Likes
            </Text>
          </Link>
        </Box>

        <Button
          colorScheme="white"
          variant="ghost"
          onClick={toggleColorMode}
        >
          {<Icon />}
        </Button>

        <Button
          colorScheme="white"
          variant="outline"
          ml="auto"
          mr="5"
          _hover={{
            cursor: "pointer",
          }}
          onClick={() => {
            signOut(auth);
          }}
          leftIcon={<CloseIcon />}
        >
          Sign out
        </Button>
      </HStack>

      <Outlet />
    </>
  );
};

export default Navbar;
