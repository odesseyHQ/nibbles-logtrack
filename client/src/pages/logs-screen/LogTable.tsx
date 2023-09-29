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
import { useLogsList } from "./hooks/logs.hooks";
interface LogTableProps {
  selectedLogType: string;
}
interface LogItemInf {
  logId: string;
  logText: string;
  project: {
    projectCode: string;
  };
  logType: string;
  created_at: string;
  metaTimestamp?: string; // @Todo will rename it once added to backend
  metadescription?: string; // @Todo will rename it once added to backend
}

export interface FilterInf {
  logType?: { IN: string[] };
}
const LogTable: React.FC<LogTableProps> = ({ selectedLogType }) => {
  const filter: FilterInf =
    selectedLogType !== ""
      ? {
          logType: { IN: [selectedLogType] },
        }
      : {};
  const { data, isLoading, isError } = useLogsList(filter);

  const itemsPerPage = 2;
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const offset = currentPage * itemsPerPage;

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
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
            {currentData.map((item: LogItemInf, index: number) => (
              <Tr key={index}>
                <Td>
                  <Text color="teal" fontWeight={"bold"}>
                    {item.logId}
                  </Text>
                  <Text mt="1" mb="2">
                    {" "}
                    {item.logText}
                  </Text>

                  <Button
                    px="2"
                    size="xs"
                    display="flex"
                    gap="2"
                    alignItems="center"
                  >
                    <span>
                      {" "}
                      <FaFolder />
                    </span>
                    <span>{item.project.projectCode}</span>
                  </Button>
                </Td>
                <Td>
                  {" "}
                  <Badge
                    variant="solid"
                    colorScheme={
                      item.logType === "ERROR"
                        ? "red"
                        : item.logType === "WARNING"
                        ? "yellow"
                        : item.logType === "INFO"
                        ? "blue"
                        : "gray"
                    }
                  >
                    {item.logType}
                  </Badge>
                </Td>

                <Td fontWeight="bold">{item.created_at}</Td>
                <Td>
                  <Text mb="2" fontWeight="bold">
                    {item.metaTimestamp ? item.metaTimestamp : "N/A"}
                    {/* @Todo currently static once added to Api will be made dynamic */}
                  </Text>
                  <Text>
                    {item.metadescription ? item.metadescription : "N/A"}
                    {/* @Todo currently static once added to Api will be made dynamic */}
                  </Text>
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
