import React from "react";
import TopBar from "../../components/shared/layouter/Topbar";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import { AiOutlineCalendar } from "react-icons/ai";
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
  const onSubmit: SubmitHandler<projectName> = (data: any) => {
    setValue("projectCode", " ");
    onClose();
    mutate(data);
  };

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

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
          <Button colorScheme="teal" variant="solid" onClick={onOpen}>
            Create Project
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
                  <Button onClick={onClose}>Cancel</Button>
                  <Button colorScheme="blue" type="submit" mr={3}>
                    Create
                  </Button>
                </ModalFooter>
              </form>
            </ModalContent>
          </Modal>
        </Flex>
        <ProjectListTable />
      </Box>
    </>
  );
};

export default ProjectsList;
