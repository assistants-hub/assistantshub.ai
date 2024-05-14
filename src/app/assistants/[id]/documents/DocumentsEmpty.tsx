import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { HiCloudUpload } from 'react-icons/hi';

interface DocumentsEmptyProps {
  onFiles: (file: any) => void;
}

const DocumentsEmpty: React.FC<DocumentsEmptyProps> = ({ onFiles }) => {
  const [isDragActive, setIsDragActive] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setIsDragActive(false);
      onFiles(acceptedFiles[0]);
    },
    [onFiles]
  );

  // @ts-ignore
  const { getRootProps, getInputProps, isDragReject } = useDropzone({
    onDrop,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
  });

  return (
    <div
      {...getRootProps()}
      className={`flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors
        ${
          isDragActive
            ? 'border-blue-500 bg-blue-100'
            : 'border-gray-300 bg-white hover:bg-gray-100'
        }
        ${isDragReject ? 'border-red-500' : ''}`}
    >
      <input {...getInputProps()} />
      <HiCloudUpload className='text-9xl text-gray-400 dark:text-gray-700' />
      <p className='text-gray-500'>
        {isDragReject
          ? 'Unsupported file type!'
          : 'Drag & drop files here, or click to select files'}
      </p>
    </div>
  );
};

export default DocumentsEmpty;
