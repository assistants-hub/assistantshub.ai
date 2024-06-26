import React, { useContext, useRef, useState } from 'react';
import ReactCrop, { Crop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import { Avatar, Button, FileInput, Label, Modal } from 'flowbite-react';

import { type PutBlobResult } from '@vercel/blob';
import { upload } from '@vercel/blob/client';
import { toast } from 'react-hot-toast';
import { getImageHash } from '@/app/utils/hash';
import AssistantContext from '@/app/assistants/[id]/AssistantContext';

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 100,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

const AvatarCropUpload = () => {
  const { assistant, setAssistant } = useContext(AssistantContext);

  const [src, setSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 50,
    height: 50,
    x: 25,
    y: 25,
  } as any);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [rotate, setRotate] = useState(0);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [uploading, setUploading] = useState(false);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        setSrc(reader.result?.toString() || '')
      );
      reader.readAsDataURL(e.target.files[0]);

      setOpenModal(true);
    }
  };

  const onImageLoaded = (e: React.SyntheticEvent<HTMLImageElement>) => {
    // You can perform some operations with the loaded image if necessary
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, 1));
  };

  const onCropChange = (crop: Crop, percentageCrop: Crop) => {
    setCrop(percentageCrop);
  };

  const onCropComplete = (crop: Crop, percentageCrop: Crop) => {
    setCrop(percentageCrop);
  };

  const getCroppedImg = async (): Promise<Blob> => {
    if (!src) throw new Error('Image source is null');
    const image = new Image();
    image.src = src;
    const canvas = document.createElement('canvas');

    // percentage
    crop.x = (crop.x! * image.width) / 100;
    crop.y = (crop.y! * image.height) / 100;
    crop.width = (crop.width! * image.width) / 100;
    crop.height = (crop.height! * image.height) / 100;

    canvas.width = crop.width || 0;
    canvas.height = crop.height || 0;

    const ctx = canvas.getContext('2d');

    if (!ctx) throw new Error('Could not get canvas context');
    if (!crop.width || !crop.height)
      throw new Error('Crop dimensions are not set');

    ctx.drawImage(
      image,
      crop.x,
      crop.y,
      crop.width,
      crop.height,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Canvas is empty'));
          return;
        }
        // @ts-ignore
        blob.name = assistant.id + '.jpeg';
        if (croppedImageUrl)
          // @ts-ignore
          window.URL.revokeObjectURL(croppedImageUrl);
        // @ts-ignore
        setCroppedImageUrl(window.URL.createObjectURL(blob));
        resolve(blob);
      }, 'image/jpeg');
    });
  };

  const uploadCroppedImage = async () => {
    setUploading(true);
    const croppedImage = await getCroppedImg();
    const newBlob = await upload(assistant.id + '.jpeg', croppedImage, {
      access: 'public',
      handleUploadUrl: `/api/assistants/${assistant.id}/avatar`,
    });

    setBlob(newBlob);
    setAssistant({ ...assistant, avatar: newBlob.url });
    setUploading(false);
  };

  return (
    <div className='flex'>
      <div id='fileUpload' className='grid max-w-2xl grid-cols-3'>
        <div className={'col-span-2'}>
          <div className='mb-2 block'>
            <Label htmlFor='file' value='Assistant Avatar' />
          </div>
          <FileInput
            id='file'
            accept='image/*'
            onChange={onSelectFile}
            helperText='This is the avatar image that appears in conversations and external users. Use 512x512 pixel images for best fit and quality. '
          />
        </div>
        {assistant.avatar && (
          <div className={'col-span-1 flex justify-center'}>
            <Avatar
              img={
                assistant.avatar
                  ? assistant.avatar
                  : '/images/people/avatar/' +
                    getImageHash(assistant.id) +
                    '.jpg'
              }
              alt='avatar'
              size='lg'
              status='online'
              statusPosition='top-right'
              color='success'
              rounded
            />
          </div>
        )}
      </div>
      <Modal show={openModal} size='md' onClose={() => setOpenModal(false)}>
        <Modal.Header>Resize & Crop</Modal.Header>
        <Modal.Body>
          {src && (
            <ReactCrop
              // @ts-ignore
              src={src}
              crop={crop}
              minWidth={512}
              minHeight={512}
              maxWidth={512}
              maxHeight={512}
              ruleOfThirds
              onComplete={onCropComplete}
              onChange={onCropChange}
            >
              <img
                ref={imgRef}
                alt='Crop me'
                src={src}
                style={{ transform: `rotate(${rotate}deg)` }}
                onLoad={onImageLoaded}
              />
            </ReactCrop>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            isProcessing={uploading}
            onClick={async () => {
              await uploadCroppedImage();
              toast.success('Avatar image uploaded successfully.', {
                duration: 2000,
              });
              setOpenModal(false);
            }}
          >
            Upload
          </Button>
          <Button color='gray' onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AvatarCropUpload;
