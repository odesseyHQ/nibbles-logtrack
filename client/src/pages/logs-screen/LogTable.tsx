import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Select,
  Text,
  Button,
  Badge,
} from "@chakra-ui/react";
import { FaFolder } from "react-icons/fa";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useState } from "react";

const LogTable = () => {
  const itemsPerPage = 2;
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const offset = currentPage * itemsPerPage;

  const data = [
    {
      field1: {
        tokenNo: 684956894,
        errorMsg: "Uncaught TypeError: Cannot read properties",
        projectName: "Salesboy-FE",
      },
      field2: "Error",
      field3: "10:30:00 AM, 9/28/2022 IST",
      field4: {
        timeStamp: "Timestamp:2022-09-28",
        errorMsg: "Uncaught TypeError: Cannot  ",
      },
    },
    {
      field1: {
        tokenNo: 684956895,
        errorMsg: "Uncaught TypeError: Cannot read properties",
        projectName: "Salesboy-FE",
      },
      field2: "Error",
      field3: "11:30:00 AM, 19/28/2022 IST",
      field4: {
        timeStamp: "Timestamp:2022-09-28",
        errorMsg: "Uncaught TypeError: Cannot  ",
      },
    },
    {
      field1: {
        tokenNo: 684956896,
        errorMsg: "Uncaught TypeError: Cannot read properties",
        projectName: "Salesboy-FE",
      },
      field2: "Error",
      field3: "9:30:00 AM, 29/28/2012 IST",
      field4: {
        timeStamp: "Timestamp:2022-09-28",
        errorMsg: "Uncaught TypeError: Cannot  ",
      },
    },
  ];
  const currentData = data.slice(offset, offset + itemsPerPage);
  return (
    <>
      <TableContainer>
        <Table
          variant="simple"
          colorScheme="gray.300"
          borderWidth="1px"
          borderColor="gray.300"
        >
          <Thead>
            <Tr>
              <Th>
                <Select placeholder="Last seen" size="xs" w="7.75rem">
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
              </Th>
              <Th fontWeight="bold" color="black">
                Log Type
              </Th>
              <Th fontWeight="bold" color="black">
                Time
              </Th>
              <Th fontWeight="bold" color="black">
                Meta
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentData.map((item, index) => (
              <Tr key={index}>
                <Td>
                  <Text color="teal" fontWeight={"bold"}>
                    {item.field1.tokenNo}
                  </Text>
                  <Text mt="1" mb="2">
                    {" "}
                    {item.field1.errorMsg}
                  </Text>

                  <Button px="2" size="xs">
                    <FaFolder />
                    {item.field1.projectName}
                  </Button>
                </Td>
                <Td>
                  {" "}
                  <Badge colorScheme="red">{item.field2}</Badge>
                </Td>

                <Td fontWeight="bold">{item.field3}</Td>
                <Td>
                  <Text mb="2" fontWeight="bold">
                    {item.field4.timeStamp}
                  </Text>
                  <Text>{item.field4.errorMsg}</Text>
                </Td>
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

export default LogTable;
