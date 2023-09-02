import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  Heading,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Transaction from "./Transaction";

const App = () => {
  const nameRef = useRef();
  const dateTimeRef = useRef();
  const descRef = useRef();
  const priceRef = useRef();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getAllTransactions();
  }, []);

  const addNewTranscation = (e) => {
    e.preventDefault();
    const data = {
      name: nameRef?.current?.value,
      price: +priceRef?.current?.value,
      dateTime: dateTimeRef?.current?.value,
      description: descRef?.current?.value,
    };

    const headers = { headers: { "Content-Type": "application/json" } };
    axios
      .post("http://localhost:4000/api/transaction", data, headers)
      .then((res) => {
        getAllTransactions();
        nameRef.current.value = "";
        priceRef.current.value = "";
        dateTimeRef.current.value = "";
        descRef.current.value = "";
      });
  };

  const getAllTransactions = (e) => {
    axios
      .get("http://localhost:4000/api/transactions")
      .then((res) => {
        setTransactions(res.data);
      })
      .catch((err) => console.log(err));
  };

  let balance = 0;
  for (const transaction of transactions) balance += transaction.price;
  balance = balance.toFixed(2);
  const fraction = balance.split(".")[1];
  balance = balance.split(".")[0];

  const balanceColor = balance >= 0 ? "green" : "red";
  const balanceDis =
    balance >= 0 ? "+$" + Math.abs(balance) : "-$" + Math.abs(balance);

  return (
    <Box maxWidth={"600px"} m={"10px auto"}>
      <Heading textAlign={"center"} mb={5} color={balanceColor}>
        {balanceDis}
        <span>.{fraction}</span>
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
        <Divider mb={1} />
        {transactions.length > 0 &&
          transactions.map((t) => (
            <Box mb={2}>
              <Transaction
                id={t._id}
                name={t.name}
                price={t.price}
                description={t.description}
                dateTime={t.dateTime}
              />
              <Divider mt={2} />
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default App;
