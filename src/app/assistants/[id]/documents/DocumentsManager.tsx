import { Button } from 'flowbite-react';
import DocumentsEmpty from '@/app/assistants/[id]/documents/DocumentsEmpty';
import { HiCloudUpload } from 'react-icons/hi';
import React from 'react';


export default function DocumentsManager() {
  return (
    <div className="flex flex-col gap-8 p-6 md:p-10">
      <div className="flex items-center justify-between">
        <h3 className="text-3xl font-bold"></h3>
        <Button
          className='float-right'
          gradientDuoTone='purpleToBlue'
          onClick={() => {}}
        >
          <HiCloudUpload className='mr-2 h-5 w-5' /> Upload Files
        </Button>
      </div>
      <DocumentsEmpty />
    </div>
  )
}


