'use client';

import React, { useState } from 'react';
import { Button, Modal } from 'flowbite-react';
import {
  Label,
  TextInput,
  Textarea,
  Select,
  ToggleSwitch,
  Spinner,
} from 'flowbite-react';
import { useGetModels } from '@/app/launchpad/client';

export interface CreateAssistantProps {
  open: boolean;
  setOpen: any;
}

export default function CreateAssistant(props: CreateAssistantProps) {
  const [codeInterpreterTool, setCodeInterpreterTool] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [functionTool, setFunctionTool] = useState(false);
  const [retrievalTool, setRetrievalTool] = useState(false);
  const { modelsLoading, models } = useGetModels();

  return (
    <Modal show={props.open} size={'3xl'} onClose={() => props.setOpen(false)}>
      <Modal.Header>Create Assistant</Modal.Header>
      <Modal.Body>
        <div className='space-y-6 p-6'>
          <div className='flex max-w-3xl flex-col gap-4'>
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='Assistant Name' value='Name' />
              </div>
              <TextInput
                id='name'
                placeholder='Example: Data Visualizer'
                required
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
          </div>
          <div className='max-w-3xl'>
            <div className='mb-2 block'>
              <Label htmlFor='description' value='Description' />
            </div>
            <Textarea
              id='description'
              placeholder='Example: You are great at creating beautiful data visualizations. You analyze data present in .csv files, understand trends, and come up with data visualizations relevant to those trends. You also share a brief text summary of the trends observed.'
              required
              rows={6}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <div className='max-w-3xl'>
            <div className='mb-2 block'>
              <Label htmlFor='model' value='Model' />
            </div>
            {modelsLoading ? (
              <>
                <Spinner
                  aria-label='Alternate spinner button example'
                  size='sm'
                />
                <span className='pl-3'>Loading available models...</span>
              </>
            ) : (
              <Select id='countries' required>
                {models
                  .filter((model) => {
                    // @ts-ignore
                    return model.owned_by === 'openai';
                  })
                  .map((model,index) => {
                    // @ts-ignore
                    return <option key={index}>{model.id}</option>;
                  })}
              </Select>
            )}
          </div>
          <div className='flex max-w-3xl flex-col gap-4'>
            <div className='mb-2 block'>
              <Label htmlFor='model' value='Tools' />
            </div>
            <div className='grid s:grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
              <ToggleSwitch
                checked={codeInterpreterTool}
                label='Code Interpreter'
                onChange={setCodeInterpreterTool}
              />
              <ToggleSwitch
                checked={functionTool}
                label='Function'
                onChange={setFunctionTool}
              />
              <ToggleSwitch
                checked={retrievalTool}
                label='Retrieval'
                onChange={setRetrievalTool}
              />
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          gradientDuoTone='purpleToBlue'
          onClick={() => props.setOpen(false)}
          disabled={!name && !description}
        >
          Create
        </Button>
        <Button color='gray' onClick={() => props.setOpen(false)}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
