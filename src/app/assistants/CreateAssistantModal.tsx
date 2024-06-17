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
import Link from 'next/link';

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
  const [apiKey, setAPIKey] = useState('');
  const [modelDescription, setModelDescription] = useState('');
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

    let selectedKeyId = undefined;
    if (apiKey) {
      let selectedKey = models.models
        .filter((model) => {
          return model.id === selectedModel;
        })[0]
        .keys.filter((key) => {
          return key.name === apiKey;
        })[0];

      selectedKeyId = selectedKey?.id;
    }

    let assistant = {
      name: name,
      description: description,
      instructions: instructions,
      modelId: selectedModel,
      modelProviderId: modelProvider,
      modelProviderKeyId: selectedKeyId,
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
      <Modal.Body className='flex h-full max-h-full flex-col overflow-y-scroll'>
        <div className={'space-y-4 p-3'}>
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
              rows={3}
              value={instructions}
              onChange={(e) => {
                setInstructions(e.target.value);
              }}
            />
          </div>
          <div className={'grid max-w-3xl grid-cols-2 gap-4'}>
            <div className='col-span-1 max-w-3xl'>
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
                    let selectedModel = models.models.filter((model) => {
                      return model.provider.id === e.target.value;
                    });
                    setModelDescription(selectedModel[0].description);
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
            <div className='col-span-1 max-w-3xl'>
              <div className='mb-2 block'>
                <Label htmlFor='modelAPIKey' value='API Key' />
              </div>
              {modelsLoading ? (
                <>
                  <Spinner aria-label='API Key' size='sm' />
                  <span className='pl-3'>Loading available models...</span>
                </>
              ) : (
                <>
                  <Select
                    id='apiKey'
                    required
                    value={apiKey}
                    onChange={(e) => {
                      setAPIKey(e.target.value);
                      let apiKey = models.models.filter((model) => {
                        return model.id === e.target.value;
                      });
                    }}
                  >
                    {models &&
                      models.models
                        .filter((index) => {
                          return index.provider.id === modelProvider;
                        })[0]
                        .keys.map((key, index) => {
                          return (
                            <option key={index} value={key.name}>
                              {key.name}
                            </option>
                          );
                        })}
                    <option key={'default'} value={''}>
                      &#128272; Assistants Hub&apos;s API Keys
                    </option>
                  </Select>
                  <div className={'mt-2 text-xs text-gray-500'}>
                    To add or modify API Keys, use{' '}
                    <Link
                      className={'text-blue-500'}
                      href={'/settings'}
                      target={'_blank'}
                    >
                      settings page.
                    </Link>
                  </div>
                </>
              )}
            </div>
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
              <>
                <Select
                  id='model'
                  required
                  value={model}
                  onChange={(e) => {
                    setModel(e.target.value);
                    let selectedModel = models.models.filter((model) => {
                      return model.id === e.target.value;
                    });
                    setModelDescription(selectedModel[0].description);
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
                <div className={'mt-2 text-xs text-gray-500'}>
                  {modelDescription}
                </div>
              </>
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
