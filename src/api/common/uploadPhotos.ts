import axios from 'axios';
import { UploadPhotoType } from 'types/api/common';

interface UploadPhotoParams {
  photos: UploadPhotoType[];
}

const uploadPhotos = async ({ photos }: UploadPhotoParams) => {
  const result: number[] = [];

  const promises = photos.map(async ({ photo, id, url }) => {
    try {
      if (typeof photo !== 'string') {
        const formData = new FormData();
        formData.append('Content-type', photo.type);
        formData.append('file', photo);
        await axios.put(url, formData, {
          headers: {
            'Content-type': photo.type,
          },
        });
        result.push(id);
      }
    } catch (e) {
      console.error(e);
    }
  });

  await Promise.all(promises);

  return result;
};

export default uploadPhotos;
