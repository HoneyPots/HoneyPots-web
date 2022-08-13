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
import { FC, MouseEventHandler, useRef } from 'react';

export interface AlertProps {
  isOpen: boolean;
  onClose: VoidFunction;
  header: string;
  body: string;
  onButtonClick?: MouseEventHandler<HTMLButtonElement>;
}

const Alert: FC<AlertProps> = ({ isOpen, onClose, body, header, onButtonClick }) => {
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
          <Button bgColor="#EBA937" color="#fff" ml={3} onClick={onButtonClick}>
            확인
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Alert;
