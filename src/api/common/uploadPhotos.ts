import axios from 'axios';
import { UploadPhotoType } from 'types/api/common';

interface UploadPhotoParams {
  photos: UploadPhotoType[];
}

const uploadPhotos = async ({ photos }: UploadPhotoParams) => {
  const promises: Promise<number>[] = photos.map(
    ({ photo, id_number, url }) =>
      new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(photo as File);
        fileReader.addEventListener('load', async () => {
          const blob = await fetch(fileReader.result as string).then((res) => res.blob());

          // console.log(blob);
          try {
            if (typeof photo !== 'string') {
              // const formData = new FormData();
              // formData.append('Content-Type', blob.type);
              // formData.append('file', blob);
              await axios.put(url, blob, { headers: { 'Content-Type': blob.type } });
              resolve(id_number);
            }
          } catch (e) {
            reject(e);
          }
        });
      }),
  );

  const result: number[] = await Promise.all(promises);

  return result;
};

export default uploadPhotos;
