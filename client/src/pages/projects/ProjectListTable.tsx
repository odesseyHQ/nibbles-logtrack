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

const ProjectListTable = () => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const offset = currentPage * itemsPerPage;

  const data = [
    {
      field1: 1,
      field2: "AMAZON",
      field3: "10:30:00 AM, 9/28/2022 IST",
    },
    {
      field1: 2,
      field2: "AMAZON",
      field3: "10:30:00 AM, 9/28/2022 IST",
    },
    {
      field1: 3,
      field2: "FLIPKART",
      field3: "10:30:00 AM, 9/28/2022 IST",
    },
    {
      field1: 4,
      field2: "AMAZON",
      field3: "10:30:00 AM, 9/28/2022 IST",
    },
    {
      field1: 5,
      field2: "MYNTRA",
      field3: "10:30:00 AM, 9/28/2022 IST",
    },
  ];
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
            {currentData.map((item, index) => (
              <Tr key={index}>
                <Td>
                  <Text fontWeight={"bold"}>{item.field1}</Text>
                </Td>
                <Td>
                  {" "}
                  <Text fontWeight={"bold"}>{item.field2}</Text>
                </Td>

                <Td fontWeight="bold">{item.field3}</Td>
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
