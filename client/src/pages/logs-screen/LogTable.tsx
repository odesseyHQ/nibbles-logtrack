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
import { useLogsList } from "./hooks/logs.hooks";
import { useNavigate, useParams } from "react-router-dom";
import {
  behind12Hours,
  behind24Hours,
  convertDateToUTC,
} from "../../utils/date-fns";
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
