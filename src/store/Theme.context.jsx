import { createContext, useContext } from "react";
import { ChakraProvider, useColorMode, ColorModeScript } from "@chakra-ui/react";
import theme from './theme'; // Assuming you have a theme.js file

export const ThemeContext = createContext({
  switchTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <ThemeContext.Provider
      value={{
        switchTheme: toggleColorMode,
      }}
    >
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={colorMode} />
        {children}
      </ChakraProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};