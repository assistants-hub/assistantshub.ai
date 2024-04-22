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
import { createAssistant, useGetModels } from '@/app/assistants/client';
import { toast } from 'react-hot-toast';

export interface CreateAssistantProps {
  open: boolean;
  setOpen: any;
  setAssistantCreated?: any;
}

export default function CreateAssistantModal(props: CreateAssistantProps) {
  const [codeInterpreterTool, setCodeInterpreterTool] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [model, setModel] = useState('');
  const [instructions, setInstructions] = useState('');
  const [functionTool, setFunctionTool] = useState(false);
  const [retrievalTool, setRetrievalTool] = useState(false);
  const [modelProvider, setModelProvider] = useState('openai'); // Default to OpenAI
  const { modelsLoading, models } = useGetModels();

  const [creatingAssistant, setCreatingAssistant] = useState(false);

  const handleCreateAssistant = async () => {
    setCreatingAssistant(true);

    let selectedModel = model;
    if (!selectedModel) {
      // If no selection was made, pick the first one on the list
      selectedModel = models.models.filter((model) => {
        return model.provider.id === modelProvider;
      })[0].id;
      setModel(selectedModel);
    }

    let assistant = {
      name: name,
      description: description,
      instructions: instructions,
      modelId: selectedModel,
      modelProviderId: modelProvider,
      //TODO: Add tools to assistant type
    };

    let [status, response] = await createAssistant(assistant);

    if (status === 201) {
      if (props.setAssistantCreated) {
        props.setAssistantCreated(true);
      }

      setCreatingAssistant(false);
      toast.success('Assistant ' + name + ' created successfully.', {
        duration: 4000,
      });
      props.setOpen(false);
    } else {
      toast.error(response?.message, { duration: 4000 });
      setCreatingAssistant(false);
    }
  };

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
                placeholder='Example: Math Tutor'
                required
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
          </div>
          <div className='flex max-w-3xl flex-col gap-4'>
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='Assistant description' value='Description' />
              </div>
              <TextInput
                id='description'
                placeholder='Example: Math Tutor for study group #1'
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
          </div>
          <div className='max-w-3xl'>
            <div className='mb-2 block'>
              <Label htmlFor='instructions' value='Instructions' />
            </div>
            <Textarea
              id='instructions'
              placeholder='Example: You are a personal math tutor. When asked a question, write and run Python code to answer the question.'
              rows={6}
              value={instructions}
              onChange={(e) => {
                setInstructions(e.target.value);
              }}
            />
          </div>
          <div className='max-w-3xl'>
            <div className='mb-2 block'>
              <Label htmlFor='modelProvider' value='Model Provider' />
            </div>
            {modelsLoading ? (
              <>
                <Spinner aria-label='Loading model provider..' size='sm' />
                <span className='pl-3'>
                  Loading available model providers...
                </span>
              </>
            ) : (
              <Select
                id='modelProvider'
                required
                value={modelProvider}
                onChange={(e) => {
                  setModelProvider(e.target.value);
                }}
              >
                {models &&
                  models.providers.map((provider, index) => {
                    return (
                      <option key={index} value={provider.id}>
                        {provider.name}
                      </option>
                    );
                  })}
              </Select>
            )}
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
              <Select
                id='model'
                required
                value={model}
                onChange={(e) => {
                  setModel(e.target.value);
                }}
              >
                {models &&
                  models.models
                    .filter((model) => {
                      return model.provider.id === modelProvider;
                    })
                    .map((model, index) => {
                      return (
                        <option key={index} value={model.id}>
                          {model.id}
                        </option>
                      );
                    })}
              </Select>
            )}
          </div>
          {/*<div className='flex max-w-3xl flex-col gap-4'>
            <div className='mb-2 block'>
              <Label htmlFor='model' value='Tools' />
            </div>
            <div className='s:grid-cols-1 grid gap-3 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'>
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
          </div>*/}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          gradientDuoTone='purpleToBlue'
          onClick={handleCreateAssistant}
          disabled={!name}
          isProcessing={creatingAssistant}
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
