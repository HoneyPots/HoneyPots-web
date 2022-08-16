import { FC, useRef, useState } from 'react';
import styled from 'styled-components';
import { useMutation } from '@tanstack/react-query';
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
import { TextArea, TextInput } from 'components/input';
import postReports from 'api/common/postReports';

export interface ReportAlertProps {
  isOpen: boolean;
  onClose: VoidFunction;
  targetId: string;
  targetType?: 'POST' | 'COMMENT';
}

const Reason = styled(TextArea)`
  height: 200px;
  margin: 10px 20px;
  width: unset;
`;

const ReportAlert: FC<ReportAlertProps> = ({ isOpen, onClose, targetId, targetType = 'POST' }) => {
  const [reason, setReason] = useState<string>('');
  const cancelRef = useRef(null);

  const report = useMutation(postReports, {
    onSettled: () => {
      onClose();
    },
  });

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
        <AlertDialogHeader>신고하기</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>신고하는 이유를 작성해주세요</AlertDialogBody>
        <Reason
          placeholder="신고사유"
          value={reason}
          onChange={(e) => setReason(e.currentTarget.value)}
        />
        <AlertDialogFooter>
          <Button
            bgColor="#EB3737"
            color="#fff"
            ml={3}
            onClick={() => {
              report.mutate({
                reason,
                targetId,
                target: targetType,
              });
            }}
            disabled={reason.length < 5}
          >
            신고하기
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ReportAlert;
