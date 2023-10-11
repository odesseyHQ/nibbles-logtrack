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
  Flex,
} from "@chakra-ui/react";
import { FaFolder } from "react-icons/fa";
import { BiSortAlt2 } from "react-icons/bi";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useLogsList } from "./hooks/logs.hooks";
import { useNavigate, useParams } from "react-router-dom";
import {
  behind12Hours,
  behind24Hours,
  convertDateToUTC,
} from "../../utils/date-fns";
import { useEffect, useState } from "react";

interface LogTableProps {
  selectedLogType?: string;
  selectedProject?: string;
  searchedLogId?: string;
  logId?: string;
  selectedTime?: string;
  currentPage: number;
  handlePageChange: (newPage: number) => void;
}
interface LogItemInf {
  logId: string;
  logText: string;
  project: {
    projectCode: string;
  };
  logType: string;
  created_at: string;
  meta?: string;
}
export interface FilterInf {
  logType?: { IN: string[] };
  projectId?: { IN: string[] };
  logId?: { IN: string[] };
}
const LogTable: React.FC<LogTableProps> = ({
  selectedLogType,
  selectedProject,
  searchedLogId,
  logId,
  selectedTime,
  currentPage,
  handlePageChange,
}) => {
  const [sortOption, setSortOption] = useState<string | null>("asc");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (option: string) => {
    setSortOption((prevOption) =>
      prevOption === option ? prevOption : option
    );
    setSortDirection((prevDirection) =>
      prevDirection === "asc" ? "desc" : "asc"
    );
  };
  useEffect(() => {
    setSortOption("asc");
    setSortDirection("asc"); // Set your desired default sorting option here
  }, [selectedProject]);

  const { id: projectId } = useParams<{ id: string | undefined }>();
  const navigate = useNavigate();

  const filter: FilterInf = {
    ...(selectedLogType ? { logType: { IN: [selectedLogType] } } : {}),
    ...(projectId && selectedProject != "ALL_PROJECTS"
      ? { projectId: { IN: [projectId] } }
      : {}),
    ...(selectedProject && selectedProject != "ALL_PROJECTS"
      ? { projectId: { IN: [selectedProject] } }
      : {}),
    ...(logId && searchedLogId ? { logId: { IN: [logId] } } : {}),
    ...(selectedTime
      ? selectedTime === "12"
        ? {
            created_at: {
              GT: behind12Hours(new Date()),
              LT: convertDateToUTC(new Date()),
            },
          }
        : selectedTime === "24"
        ? {
            created_at: {
              GT: behind24Hours(new Date()),
              LT: convertDateToUTC(new Date()),
            },
          }
        : {}
      : {}),
  };

  const { data, isLoading } = useLogsList(filter);
  const itemsPerPage = 5;

  const offset = currentPage * itemsPerPage;
  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  const sortedData = [...data].sort((a, b) => {
    const aValue = new Date(a.created_at).getTime();
    const bValue = new Date(b.created_at).getTime();

    return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
  });

  const currentData = sortedData.slice(offset, offset + itemsPerPage);

  return (
    <>
      <TableContainer>
        <Table
          variant="striped"
          colorScheme="gray"
          borderWidth="1px"
          borderColor="gray.300"
        >
          <Thead>
            <Tr>
              <Th>
                <Flex
                  alignItems="center"
                  border="1px solid rgba(160, 174, 192, 1)"
                  w="40%"
                  borderRadius="5"
                >
                  <BiSortAlt2 />
                  <Select
                    size="xs"
                    w="7.75rem"
                    onChange={(e) => handleSort(e.target.value)}
                    fontWeight="bold"
                    color="black"
                    border="none"
                  >
                    <option value="desc">Last Seen</option>
                    <option value="asc">First Seen</option>
                  </Select>
                </Flex>
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
            {currentData.length === 0 ? (
              <Tr>
                <Td colSpan={4} textAlign="center">
                  No items found
                </Td>
              </Tr>
            ) : (
              currentData.map((item: LogItemInf, index: number) => (
                <Tr
                  key={index}
                  onClick={() => {
                    navigate(`/logdetails/${item.logId}`);
                  }}
                >
                  <Td>
                    <Text color="teal" fontWeight="bold">
                      {item.logId}
                    </Text>
                    <Text mt="1" mb="2">
                      {item.logText}
                    </Text>

                    <Button
                      px="2"
                      size="xs"
                      display="flex"
                      gap="2"
                      alignItems="center"
                      border="1px solid rgba(160, 174, 192, 1)"
                      borderRadius="15"
                    >
                      <span>
                        <FaFolder />
                      </span>
                      <span>{item.project.projectCode}</span>
                    </Button>
                  </Td>
                  <Td>
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
                    <Text>
                      {item.meta
                        ? item.meta.split(" ").slice(0, 6).join(" ") +
                          (item.meta.split(" ").length > 6 ? " ..." : "")
                        : "N/A"}
                    </Text>
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

export default LogTable;
