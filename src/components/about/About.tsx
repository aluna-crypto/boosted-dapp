import React from "react";
import {
  Flex,
  Text,
  Stack,
} from "@chakra-ui/core";

export const About: React.FC = () => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      width="50vw"
      pb={200}
    >
      <Stack spacing={3}>
        <Text fontSize="2xl" fontFamily="mono">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer rhoncus posuere risus. Sed pretium sem a ipsum consequat, in.
        </Text>
        <Text fontSize="sm" fontFamily="mono">
          Etiam et nibh id est egestas maximus. Donec nec egestas neque. Sed interdum dictum lorem, in hendrerit tellus sodales eu. Etiam dictum eu dui at placerat. Sed vulputate ante id congue viverra. In et tortor tempor diam ornare rhoncus vitae eget dolor. Donec faucibus eleifend tincidunt. Nulla id bibendum lacus.
        </Text>
      </Stack>
    </Flex>
  );
};
