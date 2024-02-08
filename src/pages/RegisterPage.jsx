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
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const boxColor = useColorModeValue("teal.50", "teal.900");

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  const onRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      navigate("/login");
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
          Regsiter
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
            navigate("/login");
          }}
        >
          Do you have an account?
        </Text>

        <Button mt="5" onClick={onRegister} bg="#61E294">
          Register
        </Button>
      </Center>
    </Center>
  );
};

export default RegisterPage;
