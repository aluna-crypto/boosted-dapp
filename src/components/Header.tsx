import React from "react";
import { Flex, Heading, Box, Link } from "@chakra-ui/core";
import { DarkModeSwitch } from "./DarkModeSwitch";
import NextLink from "next/link";

export const Header = () => (
  <Flex
    my="16px"
    position="relative"
    justifyContent="space-between"
    alignItems="center"
    width="100%"
  >
    <Box flex="1">
      <Heading fontSize="lg">🚀 B00STED FINANCE</Heading>
    </Box>
    <Flex flex="2" justifyContent="center">
      <NextLink href="/">
        <Link fontSize="lg" m="4" fontWeight="600">
          HOME
        </Link>
      </NextLink>
      <NextLink href="/vote">
        <Link fontSize="lg" m="4" fontWeight="600">
          VOTE
        </Link>
      </NextLink>
    </Flex>
    <Flex flex="1" display="flex" justifyContent="flex-end">
      <DarkModeSwitch />
    </Flex>
  </Flex>
);
