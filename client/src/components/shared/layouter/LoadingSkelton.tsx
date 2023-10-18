import {
  Box,
  Skeleton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";

const LoadingSkelton = () => {
  const numRows = 5;

  return (
    <div>
      <Box py={4} px={8} borderBottom="1px solid" borderColor="gray.200">
        <Skeleton height="30px" width="400px" />
      </Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>
              <Skeleton height="20px" width="80px" />
            </Th>
            <Th>
              <Skeleton height="20px" width="120px" />
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {Array.from({ length: numRows }).map((_, index) => (
            <Tr key={index}>
              <Td>
                <Skeleton height="20px" width="80px" />
              </Td>
              <Td>
                <Skeleton height="20px" width="120px" />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default LoadingSkelton;
