import React, { useState } from "react";
import TopBar from "../../components/shared/layouter/Topbar";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import ProjectListTable from "./ProjectListTable";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCreateProjectForm } from "./hooks/projects.hooks";

export type projectName = {
  projectCode: string;
};

const ProjectsList = () => {
  const { register, handleSubmit, setValue } = useForm<projectName>();
  const { mutate }: any = useCreateProjectForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [projectCode, setProjectCode] = useState<string>("");
  const [searchedProjectCode, setSearchedProjectCode] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(0);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const onSubmit: SubmitHandler<projectName> = (data: any) => {
    setValue("projectCode", " ");
    onClose();
    mutate(data);
  };
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  const handleSearchButtonClick = () => {
    setProjectCode(searchedProjectCode);
    handlePageChange(0);
  };

  return (
    <>
      <TopBar />
      <Box maxW="80%" mx="auto" mt="7.75rem">
        <Heading as="h1" color="#746666" fontFamily="heading">
          Project List
        </Heading>
        <Flex
          alignItems="center"
          bg="white"
          justifyContent="space-between"
          mt="4rem"
          mb="1.25rem"
        >
          <HStack align="center">
            <Box>
              <InputGroup>
                <Button
                  bg="brand.100"
                  variant="solid"
                  color="white"
                  _hover={{ bg: "brand.200" }}
                  onClick={handleSearchButtonClick}
                  mr="2"
                  px="8"
                >
                  Search
                </Button>
                <Input
                  type="search"
                  placeholder="Type project code here"
                  value={searchedProjectCode}
                  onChange={(e) => setSearchedProjectCode(e.target.value)}
                />
              </InputGroup>
            </Box>
          </HStack>
          <Button
            bg="brand.100"
            variant="solid"
            color="white"
            _hover={{ bg: "brand.200" }}
            onClick={onOpen}
          >
            Create Project +
          </Button>
          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Create new Project</ModalHeader>
              <ModalCloseButton />
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody pb={6}>
                  <FormControl>
                    <FormLabel color="rgba(0, 0, 0, 0.36)" fontWeight="bold">
                      Project Code <span style={{ color: "red" }}>*</span>
                    </FormLabel>
                    <Input
                      placeholder="Enter Your project code"
                      {...register("projectCode", {
                        required: "This is required.",
                      })}
                    />
                  </FormControl>
                </ModalBody>
                <ModalFooter>
                  <Button onClick={onClose} mr="3">
                    Cancel
                  </Button>
                  <Button colorScheme="blue" type="submit" mr={3}>
                    Create
                  </Button>
                </ModalFooter>
              </form>
            </ModalContent>
          </Modal>
        </Flex>
        <ProjectListTable
          projectCode={projectCode}
          searchedProjectCode={searchedProjectCode}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      </Box>
    </>
  );
};

export default ProjectsList;
