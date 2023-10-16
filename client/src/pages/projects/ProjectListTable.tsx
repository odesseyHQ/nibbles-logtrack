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
import { useNavigate } from "react-router-dom";
import convertUTCtoIST from "../../utils/date-fns";
import LoadingSkelton from "../../components/shared/layouter/LoadingSkelton";
interface ProjectInf {
  projectId: number | undefined;
  projectCode: string;
  created_at: string;
}
interface ProjectListTableProps {
  projectCode: string;
  searchedProjectCode: string;
  currentPage: number;
  handlePageChange: (newPage: number) => void;
}
const ProjectListTable: React.FC<ProjectListTableProps> = ({
  projectCode,
  searchedProjectCode,
  currentPage,
  handlePageChange,
}) => {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm<ProjectInf>();

  const [selectedProject, setSelectedProject] = useState<ProjectInf | null>(
    null
  );
  const { mutate }: any = useEditProjectForm(
    selectedProject?.projectId?.toString() || null
  );
  const filter =
    projectCode !== "" && searchedProjectCode !== ""
      ? {
          projectCode: {
            IN: [projectCode],
          },
        }
      : {};
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
  const { data, isLoading } = useProjectList(filter);
  const itemsPerPage = 5;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  if (isLoading) {
    return <LoadingSkelton />;
  }

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
              <Button onClick={onClose} mr="3">
                Cancel
              </Button>
              <Button colorScheme="blue" type="submit" mr={3}>
                Submit
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
      <TableContainer>
        <Table borderWidth="1px" borderColor="gray.300">
          <Thead>
            <Tr backgroundColor="#FFF5F5">
              <Th fontWeight="bold" color="black">
                ID
              </Th>
              <Th fontWeight="bold" color="black" width="50%">
                CODE
              </Th>
              <Th fontWeight="bold" color="black">
                LAST UPDATED AT
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentData.length === 0 ? (
              <Tr>
                <Td colSpan={3} textAlign="center">
                  No Projects Found
                </Td>
              </Tr>
            ) : (
              currentData.map((item: ProjectInf, index: number) => (
                <Tr
                  key={index}
                  style={{
                    backgroundColor: index % 2 === 1 ? "#EBF8FF" : "inherit",
                  }}
                >
                  <Td>
                    <Text color="rgba(0, 0, 0, 0.48)" fontWeight="bold">
                      {item.projectId}
                    </Text>
                  </Td>
                  <Td>
                    <Flex gap="4">
                      <Text
                        color="rgba(0, 0, 0, 0.48)"
                        fontWeight="bold"
                        onClick={() => {
                          navigate(`/projectlogs/${item.projectId}`);
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        {item.projectCode}
                      </Text>

                      <span
                        onClick={() => handleEditClick(item)}
                        style={{
                          cursor: "pointer",
                          backgroundColor: "#C4F1F9",
                          color: "#0000007A",
                        }}
                      >
                        <BiEdit />
                      </span>
                    </Flex>
                  </Td>

                  <Td fontWeight="bold" color="rgba(0, 0, 0, 0.48)">
                    {convertUTCtoIST(item.created_at)}
                  </Td>
                </Tr>
              ))
            )}
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
