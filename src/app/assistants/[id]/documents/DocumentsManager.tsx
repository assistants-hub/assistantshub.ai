import { Button, Spinner } from 'flowbite-react';
import DocumentsEmpty from '@/app/assistants/[id]/documents/DocumentsEmpty';
import { HiCloudUpload } from 'react-icons/hi';
import React, { useContext, useEffect, useState } from 'react';
import AssistantContext from '@/app/assistants/[id]/AssistantContext';
import { toast } from 'react-hot-toast';
import { getFiles, uploadFile } from '@/app/assistants/[id]/client';
import DocumentsList from '@/app/assistants/[id]/documents/DocumentsList';

export default function DocumentsManager() {
  const { assistant } = useContext(AssistantContext);

  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState<any[] | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    getFiles(assistant.id).then((response) => {
      setFiles(response);
    });
  }, []);

  useEffect(() => {
    if (files) {
      setLoading(false);
    }
  }, [files]);

  useEffect(() => {
    if (file) {
      handleSubmit().then(() => {
        // Toast notification
        setUploading(false);
        setFile(null);
      });
    }
  }, [file]);

  const handleSubmit = async () => {
    if (!file) {
      return;
    }

    if (!assistant.id) {
      throw new Error('Assistant ID is missing');
    }

    setUploading(true);

    const response: Response = await uploadFile(assistant.id, file);
    if (response.ok) {
      toast.success('Document ' + file.name + ' uploaded successfully.', {
        duration: 4000,
      });
    } else {
      console.error('Upload Error:', response);
      toast.success('Document ' + file.name + ' uploaded failed.' + response, {
        duration: 4000,
      });
    }

    setUploading(false);
  };

  return (
    <div className='flex flex-col gap-8 p-6 md:p-10'>
      <div className='flex items-center justify-between'>
        <h3 className='text-3xl font-bold'></h3>
        <input
          id='dropzone-file-hidden'
          type='file'
          className='hidden'
          onChange={(e) => {
            const files = e.target.files;
            if (files) {
              setFile(files[0]);
            }
          }}
        />
        <Button
          className='float-right'
          gradientDuoTone='purpleToBlue'
          onClick={() =>
            document.getElementById('dropzone-file-hidden')?.click()
          }
          isProcessing={uploading}
        >
          <HiCloudUpload className='mr-2 h-5 w-5' /> Upload Files
        </Button>
      </div>
      {loading ? (
        <div className='bg-grey flex items-center justify-center'>
          <Spinner />
        </div>
      ) : files && files.length ? (
        <DocumentsList files={files} />
      ) : (
        <DocumentsEmpty onFiles={setFile} />
      )}
    </div>
  );
}
