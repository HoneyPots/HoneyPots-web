import axios from 'libs/axios';
import { PreFile, FileType } from 'types/api/common';

interface GetPresignedUrlParams {
  filename: string;
  fileType: FileType;
}

export default async function getPresignedUrl({ fileType, filename }: GetPresignedUrlParams) {
  const { data } = await axios.get<PreFile>('/api/files/presigned-url', {
    params: {
      filename,
      fileType,
    },
  });

  return data;
}
