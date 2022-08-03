import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import { FC, useRef } from 'react';

export interface AlertProps {
  isOpen: boolean;
  onClose: VoidFunction;
  header: string;
  body: string;
}

const Alert: FC<AlertProps> = ({ isOpen, onClose, body, header }) => {
  const cancelRef = useRef(null);

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      size="xs"
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>{header}</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>{body}</AlertDialogBody>
        <AlertDialogFooter>
          <Button bgColor="#EBA937" color="#fff" ml={3} onClick={onClose}>
            확인
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Alert;
