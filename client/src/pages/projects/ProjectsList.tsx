import React from "react";
import TopBar from "../../components/shared/layouter/Topbar";
import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Icon,
  Select,
} from "@chakra-ui/react";
import { AiOutlineCalendar } from "react-icons/ai";
import ProjectListTable from "./ProjectListTable";
const ProjectsList = () => {
  return (
    <>
      <TopBar />
      <Box maxW="65.25rem" mx="auto" mt="7.75rem">
        <Heading as="h1" color="#746666">
          Project List
        </Heading>
        <Flex
          px={4}
          py={2}
          alignItems="center"
          bg="white"
          justifyContent="space-between"
          mt="4rem"
          mb="1.25rem"
        >
          <HStack align="center">
            <Icon as={AiOutlineCalendar} boxSize={6} mr={2} />
            <Select placeholder="24H">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </HStack>
          <Button colorScheme="teal" variant="solid">
            Create Project
          </Button>
        </Flex>
        <ProjectListTable />
      </Box>
    </>
  );
};

export default ProjectsList;
