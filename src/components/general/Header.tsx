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
      router.pathname == "/about" ?
      "url('/images/farmplants.jpg')" :
      "url('/images/farm.jpg')"
    } 
    bgPos="center" bgRepeat="no-repeat"
    bgSize="100% 100%"
    height="60vh"
  >
    <Flex flex="1" alignItems="center">
      <Heading 
        fontSize={"lg"} 
        fontWeight="normal"
        bgImage="url('/images/AlunaSymbol.svg')"
        bgPos="left"
        bgSize="20px auto"
        bgRepeat="no-repeat"
        pl="30px"
      >  
        ALUNA <span style={{color:"#7547dc"}}>&#10005;</span> BOOST
      </Heading>
      {changingRoute && <Spinner ml={4} color="grey.500" size="sm" />}
    </Flex>
    <Flex flex="2" justifyContent="center">
      <NextLink href="/">
        <Link fontSize={["sm", "lg"]} m="4" fontWeight="300">
          HOME
        </Link>
      </NextLink>
      <NextLink href="/about">
        <Link
          fontSize={["sm", "lg"]}
          m="4"
          fontWeight="300"
        >
          ABOUT 
        </Link>
      </NextLink>
      <NextLink href="/vote">
        <Link fontSize={["sm", "lg"]} m="4" fontWeight="300">
          VOTE
        </Link>
      </NextLink>
    </Flex>
    <Flex flex="1" display="flex" justifyContent="flex-end">
      
    </Flex>
  </Flex>
  );
}