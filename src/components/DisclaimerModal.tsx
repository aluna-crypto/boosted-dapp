import {
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Stack,
  ModalFooter,
  Button,
  Text,
} from "@chakra-ui/core";

import React, { useCallback, useState, useMemo } from "react";
import { ModalProps } from "src/context/ModalContext";

interface DisclaimerModal extends ModalProps {
  onConfirm: () => void;
}

export const DisclaimerModal: React.FC<DisclaimerModal> = ({
  onConfirm,
  onDismiss,
}) => {
  const [step, setStep] = useState("disclaimer");

  const handleConfirm = useCallback(() => {
    if (onDismiss) {
      onConfirm();
      onDismiss();
    }
  }, [onConfirm, onDismiss]);

  const modalContent = useMemo(() => {
    if (step === "disclaimer") {
      return (
        <Stack>
          <Text>⚠️ Audits: Zilch ⚠️ </Text>
          <Text>
            There have been no official third-party audits for Boosted Finance
            although core contributors have made extensive efforts to secure
            smart contracts including forking the codebases of notable and
            established projects.
          </Text>

          <Text>
            We urge all users who engage with staking contracts to self-audit
            and read through contracts before putting your tokens at stake. You
            will be using this BETA product at your own risk.
          </Text>
        </Stack>
      );
    } else {
      return (
        <Stack>
          <Text fontWeight="bold">Genesis Pool Staking Cap</Text>
          <Text>COMP: $251.89 = 79.3997379808647</Text>
          <Text>MKR: $690.02 = 28.9846671110982</Text>
          <Text>LEND: $0.73491 = 27214.2167068076</Text>
          <Text>SNX: $7.49 = 2670.22696929239</Text>
          <Text>REN: $0.56933 = 35129.0112939771</Text>
          <Text>YFI: $33968.42 = 0.58878216884977</Text>
          <Text>LINK:$15.76 = 1269.03553299492</Text>
          <Text>BAND: $13.13 = 1523.22924600152</Text>
          <Text>SUSHI: $6.61 = 3025.7186081694</Text>
          <Text>KNC: $1.81 = 11049.7237569061</Text>
        </Stack>
      );
    }
  }, [step]);

  const button = useMemo(() => {
    if (step === "disclaimer") {
      return <Button onClick={() => setStep("uniswap")}>Next</Button>;
    } else {
      return (
        <Button onClick={handleConfirm}>Houston, all problems are yours</Button>
      );
    }
  }, [setStep, step, handleConfirm]);

  return (
    <ModalContent>
      <ModalHeader fontSize="m">
        This project is currently unaudited.
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Stack>{modalContent}</Stack>
      </ModalBody>
      <ModalFooter>{button}</ModalFooter>
    </ModalContent>
  );
};
