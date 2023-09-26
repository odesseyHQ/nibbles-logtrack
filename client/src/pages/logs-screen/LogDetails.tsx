import { Badge, Box, Button, HStack, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { FaFolder } from "react-icons/fa";
const LogDetails = () => {
  return (
    <>
      <Box maxW="65.25rem" mx="auto" mt="7.75rem">
        <Heading as="h1">Log Details</Heading>
        <HStack mt="2" mb="2">
          <Text>Log Id:</Text>
          <Text color="teal" fontWeight={"bold"}>
            68495445
          </Text>
          <Badge colorScheme="red">Error</Badge>
        </HStack>
        <Text mb="2" fontWeight="bold">
          11:30:00 AM, 19/28/2022 IST
        </Text>
        <Button px="2" size="xs">
          <FaFolder />
          Salesboy-FE
        </Button>
        <Heading as="h2" mt="10" mb="5" fontSize="md">
          Log{" "}
        </Heading>
        <Text>
          Uncaught TypeError: Canot read the properties of undefined (reading
          'map) <br></br>
          at App (App. js:23:1) at renderWithHooks (react-dom. development.
          <br></br>
          js:16305:1) at mount IndeterminateComponent (react-dom. development.
          <br></br>
          js:20074:1) at beginWork (react-dom. development. js:21587:1) at{" "}
          <br></br>
          HTMLUnknownElement. callCallback (react-dom. development.js: 4164:1){" "}
          <br></br>
          at Object. invokeGuardedCallbackDev (react-dom.development.js:4213:1){" "}
          <br></br>
          at invokeGuardedCallback (react-dom. development.js: 4277:1) at{" "}
          <br></br>
          beginWork$1 (react-dom. development. jS:27451:1) <br></br>at
          performUnit0fWork (react-dom.development.js:26557:1)t workLoopSync
          (react-dom. development.js:26466:1)
        </Text>
        <Heading as="h2" mt="10" mb="5" fontSize="md">
          Meta{" "}
        </Heading>
        <Text>
          Timestamp: 2022-09-28 10:30:00 <br></br>Uncaught TypeError: Cannot
          read properties of undefined (reading 'map) <br></br>at App (App.
          js:23:1) <br></br> at renderWithHooks (react-dom. development.
          js:16305:1) <br></br> at mount IndeterminateComponent (react-dom.
          development. js:20074:1) <br></br>at beginWork (react-dom.
          development. js:21587:1) <br></br>
        </Text>
      </Box>
    </>
  );
};

export default LogDetails;
