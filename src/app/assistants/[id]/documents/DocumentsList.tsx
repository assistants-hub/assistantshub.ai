import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import * as path from 'path';
import { formatRelativeDate } from '@/app/utils/date';
import { Dropdown } from 'flowbite-react';
import { HiDotsHorizontal, HiDownload, HiOutlineTrash } from 'react-icons/hi';
import { getFile } from '@/app/assistants/[id]/client';
import AssistantContext from '@/app/assistants/[id]/AssistantContext';

export interface DocumentsListProps {
  files: any[];
}

const getImageForFile = (file: any) => {
  let extension = path
    .extname(file.originalFileName)
    .replace('.', '')
    .trim()
    .toLowerCase();
  if (
    ['csv', 'xsl', 'pdf', 'doc', 'docx', 'html', 'ppt', 'text'].includes(
      extension
    )
  ) {
    return `/images/files/${extension}.png`;
  } else {
    return '/images/files/generic.png';
  }
};

export default function DocumentsList(props: DocumentsListProps) {
  const { assistant } = useContext(AssistantContext);
  const [iframeSrc, setIframeSrc] = useState('');

  const handleDownload = (file: any) => {
    getFile(assistant.id, file.id).then((response) => {
      if (response) {
        setIframeSrc(response.downloadUrl);
      }
    });
  }

  return (
    <div className='flex grid flex-col gap-12 sm:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-10'>
      {iframeSrc && <iframe src={iframeSrc} style={{ display: 'none' }} onLoad={() => setIframeSrc('')}></iframe>}
      {props.files &&
        props.files.map((file, index) => {
          return (
            <div className='max-h-xs col-span-2 max-w-xs' key={index}>
              <div className='mt-3 rounded-lg bg-gray-200'>
                <div className='m-2 flex flex-auto items-center justify-end text-gray-500'>
                  <Dropdown
                    label={<HiDotsHorizontal size={25} />}
                    dismissOnClick={true}
                    inline
                    arrowIcon={false}
                  >
                    <Dropdown.Item icon={HiDownload} onClick={() => { handleDownload(file) }}>Download</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item icon={HiOutlineTrash}>Delete</Dropdown.Item>
                  </Dropdown>
                </div>
                <div className='pb-12 pl-12 pr-12 dark:border-gray-800'>
                  <div className='mb-2 items-center justify-center'>
                    <Image
                      alt='File thumbnail'
                      className='aspect-square w-full object-cover transition-opacity group-hover:opacity-50'
                      height={50}
                      src={getImageForFile(file)}
                      width={50}
                    />
                  </div>
                </div>
              </div>
              <div className='flex-1 bg-white py-2'>
                <p className='truncate text-sm font-semibold'>
                  {file.originalFileName}
                </p>
                <small className='text-sm leading-none text-gray-500 dark:text-gray-400'>
                  {formatRelativeDate(file.created_at)}
                </small>
              </div>
            </div>
          );
        })}
    </div>
  );
}
