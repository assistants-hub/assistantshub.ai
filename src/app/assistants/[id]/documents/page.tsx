'use client';

import React, { useContext, useEffect, useState } from 'react';
import AssistantContext from '@/app/assistants/[id]/AssistantContext';
import { getModel } from '@/app/assistants/[id]/client';
import { Spinner } from 'flowbite-react';
import { Model } from '@/app/types/model';
import { HiOutlineFolder } from "react-icons/hi";
import DocumentsManager from '@/app/assistants/[id]/documents/DocumentsManager';

export default function Documents() {
  const { assistant } = useContext(AssistantContext);
  const [loading, setLoading] = useState(true);
  const [model, setModel] = useState<Model | null>(null);

  useEffect(() => {
    if (assistant.modelId) {
      getModel(assistant.modelId).then(([status,response]) => {
        console.log(response);
        setModel(response);
        setLoading(false);
      });
    }
  }, []);

  return (
    <div className='stack items-center justify-center'>
      <h3 className='pb-4 text-3xl font-bold dark:text-white'>Documents</h3>
      {
        loading ? (
          <div className="bg-grey flex h-[calc(100vh-120px)] items-center justify-center ">
            <Spinner />
          </div>
        ) : (
          <div>
            { model?.features?.retrieval ? (
                <div>
                  <p className={"text-sm text-gray-400"}>Upload documents that will be used for retrieval function by your assistant</p>
                  <DocumentsManager/>
                </div>
              ) : (
                <div className='bg-grey flex flex-col h-[calc(100vh-120px)] items-center justify-center'>
                  <HiOutlineFolder className='text-9xl text-gray-400 dark:text-gray-700' />
                  <p className='text-gray-400 dark:text-gray-400'>Support for documents is not available for <b>{model? model.id : 'this model'}</b> yet.</p>
                </div>
                )
            }
          </div>
        )
      }
    </div>
  );
}
