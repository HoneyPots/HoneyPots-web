import axios from 'axios';
import { UploadPhotoType } from 'types/api/common';

interface UploadPhotoParams {
  photos: UploadPhotoType[];
}

const uploadPhotos = async ({ photos }: UploadPhotoParams) => {
  const result: number[] = [];

  photos.forEach(async ({ photo, id, url }) => {
    try {
      const formData = new FormData();
      formData.append('file', photo.photo);
      await axios.post(url, formData);
      result.push(id);
    } catch (e) {
      console.error(e);
    }
  });

  return result;
};

export default uploadPhotos;
