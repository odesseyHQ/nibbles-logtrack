import TopBar from "../../components/shared/layouter/Topbar";
import {
  Box,
  Flex,
  HStack,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
} from "@chakra-ui/react";
import { AiOutlineFolder, AiOutlineCalendar } from "react-icons/ai";
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import LogTable from "./LogTable";
import { useState } from "react";

const Logs = () => {
  const [selectedLogType, setSelectedLogType] = useState("");

  const handleLogTypeChange = (event) => {
    setSelectedLogType(event.target.value);
  };
  return (
    <>
      <TopBar />
      <Box maxW="65.25rem" mx="auto" mt="7.75rem">
        <Heading as="h1">Logs</Heading>

        <Flex
          px={4}
          py={2}
          alignItems="center"
          bg="white"
          justifyContent="space-between"
          mt="4rem"
          mb="1.25rem"
        >
          <Flex>
            <HStack align="center">
              <Icon as={AiOutlineFolder} boxSize={6} mr={2} />
              <Select placeholder="All Projects">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
              <Box borderLeft="1px solid black" height="1.875" mx={2} />
            </HStack>
            <HStack align="center">
              <Icon as={IoExtensionPuzzleOutline} boxSize={6} mr={2} />
              <Select
                placeholder="Log Type"
                value={selectedLogType}
                onChange={handleLogTypeChange}
              >
                <option value="ERROR">ERROR</option>
                <option value="WARNING">WARNING</option>
                <option value="INFO">INFO</option>
              </Select>
              <Box borderLeft="1px solid black" height="1.875" mx={2} />
            </HStack>
            <HStack align="center">
              <Icon as={AiOutlineCalendar} boxSize={6} mr={2} />
              <Select placeholder="24H">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </HStack>
          </Flex>
          <Box>
            <InputGroup>
              <InputLeftAddon children="Search by Log id" />
              <Input type="search" placeholder="Type log id here" />
            </InputGroup>
          </Box>
        </Flex>
        <LogTable selectedLogType={selectedLogType} />
      </Box>
    </>
  );
};

export default Logs;
