import { Box, Flex } from "@chakra-ui/react";
import React from "react";

const Transaction = ({ id, name, price, description, dateTime }) => {
  const priceColor = price >= 0 ? "green" : "red";
  const priceDis = price >= 0 ? "+$" + Math.abs(price) : "-$" + Math.abs(price);
  return (
    <Flex
      className="transaction"
      gap={2}
      justifyContent={"space-between"}
      key={id}
    >
      <Flex direction={"column"}>
        <Box>{name}</Box>
        <Box fontSize={"sm"} color={"gray.500"}>
          {description}
        </Box>
      </Flex>
      <Flex direction={"column"} textAlign={"right"}>
        <Box color={priceColor}>{priceDis}</Box>
        <Box fontSize={"sm"} color={"gray.500"}>
          {dateTime}
        </Box>
      </Flex>
    </Flex>
  );
};

export default Transaction;
