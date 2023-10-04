import { Flex, Text, Avatar, Box, HStack } from "@chakra-ui/react";

const TopBar = () => {
  return (
    <Flex
      px={4}
      py={2}
      alignItems="center"
      bg="white"
      justifyContent="space-between"
      boxShadow="0px 4px 24px rgba(0, 0, 0, 0.06)"
    >
      <HStack align="center">
        <Avatar size="sm" name="Hazard" src="/hazard.png" />
        <Text fontSize="lg" fontWeight="bold">
          Nibbles LogTracker
        </Text>
      </HStack>

      <HStack spacing={6}>
        <Text mr={2}>Github</Text>
        <Box borderLeft="1px solid black" height="2rem" mx={2} />
        <Avatar size="sm" name="Github" src="/avatar.png" />
      </HStack>
    </Flex>
  );
};

export default TopBar;
