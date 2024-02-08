import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  InputGroup,
  InputRightElement,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuthenticated } from "../store/auth.reducer";
import { Navigate, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const boxColor = useColorModeValue("teal.50", "teal.900");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  const onLogin = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    }
  };

  return (
    <Center flexDirection="column" height="100vh">
      <Center
        flexDirection="column"
        p="20"
        bg={boxColor}
        boxShadow="2"
        borderRadius="lg"
      >
        <Heading
          bgGradient="linear(to-l,#00E9F5 ,#61E294 )"
          bgClip="text"
          fontSize="5xl"
          fontWeight="extrabold"
          pb={2}
        >
          Log in
        </Heading>
        <FormControl>
          <FormLabel>E-mail</FormLabel>
          <Input
            value={email}
            placeholder="Enter E-mail"
            onChange={(event) => {
              setEmail(event.target.value);
              setError("");
            }}
            type="email"
          />
        </FormControl>

        <FormControl mt="5">
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setError("");
              }}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick} bg="#61E294">
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        {error && <Text color="red">{error}</Text>}

        <Text
          color="green"
          onClick={() => {
            navigate("/register");
          }}
        >
          Do you need an account?
        </Text>

        <Button mt="5" onClick={onLogin} bg="#61E294">
          Log in
        </Button>
      </Center>
    </Center>
  );
};

export default LoginPage;
