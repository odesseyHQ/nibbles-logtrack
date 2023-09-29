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
} from "@chakra-ui/react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useState } from "react";
import { useProjectList } from "./hooks/projects.hooks";

const ProjectListTable = () => {
  const { data, isLoading, isError } = useProjectList();
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(0);

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
            {currentData.map((item: any, index: number) => (
              <Tr key={index}>
                <Td>
                  <Text fontWeight={"bold"}>{item.projectId}</Text>
                </Td>
                <Td>
                  {" "}
                  <Text fontWeight={"bold"}>{item.projectCode}</Text>
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
