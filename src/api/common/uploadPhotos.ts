import axios from 'axios';
import { UploadPhotoType } from 'types/api/common';

interface UploadPhotoParams {
  photos: UploadPhotoType[];
}

const uploadPhotos = async ({ photos }: UploadPhotoParams) => {
  const result: number[] = [];

  photos.forEach(async ({ photo, id, url }) => {
    try {
      if (typeof photo !== 'string') {
        const formData = new FormData();
        formData.append('file', photo);
        await axios.put(url, formData);
        result.push(id);
      }
    } catch (e) {
      console.error(e);
    }
  });

  return result;
};

export default uploadPhotos;
