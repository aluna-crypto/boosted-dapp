import React from "react";
import { Flex, Heading, Link, Spinner } from "@chakra-ui/core";
import NextLink from "next/link";
import { useRouter } from "next/router";

export const Header = ({ changingRoute }) => {
  const router = useRouter();
  return (
    <Flex
      my="16px"
      position="relative"
      justifyContent="space-between"
      alignItems="baseline"
      width="100%"
      bgImage={
        router.pathname == "/about"
          ? "url('/images/farmplants.jpg')"
          : "url('/images/farm.jpg')"
      }
      bgPos="top"
      bgRepeat="no-repeat"
      bgSize={["40vh", "40%", "50%"]}
      height={["15vh", "15vh", "40vh"]}
    >
      <Flex flex={[2, 1, 1]} alignItems="center">
        <Heading
          fontSize={"lg"}
          fontWeight="normal"
          bgImage="url('/images/AlunaSymbol.svg')"
          bgPos="left"
          bgSize="20px auto"
          bgRepeat="no-repeat"
          pl="30px"
        >
          ALUNA <span style={{ color: "#7547dc" }}>&#10005;</span> FARM
        </Heading>
        {changingRoute && <Spinner ml={4} color="grey.500" size="sm" />}
      </Flex>
      <Flex flex="2" justifyContent="center">
        <NextLink href="/">
          <Link fontSize={["sm", "lg"]} m="4" fontWeight="300">
            HOME
          </Link>
        </NextLink>
        <Link
          fontSize={["sm", "lg"]}
          m="4"
          fontWeight="300"
          href="https://medium.com/@aluna/aln-tokenomics-fair-distribution-community-owned-self-governed-6b309fa24f49"
          target="_blank"
        >
          ABOUT
        </Link>
        {/* <NextLink href="/vote">
        <Link fontSize={["sm", "lg"]} m="4" fontWeight="300">
          VOTE
        </Link>
      </NextLink> */}
      </Flex>
      <Flex flex="1" display="flex" justifyContent="flex-end"></Flex>
    </Flex>
  );
};
