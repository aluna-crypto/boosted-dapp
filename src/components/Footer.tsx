import React from "react";
import { Flex, Box } from "@chakra-ui/core";
import {
  AiFillTwitterCircle,
  AiFillGithub,
  AiFillMediumCircle,
} from "react-icons/ai";

export const Footer = (props) => (
  <Flex as="footer" py="8rem" {...props}>
    <a
      href="https://twitter.com/BoostedFinance"
      target="_blank"
      rel="noreferrer"
    >
      <Box as={AiFillTwitterCircle} boxSize="32px" mx="4px" />
    </a>
    <a
      href="https://github.com/Boosted-Finance"
      target="_blank"
      rel="noreferrer"
    >
      <Box as={AiFillGithub} boxSize="32px" mx="4px" />
    </a>
    <a
      href="https://medium.com/@BoostedFinance/"
      target="_blank"
      rel="noreferrer"
    >
      <Box as={AiFillMediumCircle} boxSize="32px" mx="4px" />
    </a>
  </Flex>
);
