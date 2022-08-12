import React, { FC, useCallback, useRef } from 'react';
import { FieldArrayMethodProps } from 'react-hook-form';
import styled from 'styled-components';
import Image from 'next/image';
import xImage from 'assets/images/input/photoinput-del.webp';
import CameraSvg from 'assets/svgs/CameraSvg';
import getPresignedUrl from 'api/common/getPresignedUrl';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100px;
  width: calc(100vw - 40px);
  margin-bottom: 6px;
  overflow-x: scroll;
`;

const ImageAdd = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100px;
  min-width: 100px;
  border-radius: 10px;
  background-color: #f2f2f2;
  margin-right: 10px;

  input {
    display: none;
  }
`;

const ImageAddContainer = styled.div`
  position: relative;
`;

const ImageAddCover = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100px;
  width: 100px;
  min-width: 100px;
  border-radius: 10px;
`;

const ImageBox = styled.div`
  position: relative;
  height: 100px;
  width: 100px;
  min-width: 100px;
  border-radius: 10px;
  padding: 0px 12px;
  margin-right: 10px;
  background-color: #f2f2f2;
  overflow: hidden;
`;

const IconWrapper = styled.div`
  position: absolute;
  right: 8px;
  top: 8px;
`;

const XImageWrapper = styled.div`
  width: 18px;
  height: 18px;
  position: relative;
`;

export interface PhotoInputProps {
  fields: any[];
  append: (value: any, option?: FieldArrayMethodProps) => void;
  remove: (index?: number | number[]) => void;
}

const PhotoInput: FC<PhotoInputProps> = ({ fields, append, remove }) => {
  const labelRef = useRef<HTMLLabelElement>(null);
  const extractURL = useCallback((param: File | string | undefined) => {
    switch (typeof param) {
      case 'string':
        return param;
      case 'object':
        return URL.createObjectURL(param);
      default:
        return '';
    }
  }, []);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { files },
    } = event;
    if (files) {
      for (let i = 0; i < files.length; i += 1) {
        const file = files.item(i);
        if (i + fields.length < 5 && file) {
          getPresignedUrl({ fileType: 'USED_TRADE_POST_IMAGE', filename: file.name }).then(
            (res) => {
              const a = { photo: file, url: res.presignedUrl, id_number: res.fileId };
              append(a);
            },
          );
        }
      }
      if (files.length + fields.length > 5) {
        // sendCustomAlert({
        //   title: PHOTO_INPUT_ERROR_TITLE,
        //   message: PHOTO_INPUT_ERROR_DESCRIPTION,
        //   actions: [{ title: COMMON_CONFIRM, style: 1, value: true }],
        // });
      }
    }
    event.currentTarget.value = '';
  };

  return (
    <Container>
      {fields.length < 5 ? (
        <ImageAddContainer>
          <ImageAdd ref={labelRef}>
            <CameraSvg />
            <input type="file" accept="image/*" multiple onChange={onChange} />
          </ImageAdd>
          <ImageAddCover
            onClick={() => {
              if (labelRef.current) {
                labelRef.current.click();
              }
            }}
          />
        </ImageAddContainer>
      ) : null}
      {fields.map((item, index) => (
        <ImageBox key={`${index.toString()}_image`}>
          <Image
            src={extractURL(item.photo)}
            alt={`image_${index}`}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
          <IconWrapper onClick={() => remove(index)}>
            <XImageWrapper>
              <Image src={xImage} alt="Delete Icon" layout="fill" />
            </XImageWrapper>
          </IconWrapper>
        </ImageBox>
      ))}
    </Container>
  );
};

export default PhotoInput;
