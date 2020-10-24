import React, { useState, useCallback } from "react";
import {
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Stack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Flex,
  Text,
  Button,
} from "@chakra-ui/core";
import { Formik, Field } from "formik";
import { useTokenBalance } from "src/hooks/useTokenBalance";
import { alunaToken, governanceContract } from "src/constants/tokenAddresses";
import { useApprove } from "src/hooks/useApprove";
import { useAllowance } from "src/hooks/useAllowance";
import { useGovernanceStake } from "src/hooks/useGovernanceStake";
import { useGovernanceStakedBalance } from "src/hooks/useGovernanceStakedBalance";
import { getDisplayBalance } from "src/utils/formatBalance";

export const StakeModal: React.FC = () => {
  const boostBalance = useTokenBalance(alunaToken);
  const { onApprove } = useApprove(alunaToken, governanceContract);
  const [requestedApproval, setRequestedApproval] = useState<boolean>(false);
  const { onStake } = useGovernanceStake();
  const stakedBalance = useGovernanceStakedBalance();
  const allowance = useAllowance(alunaToken, governanceContract);

  const validateStakeAmount = (value: string) => {
    let error;
    if (!value) {
      error = `Stake amount is required`;
      return error;
    }
  };

  const handleStake = async (values, actions) => {
    try {
      const tx = await onStake(values.stakeAmount);
      if (!tx) {
        throw "Transaction error";
      } else {
        actions.setSubmitting(false);
      }
    } catch (e) {
      actions.setSubmitting(false);
    }
  };
  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true);
      const txHash = await onApprove();
      if (!txHash) {
        throw "Transactions error";
      } else {
        setRequestedApproval(false);
      }
    } catch (e) {
      console.log(e);
      setRequestedApproval(false);
    }
  }, [onApprove, setRequestedApproval]);
  return (
    <ModalContent>
      <ModalHeader>Stake For Governance</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Stack pb={8} spacing={4}>
          {parseFloat(boostBalance.toString()) === 0 ? (
            <Text textAlign="center" fontWeight="bold">
              Insufficient ALN Balance to stake
            </Text>
          ) : (
            <>
              <Text fontSize="sm">
                You have staked: {getDisplayBalance(stakedBalance)} ALN
              </Text>
              <Formik
                initialValues={{
                  stakeAmount: "",
                }}
                onSubmit={(values, actions) => {
                  actions.setSubmitting(true);
                  handleStake(values, actions);
                }}
              >
                {({ handleSubmit, isSubmitting }) => {
                  return (
                    <form onSubmit={handleSubmit}>
                      <Stack spacing={4}>
                        <Field
                          name={"stakeAmount"}
                          validate={validateStakeAmount}
                        >
                          {({ field, form }) => {
                            return (
                              <FormControl
                                isInvalid={
                                  form.errors["stakeAmount"] &&
                                  form.touched["stakeAmount"]
                                }
                              >
                                <FormLabel htmlFor={"Stake Amount"}>
                                  Stake Amount
                                </FormLabel>
                                <Input
                                  type="number"
                                  {...field}
                                  id={"stakeAmount"}
                                  placeholder={"Stake Amount"}
                                />
                                <FormErrorMessage>
                                  {form.errors["stakeAmount"]}
                                </FormErrorMessage>
                              </FormControl>
                            );
                          }}
                        </Field>
                        <Flex>
                          {!allowance.toNumber() ? (
                            <Button
                              w="100%"
                              colorScheme="green"
                              isLoading={requestedApproval}
                              disabled={requestedApproval}
                              onClick={() => handleApprove()}
                            >
                              Approve BOOST
                            </Button>
                          ) : (
                            <Button
                              colorScheme="green"
                              isLoading={isSubmitting}
                              disabled={isSubmitting}
                              type="submit"
                              w="100%"
                            >
                              Stake
                            </Button>
                          )}
                        </Flex>
                      </Stack>
                    </form>
                  );
                }}
              </Formik>
            </>
          )}
        </Stack>
      </ModalBody>
    </ModalContent>
  );
};
