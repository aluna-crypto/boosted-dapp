import React from "react";
import {
  Flex,
  Stack,
  // Button,
  // Tabs,
  // TabList,
  // Tab,
  // TabPanels,
  // TabPanel,
  Text,
  Heading,
} from "@chakra-ui/core";
// import { ProposalRow } from "src/components/ProposalRow";

const Vote: React.FC = () => {
  return (
    <Flex justifyContent="space-between" width="100%">
      <Stack spacing="1.5rem" mr="4" mt="4" flex={1}>
        <Flex justifyContent="space-between">
          <Heading size="md">PROPOSALS</Heading>
          {/* <Button size="sm">Start a proposal</Button> */}
        </Flex>
        <Text>Coming soon...</Text>
        {/* <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>All</Tab>
            <Tab>Active</Tab>
            <Tab>Pending</Tab>
            <Tab>Closed</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {proposals.map((e, i) => (
                <ProposalRow key={i} proposal={e} />
              ))}
            </TabPanel>
            <TabPanel></TabPanel>
            <TabPanel></TabPanel>
            <TabPanel></TabPanel>
          </TabPanels>
        </Tabs>
      </Stack> */}
      </Stack>
    </Flex>
  );
};

export default Vote;
