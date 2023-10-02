import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Flex,
} from "@chakra-ui/react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import React, { useEffect, useState } from "react";
import { useEditProjectForm, useProjectList } from "./hooks/projects.hooks";
import { useForm, SubmitHandler } from "react-hook-form";
import { projectName } from "./ProjectsList";
interface ProjectInf {
  projectId: number;
  projectCode: string;
  created_at: string;
}

const ProjectListTable = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const [selectedProject, setSelectedProject] = useState<ProjectInf | null>(
    null
  );
  const { mutate, isLoading: isEditInProgress }: any = useEditProjectForm(
    selectedProject?.projectId
  );
  const handleEditClick = (project: ProjectInf) => {
    setSelectedProject(() => project);

    onOpen();
  };
  useEffect(() => {
    if (selectedProject) {
      setValue("projectCode", selectedProject.projectCode || "");
    }
  }, [selectedProject, setValue]);
  const onSubmit: SubmitHandler<projectName> = (data: projectName) => {
    setValue("projectCode", " ");
    onClose();
    mutate(data);
  };
  const { data, isLoading, isError } = useProjectList();
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const offset = currentPage * itemsPerPage;

  const currentData = data.slice(offset, offset + itemsPerPage);

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Project</ModalHeader>
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
                Submit
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
      <TableContainer>
        <Table
          variant="striped"
          colorScheme="
          gray"
          borderWidth="1px"
          borderColor="gray.300"
        >
          <Thead>
            <Tr>
              <Th fontWeight="bold" color="black">
                Id
              </Th>
              <Th fontWeight="bold" color="black" width="50%">
                Code
              </Th>
              <Th fontWeight="bold" color="black">
                Time
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentData.map((item: ProjectInf, index: number) => (
              <Tr key={index}>
                <Td>
                  <Text fontWeight={"bold"}>{item.projectId}</Text>
                </Td>
                <Td>
                  {" "}
                  <Flex gap="4">
                    <Text fontWeight={"bold"}>{item.projectCode}</Text>

                    <span
                      onClick={() => handleEditClick(item)}
                      style={{ cursor: "pointer", color: "teal" }}
                    >
                      {" "}
                      <BiEdit />
                    </span>
                  </Flex>
                </Td>

                <Td fontWeight="bold">{item.created_at}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginTop: "1.75rem",
        }}
      >
        {`${offset + 1}-${Math.min(offset + itemsPerPage, data.length)} of ${
          data.length
        }`}
        <Button
          leftIcon={<AiOutlineLeft />}
          isDisabled={currentPage === 0}
          onClick={() => handlePageChange(currentPage - 1)}
        ></Button>
        <Button
          rightIcon={<AiOutlineRight />}
          isDisabled={offset + itemsPerPage >= data.length}
          onClick={() => handlePageChange(currentPage + 1)}
        ></Button>
      </div>
    </>
  );
};

export default ProjectListTable;
