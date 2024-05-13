import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import * as path from 'path';
import { formatRelativeDate } from '@/app/utils/date';
import { Button, Dropdown, Modal } from 'flowbite-react';
import {
  HiDotsHorizontal,
  HiDownload,
  HiOutlineExclamationCircle,
  HiOutlineTrash,
} from 'react-icons/hi';
import { deleteFile, getFile, uploadFile } from '@/app/assistants/[id]/client';
import AssistantContext from '@/app/assistants/[id]/AssistantContext';
import { toast } from 'react-hot-toast';
import DocumentStatus from '@/app/assistants/[id]/documents/DocumentStatus';

export interface DocumentsListProps {
  files: any[];
  refresh: () => void;
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
  const [files, setFiles] = useState<any[] | null>(props.files);
  const { assistant } = useContext(AssistantContext);
  const [iframeSrc, setIframeSrc] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [deletingFile, setDeletingFile] = useState(false);

  useEffect(() => {
    setFiles(props.files);
  }, [props.files]);

  const handleDeleteFile = async () => {
    if (!assistant.id) {
      throw new Error('Assistant ID is missing');
    }
    setDeletingFile(true);
    const response: Response = await deleteFile(assistant.id, selectedFile.id);
    if (response.ok) {
      if (files) {
        setFiles(files.filter((file) => file.id !== selectedFile.id));
        props.refresh();
      }

      toast.success(
        'Document ' + selectedFile.originalFileName + ' deleted successfully.',
        {
          duration: 4000,
        }
      );
    } else {
      console.error('Delete Error:', response);
      toast.error(
        'Document ' +
          selectedFile.originalFileName +
          ' deletion failed.' +
          response,
        {
          duration: 4000,
        }
      );
    }

    setDeletingFile(false);
    setOpenModal(false);
  };

  const handleDownload = (file: any) => {
    getFile(assistant.id, file.id).then((response) => {
      if (response) {
        setIframeSrc(response.downloadUrl);
      }
    });
  };

  return (
    <div className='flex grid flex-col gap-12 sm:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-10'>
      {iframeSrc && (
        <iframe
          src={iframeSrc}
          style={{ display: 'none' }}
          onLoad={() => setIframeSrc('')}
        ></iframe>
      )}
      {files &&
        files.map((file, index) => {
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
                    <Dropdown.Item
                      icon={HiDownload}
                      onClick={() => {
                        handleDownload(file);
                      }}
                    >
                      Download
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                      icon={HiOutlineTrash}
                      onClick={() => {
                        setSelectedFile(file);
                        setOpenModal(true);
                      }}
                    >
                      Delete
                    </Dropdown.Item>
                  </Dropdown>
                </div>
                <div className='pb-5 pl-12 pr-12 dark:border-gray-800'>
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
                <DocumentStatus file={file} />
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
      <Modal
        show={openModal}
        size='xl'
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200' />
            <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this document{' '}
              <a className='font-bold'>
                {selectedFile ? selectedFile.originalFileName : ''}
              </a>
              ?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button
                color='failure'
                isProcessing={deletingFile}
                onClick={handleDeleteFile}
              >
                {"Yes, I'm sure"}
              </Button>
              <Button
                color='gray'
                disabled={deletingFile}
                onClick={() => setOpenModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
