import { Button, Label, Modal, TextInput } from 'flowbite-react';
import {
  HiKey,
  HiOutlineExclamationCircle,
  HiPlus,
  HiTrash,
} from 'react-icons/hi';
import { ulid } from 'ulidx';
import React, { useEffect, useState } from 'react';
import { ModelProviderKey } from '@/app/types/model';
import { createOrUpdateKey, removeKeyWithId } from '@/app/settings/client';
import { toast } from 'react-hot-toast';

export interface ModelProviderKeysProps {
  modelProvider?: string;
  keys: ModelProviderKey[];
}

export default function ModelProviderKeys(props: ModelProviderKeysProps) {
  const [keys, setKeys] = useState<ModelProviderKey[]>(props.keys);
  const [saveKey, setSaveKey] = useState<ModelProviderKey | null>(null);
  const [dirtyKey, setDirtyKey] = useState<ModelProviderKey | null>(null);
  const [selectedKey, setSelectedKey] = useState<ModelProviderKey | null>(null);
  const [deleteKey, setDeleteKey] = useState<ModelProviderKey | null>(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {}, [keys]);

  useEffect(() => {}, [dirtyKey]);

  useEffect(() => {
    if (saveKey && saveKey.saving) {
      const updateKey = async () => {
        try {
          const [status, response] = await createOrUpdateKey(saveKey);
          if (status === 201) {
            toast.success('API Key ' + saveKey.name + ' saved successfully.', {
              duration: 4000,
            });
          } else {
            toast.error(response?.message, { duration: 4000 });
          }
        } catch (error: any) {
          toast.error(error.message, { duration: 4000 });
        }
        keys.forEach((iterationKey) => {
          if (iterationKey.id === saveKey.id) {
            iterationKey.saving = false;
            iterationKey.disabled = true;
            setSaveKey(null);
          }
        });
      };

      updateKey();
    }
  }, [saveKey]);

  useEffect(() => {
    if (deleteKey && deleteKey.deleting) {
      const removeKey = async () => {
        try {
          if (deleteKey.disabled) {
            const [status, response] = await removeKeyWithId(deleteKey.id);
            if (status === 200) {
              toast.success(
                'API Key ' + deleteKey.name + ' deleted successfully.',
                {
                  duration: 4000,
                }
              );

              const indexToRemove = keys.findIndex(
                (key) => key.id === deleteKey.id
              );
              if (indexToRemove !== -1) {
                keys.splice(indexToRemove, 1);
              }
            } else {
              toast.error(response?.message, { duration: 4000 });
            }
          } else {
            const indexToRemove = keys.findIndex(
              (key) => key.id === deleteKey.id
            );
            if (indexToRemove !== -1) {
              keys.splice(indexToRemove, 1);
            }
          }
        } catch (error: any) {
          toast.error(error.message, { duration: 4000 });
        }
        setOpenModal(false);
      };

      removeKey();
    }
  }, [deleteKey]);

  const handleAddKey = function () {
    setKeys([...keys, { id: ulid(), name: '', key: '', saving: false }]);
  };

  const handleSaveKey = function (key: ModelProviderKey) {
    keys.forEach((iterationKey) => {
      if (iterationKey.id === key.id) {
        iterationKey.modelProviderId = props.modelProvider;
        iterationKey.saving = true;
        setSaveKey(iterationKey);
      }
    });
  };

  const onNameChange = function (event: any, key: ModelProviderKey) {
    keys.forEach((iterationKey) => {
      if (iterationKey.id === key.id) {
        iterationKey.name = event.target.value;
        iterationKey.dirty = true;
        setDirtyKey(iterationKey);
      }
    });
  };

  const onKeyChange = function (event: any, key: ModelProviderKey) {
    keys.forEach((iterationKey) => {
      if (iterationKey.id == key.id) {
        iterationKey.key = event.target.value;
        iterationKey.dirty = true;
        setDirtyKey(iterationKey);
      }
    });
  };

  const handleDeleteKey = function () {
    keys.forEach((iterationKey) => {
      if (selectedKey && iterationKey.id === selectedKey.id) {
        iterationKey.deleting = true;
        setDeleteKey(iterationKey);
      }
    });
  };

  return (
    <div className={'stack space-y-1'}>
      <></>
      {keys && keys.length ? (
        keys.map((key: any) => (
          <div id={key.id} key={key.id} className={'overflow-y-auto'}>
            <div className='grid grid-cols-12 gap-3 pt-1'>
              <div className='col-span-3'>
                <div className='mb-2 block'>
                  <Label htmlFor={props.modelProvider} value='Name' />
                </div>
                <TextInput
                  id={props.modelProvider + '-name-' + key.id}
                  disabled={key.disabled}
                  defaultValue={key.name}
                  onChange={(e) => onNameChange(e, key)}
                  placeholder=''
                  required
                />
              </div>
              <div className='col-span-7'>
                <div className='mb-2 block'>
                  <Label htmlFor={props.modelProvider} value='API Key' />
                </div>
                <TextInput
                  type='password'
                  disabled={key.disabled}
                  defaultValue={key.disabled && !key.key ? 'encrypted' : ''}
                  onChange={(e) => onKeyChange(e, key)}
                  id={props.modelProvider + '-key-' + key.id}
                  placeholder=''
                  required
                />
              </div>
              <div className={'col-span-2 flex items-end justify-start gap-2'}>
                {!key.disabled ? (
                  <Button
                    size='md'
                    gradientDuoTone='greenToBlue'
                    disabled={!key.dirty}
                    isProcessing={key.saving}
                    onClick={(e) => {
                      handleSaveKey(key);
                    }}
                  >
                    <HiKey className='mr-2 h-5 w-5' />
                    Save
                  </Button>
                ) : (
                  <></>
                )}
                <Button
                  size='md'
                  color={'gray'}
                  onClick={() => {
                    setSelectedKey(key);
                    setOpenModal(true);
                  }}
                >
                  <HiTrash className='h-5 w-5' />
                </Button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <>
          <div className='flex items-center justify-center'>
            <p className={'self-center text-sm text-gray-400'}>
              No API keys configured for {props.modelProvider} using Assistants
              Hub default keys for {props.modelProvider}
            </p>
          </div>
        </>
      )}
      <div className='flex justify-center pt-4'>
        <Button size={'md'} outline color={'gray'} onClick={handleAddKey}>
          <HiPlus className='mr-2 h-5 w-5' />
          Add API Key
        </Button>
      </div>
      <Modal
        show={openModal}
        size='md'
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200' />
            <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete{' '}
              <a className='font-bold'>{selectedKey && selectedKey.name}</a> API
              key for{' '}
              <a className='font-bold'>
                {selectedKey && selectedKey.modelProviderId}
              </a>{' '}
              ?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteKey}>
                {"Yes, I'm sure"}
              </Button>
              <Button color='gray' onClick={() => setOpenModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
