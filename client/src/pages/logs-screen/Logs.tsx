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
  Text,
} from "@chakra-ui/react";
import { AiOutlineFolder, AiOutlineCalendar } from "react-icons/ai";
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import LogTable from "./LogTable";
import { useState } from "react";
import { useProjectList } from "../projects/hooks/projects.hooks";
import { useParams } from "react-router-dom";

const Logs = () => {
  const [selectedLogType, setSelectedLogType] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [searchedLogId, setSearchedLogId] = useState<string>("");
  const [logId, setLogId] = useState<string>("");
  const { id: projectId } = useParams<{ id: string | undefined }>();

  const projectIdFilter = projectId ? { projectId: { IN: [projectId] } } : {};
  const filter = { ...projectIdFilter };
  const { data: projectList, isLoading: projectListLoading } =
    useProjectList(filter);

  const handleLogTypeChange = (event: any) => {
    setSelectedLogType(event.target.value);
  };
  const handleProjectTypeChange = (event: any) => {
    setSelectedProject(event.target.value);
  };
  const handleSearchButtonClick = () => {
    setLogId(searchedLogId);
  };
  if (projectListLoading) {
    return <Text>Loading...</Text>;
  }
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
              <Select
                placeholder={
                  projectId ? projectList?.projectCode : "All Projects"
                }
                value={selectedProject}
                onChange={handleProjectTypeChange}
              >
                {projectList &&
                  projectList.map((project: any) => (
                    <option key={project.projectId} value={project.projectId}>
                      {project.projectCode}
                    </option>
                  ))}
              </Select>
              <Box borderLeft="1px solid black" height="1.875" mx={2} />
            </HStack>
            <HStack align="center">
              <Icon as={IoExtensionPuzzleOutline} boxSize={6} mr={2} />
              <Select
                placeholder="All Logs"
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
              <InputLeftAddon
                children="Search by Log id"
                onClick={handleSearchButtonClick}
                style={{ cursor: "pointer" }}
              />
              <Input
                type="search"
                placeholder="Type log id here"
                value={searchedLogId}
                onChange={(e) => setSearchedLogId(e.target.value)}
              />
            </InputGroup>
          </Box>
        </Flex>
        <LogTable
          selectedLogType={selectedLogType}
          selectedProject={selectedProject}
          searchedLogId={searchedLogId}
          logId={logId}
        />
      </Box>
    </>
  );
};

export default Logs;
