import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useRef } from "react";

const App = () => {
  const nameRef = useRef();
  const dateTimeRef = useRef();
  const descRef = useRef();
  const priceRef = useRef();

  const addNewTranscation = (e) => {
    e.preventDefault();
    const data = {
      name: nameRef?.current?.value,
      price: priceRef?.current?.value,
      dateTime: dateTimeRef?.current?.value,
      description: descRef?.current?.value,
    };
    const headers = { headers: { "Content-Type": "application/json" } };
    axios.post("http://localhost:4000/api/transaction", data, headers);
  };

  const priceColor = priceRef.current?.value >= 0 ? "green" : "red";

  return (
    <Box maxWidth={"600px"} m={"10px auto"}>
      <Heading textAlign={"center"} mb={5}>
        $Total <span>.00</span>
      </Heading>
      <form onSubmit={addNewTranscation}>
        <Flex direction={"column"} gap={2}>
          <Flex gap={2}>
            <FormControl isRequired>
              <Input placeholder="New Samsung TV" type="text" ref={nameRef} />
            </FormControl>
            <FormControl isRequired>
              <Input placeholder="+200" type="number" ref={priceRef} />
            </FormControl>
            <FormControl isRequired>
              <Input type="datetime-local" ref={dateTimeRef} />
            </FormControl>
          </Flex>
          <FormControl isRequired>
            <Input placeholder="Description" type="text" ref={descRef} />
          </FormControl>
          <Button width={"100%"} type="submit">
            Add New Transaction
          </Button>
        </Flex>
      </form>

      <Box mt={5}>
        <Flex className="transaction" gap={2} justifyContent={"space-between"}>
          <Flex direction={"column"}>
            <Box>New Samsung TV</Box>
            <Box fontSize={"sm"} color={"gray.500"}>
              Brand New Super Display HD
            </Box>
          </Flex>
          <Flex direction={"column"} textAlign={"right"}>
            <Box color={priceColor}>$700</Box>
            <Box fontSize={"sm"} color={"gray.500"}>
              2023-08-14T18:38
            </Box>
          </Flex>
        </Flex>
        <Flex className="transaction" gap={2} justifyContent={"space-between"}>
          <Flex direction={"column"}>
            <Box>Apple Watch</Box>
            <Box fontSize={"sm"} color={"gray.500"}>
              Most Expensive Watch
            </Box>
          </Flex>
          <Flex direction={"column"} textAlign={"right"}>
            <Box color={priceColor}>$299</Box>
            <Box fontSize={"sm"} color={"gray.500"}>
              2021-02-13T18:32
            </Box>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default App;
