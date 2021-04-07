import React from "react";
import {
  Box,
  Flex,
  Tabs,
  Text,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
} from "@chakra-ui/core";
import { OpenPoolTable } from "./OpenPoolTable";
import { ClosedPoolTable } from "./ClosedPoolTable";
import { Stats } from "./Stats";
import { isMobile } from "react-device-detect";

export const Home: React.FC = () => {
  return (
    <Flex
      justifyContent="space-between"
      width="100%"
      minH="600px"
      flexDirection={["column", "column", "row"]}
    >
      <Box flex={1}>
        {isMobile && (
          <Text my={4} fontSize="xs">
            Scroll for more ➡️
          </Text>
        )}
        <Stats />
      </Box>
      <Box flex={4}>
        <Tabs>
          <TabList>
            <Tab _selected={{ color: "yellow.500", borderColor: "yellow.500"}} >Open</Tab>
            <Tab _selected={{ color: "yellow.500", borderColor: "yellow.500"}} >Closed</Tab>
          </TabList>
          <TabPanels>
            <TabPanel p={0}>
              <OpenPoolTable />
            </TabPanel>
            <TabPanel p={0}>
              <ClosedPoolTable />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
};
