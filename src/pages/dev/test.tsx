import { NextPage } from 'next';
import { Button } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useFieldArray, useForm } from 'react-hook-form';
import Header from 'components/header';
import PhotoInput from 'components/input/PhotoInput';
import Layout from 'components/layout/Layout';
import { UploadPhotoType } from 'types/api/common';
import postTradePost from 'api/trade/postTradePost';
import uploadPhotos from 'api/common/uploadPhotos';
import Loading from 'components/loading/Loading';

interface FormType {
  photos: UploadPhotoType[];
}

const DevTest: NextPage = () => {
  const { control } = useForm<FormType>();

  /*
   * 방법: 사용자가 이미지를 선택한다
   * 2. getPreUrl api를 호출해서  presignedUrl을 불러온다
   * 3. axios.post('getPreUrl',{file:Image})
   * 4. 중고거래 api {title, dfdsf , photoName? }
   */

  // const { append, remove, fields } = useFieldArray({ control, name: 'photos' });

  //   onchange (e => e.current.value.forEach((item)=>))

  // const { mutate: post } = useMutation(postTradePost);

  return (
    <Layout>
      <Header>
        <Header.Center title="테스트" />
      </Header>
      <Loading />
      {/* <PhotoInput append={append} remove={remove} fields={fields} />
      <Button
        marginTop={10}
        bgColor="cyan.400"
        display="block"
        onClick={() => {
          uploadPhotos({ photos: fields }).then((ids) => {
            post({
              attachFiles: ids.map((id) => ({
                fileId: id,
                willBeUploaded: true,
              })),
              chatRoomLink: '',
              content: '사진 업로드 테스트',
              goodsPrice: 1000,
              title: 'test',
            });
          });
        }}
      >
        getPresignedUrl
      </Button> */}
    </Layout>
  );
};

export default DevTest;
