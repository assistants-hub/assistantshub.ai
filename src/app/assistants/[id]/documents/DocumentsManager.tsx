import { Button } from 'flowbite-react';
import DocumentsEmpty from '@/app/assistants/[id]/documents/DocumentsEmpty';
import { HiCloudUpload } from 'react-icons/hi';
import React, { useContext, useEffect, useState } from 'react';
import AssistantContext from '@/app/assistants/[id]/AssistantContext';


export default function DocumentsManager() {
  const { assistant } = useContext(AssistantContext);

  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if(file) {
      handleSubmit().then(() => {
        // Toast notification
        setUploading(false)
        setFile(null)
      });
    }
  }, [file]);

  const handleSubmit = async () => {
    console.log('File:', file);

    if (!file) {
      alert('Please select a file to upload.')
      return
    }

    setUploading(true)

    const response = await fetch('/api/assistants/' + assistant.id + '/files',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filename: file.name, contentType: file.type }),
      }
    )

    if (response.ok) {
      const { url, fields } = await response.json()

      const formData = new FormData()
      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value as string)
      })
      formData.append('file', file)

      const uploadResponse = await fetch(url, {
        method: 'POST',
        body: formData,
      })

      if (uploadResponse.ok) {
        alert('Upload successful!')
      } else {
        console.error('S3 Upload Error:', uploadResponse)
        alert('Upload failed.')
      }
    } else {
      alert('Failed to get pre-signed URL.')
    }
  }

  return (
    <div className="flex flex-col gap-8 p-6 md:p-10">
      <div className="flex items-center justify-between">
        <h3 className="text-3xl font-bold"></h3>
        <input id="dropzone-file-hidden" type="file" className="hidden"
               onChange={(e) => {
                 const files = e.target.files
                 if (files) {
                   setFile(files[0])
                 }
               }} />
        <Button
          className='float-right'
          gradientDuoTone='purpleToBlue'
          onClick={() => document.getElementById('dropzone-file-hidden')?.click()}
          isProcessing={uploading}
        >
          <HiCloudUpload className='mr-2 h-5 w-5' /> Upload Files
        </Button>
      </div>
      <DocumentsEmpty />
    </div>
  )
}


