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
  buttonText?: string;
  buttonColor?: string;
}

const Alert: FC<AlertProps> = ({
  isOpen,
  onClose,
  body,
  header,
  onButtonClick,
  buttonColor = '#EBA937',
  buttonText = '확인',
}) => {
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
          <Button bgColor={buttonColor} color="#fff" ml={3} onClick={onButtonClick}>
            {buttonText}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Alert;
