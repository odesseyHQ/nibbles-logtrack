import {
  Badge,
  Box,
  Button,
  CloseButton,
  HStack,
  Heading,
  Text,
} from "@chakra-ui/react";

import { FaFolder } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useSingleLog } from "./hooks/logs.hooks";
import { useNavigate } from "react-router-dom";
const LogDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string | undefined }>();
  const { data, isLoading } = useSingleLog(id);
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      <CloseButton
        position="fixed"
        top="1rem"
        right="1rem"
        zIndex="999"
        onClick={() => {
          navigate("/logs");
        }}
      />
      <Box maxW="65.25rem" mx="auto" mt="7.75rem">
        <Heading as="h1">Log Details</Heading>
        <HStack mt="2" mb="2">
          <Text>Log Id:</Text>
          <Text color="teal" fontWeight={"bold"}>
            {data.id}
          </Text>
          <Badge
            colorScheme={
              data.logType === "ERROR"
                ? "red"
                : data.logType === "WARNING"
                ? "yellow"
                : data.logType === "INFO"
                ? "blue"
                : "gray"
            }
          >
            {data.logType}
          </Badge>
        </HStack>
        <Text mb="2" fontWeight="bold">
          {data.createdAt}
        </Text>
        <Button px="2" size="xs" display="flex" gap="2" alignItems="center">
          <span>
            <FaFolder />
          </span>
          <span>{data.project.projectCode}</span>
        </Button>
        <Heading as="h2" mt="10" mb="5" fontSize="md">
          Log{" "}
        </Heading>
        <Text>{data.log}</Text>
        <Heading as="h2" mt="10" mb="5" fontSize="md">
          Meta{" "}
        </Heading>
        <Text>{data.meta ? data.meta : "N/A"}</Text>
      </Box>
    </>
  );
};

export default LogDetails;
