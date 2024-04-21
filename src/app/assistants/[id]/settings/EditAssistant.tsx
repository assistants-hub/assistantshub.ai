import {
  Button,
  Label,
  Select,
  Spinner,
  Textarea,
  TextInput,
  ToggleSwitch,
} from 'flowbite-react';
import React, { useState } from 'react';
import { useGetModels } from '@/app/assistants/client';
import { Assistant } from '@/app/types/assistant';
import { toast } from 'react-hot-toast';
import { updateAssistant } from '@/app/assistants/[id]/client';

export interface EditAssistantProps {
  assistant: Assistant;
}

export default function EditAssistant(props: EditAssistantProps) {
  const [codeInterpreterTool, setCodeInterpreterTool] = useState(false);
  const [name, setName] = useState(props.assistant.name);
  const [description, setDescription] = useState(props.assistant.description);
  const [model, setModel] = useState(props.assistant.model);
  const [instructions, setInstructions] = useState(
    props.assistant.instructions
  );
  //TODO: Add tools to assistant type
  const [functionTool, setFunctionTool] = useState(false);
  const [retrievalTool, setRetrievalTool] = useState(false);
  const { modelsLoading, models } = useGetModels();

  const [editingAssistant, setEditingAssistant] = useState(false);

  const handleEditAssistant = async () => {
    setEditingAssistant(true);

    let selectedModel = model;
    if (!selectedModel) {
      // If no selection was made, pick the first one on the list
      selectedModel = models[0].id;
      setModel(selectedModel);
    }

    let assistant = {
      id: props.assistant.id,
      name: name,
      description: description,
      instructions: instructions,
      model: selectedModel,
      //TODO: Add tools to assistant type
    };

    let [status, response] = await updateAssistant(assistant);

    if (status === 200) {
      setEditingAssistant(false);
      toast.success('Assistant ' + name + ' changes saved successfully.', {
        duration: 4000,
      });
    } else {
      toast.error(response?.message, { duration: 4000 });
      setEditingAssistant(false);
    }
  };

  return (
    <td>
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
              value={name}
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
              value={description}
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
              {models.map((model, index) => {
                return (
                  <option key={index} value={model.id}>
                    {model.id}
                  </option>
                );
              })}
            </Select>
          )}
        </div>
        <div className='flex max-w-3xl flex-col gap-4'>
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
        </div>
        <div>
          <Button
            gradientDuoTone='purpleToBlue'
            outline={true}
            onClick={handleEditAssistant}
            disabled={!name}
            isProcessing={editingAssistant}
          >
            Save
          </Button>
        </div>
      </div>
    </td>
  );
}
