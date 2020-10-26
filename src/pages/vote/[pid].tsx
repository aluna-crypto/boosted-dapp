import React, { useState } from "react";
import { useRouter } from "next/router";
import { Text, Stack, Heading, Flex, Button, Progress } from "@chakra-ui/core";
import { useSingleProposal } from "src/hooks/useSingleProposal";
import BN from "bignumber.js";
import {
  getFullDisplayBalance,
  getDisplayBalance,
} from "src/utils/formatBalance";
import { useVoteAgainst } from "src/hooks/useVoteAgainst";
import { useVoteFor } from "src/hooks/useVoteFor";
import { useGovernanceStakedBalance } from "src/hooks/useGovernanceStakedBalance";
// import { useGetTotalGovernanceStaked } from "src/hooks/useGetTotalGovernanceStaked";

const Proposal: React.FC = () => {
  const router = useRouter();
  const { pid } = router.query;
  const proposal = useSingleProposal(pid);
  const { onVoteFor } = useVoteFor(pid);
  const { onVoteAgainst } = useVoteAgainst(pid);
  const [requestedFor, setRequestedFor] = useState<boolean>(false);
  const [requestedAgainst, setRequestedAgainst] = useState<boolean>(false);
  const stakedBalance = useGovernanceStakedBalance();
  // const totalStaked: BN = useGetTotalGovernanceStaked();

  const handleVoteFor = async () => {
    try {
      setRequestedFor(true);
      const txHash = await onVoteFor();
      if (!txHash) {
        throw "Transactions error";
      } else {
        setRequestedFor(false);
      }
    } catch (e) {
      console.log(e);
      setRequestedFor(false);
    }
  };

  const handleVoteAgainst = async () => {
    try {
      setRequestedAgainst(true);
      const txHash = await onVoteAgainst();
      if (!txHash) {
        throw "Transactions error";
      } else {
        setRequestedAgainst(false);
      }
    } catch (e) {
      console.log(e);
      setRequestedAgainst(false);
    }
  };

  const parseUrl = (url) => {
    let parsed;
    const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
    url.replace(urlRegex, (link) => {
      parsed = link;
    });
    return parsed;
  };

  if (proposal && pid) {
    const getProposalUrl = parseUrl(proposal.url);
    const totalForVotes = new BN(proposal.totalForVotes);
    const totalAgainstVotes = new BN(proposal.totalAgainstVotes);
    const totalVotes = totalForVotes.plus(totalAgainstVotes);
    const quorum = new BN(proposal.quorum);
    return (
      <Stack colorScheme="white" spacing={4} width="100%" mt={8} pb={200}>
        <Stack boxShadow="md" p={6} borderWidth="1px">
          <Heading>AFIP-{parseInt(pid?.toString()) + 2}</Heading>
          <Text as="a" href={getProposalUrl} target="_blank">
            {proposal.url}
          </Text>
          <Flex flexDirection={["column", "column", "row"]}>
            <Text fontWeight="bold" fontSize="sm">
              Requested Amount:&nbsp;
            </Text>
            <Text>
              {getFullDisplayBalance(new BN(proposal.withdrawAmount))} yCRV
            </Text>
          </Flex>
          <Flex flexDirection={["column", "column", "row"]}>
            <Text fontWeight="bold" fontSize="sm">
              Withdrawal Address:&nbsp;
            </Text>
            <Text>{proposal.withdrawAddress}</Text>
          </Flex>
          {parseInt(pid.toString()) === 0 && (
            <Flex flexDirection={"column"}>
              <Text fontWeight="bold" fontSize="sm">
                Simple Summary:&nbsp;
              </Text>
              <Text>
                The Boosted Finance team is requesting for funding of 60,000
                yCRV to bootstrap an ecosystem fund for the payment of contract
                audits and fast-tracking the development resources required to
                construct BoostVaults (bVaults), optimize the existing booster
                mechanism, or other governance proposals to be passed by the
                community.
              </Text>
            </Flex>
          )}
        </Stack>
        <Stack boxShadow="md" p={6} borderWidth="1px">
          <Text pt={4}>
            You must stake ALN to vote, voting will lock your staked ALN for 72 hours after your latest vote.
          </Text>
          <Flex w="100%" py={4}>
            <Stack w="50%" spacing={2}>
              <Button
                isLoading={requestedFor}
                onClick={() => handleVoteFor()}
                colorScheme="green"
                mr={4}
                isDisabled={requestedFor || stakedBalance.toNumber() === 0}
              >
                Vote For
              </Button>
            </Stack>
            <Stack w="50%" spacing={2}>
              <Button
                isLoading={requestedAgainst}
                onClick={() => handleVoteAgainst()}
                colorScheme="red"
                isDisabled={requestedAgainst || stakedBalance.toNumber() === 0}
                ml={4}
              >
                Vote Against
              </Button>
            </Stack>
          </Flex>
        </Stack>

        <Stack
          w="100%"
          direction="column"
          spacing={4}
          boxShadow="md"
          p={6}
          borderWidth="1px"
        >
          <Text fontWeight="bold" fontSize="lg">
            Voting Stats
          </Text>
          <Flex justifyContent="space-between">
            <Flex flexDirection={["column", "column", "row"]}>
              <Text mr={4} fontWeight="bold">
                For
              </Text>
              <Text sub={true}>{getDisplayBalance(totalForVotes)} ALN</Text>
            </Flex>
            <Text>
              {(totalForVotes.div(totalVotes).toNumber() * 100).toFixed(2)}%
            </Text>
          </Flex>
          <Progress
            hasStripe
            value={totalForVotes.div(totalVotes).toNumber() * 100}
            colorScheme="green"
          />
          <Flex justifyContent="space-between">
            <Flex flexDirection={["column", "column", "row"]}>
              <Text mr={4} fontWeight="bold">
                Against
              </Text>
              <Text sub={true}>
                {getDisplayBalance(totalAgainstVotes)} ALN
              </Text>
            </Flex>
            <Text>
              {(totalAgainstVotes.div(totalVotes).toNumber() * 100).toFixed(2)}%
            </Text>
          </Flex>
          <Progress
            hasStripe
            value={totalAgainstVotes.div(totalVotes).toNumber() * 100}
            colorScheme="red"
          />
          <Flex justifyContent="space-between">
            <Flex flexDirection={["column", "column", "row"]}>
              <Text mr={4} fontWeight="bold">
                Quorum (minimum 30%)
              </Text>
              <Text sub={true}>
                {quorum.div(100).toNumber().toFixed(2)}% Total Staked
              </Text>
            </Flex>
            <Text>
              {quorum.div(100).toNumber().toFixed(2)}%
            </Text>
          </Flex>
          <Progress
            hasStripe
            value={quorum.div(100).toNumber()}
            colorScheme="yellow"
          />
        </Stack>
      </Stack>
    );
  } else {
    return <></>;
  }
};

export default Proposal;
