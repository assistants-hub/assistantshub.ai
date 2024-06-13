import { Button, Label, TextInput } from 'flowbite-react';
import { HiKey, HiPlus, HiTrash } from 'react-icons/hi';
import { ulid } from 'ulidx';
import { useEffect, useState } from 'react';
import { ModelProviderKey } from '@/app/types/model';
import { createOrUpdateKey } from '@/app/settings/client';
import { toast } from 'react-hot-toast';

export interface ModelProviderKeysProps {
  modelProvider?: string;
  keys: ModelProviderKey[];
}

export default function ModelProviderKeys(props: ModelProviderKeysProps) {
  const [keys, setKeys] = useState<ModelProviderKey[]>(props.keys);
  const [saveKey, setSaveKey] = useState<ModelProviderKey | null>(null);
  const [dirtyKey, setDirtyKey] = useState<ModelProviderKey | null>(null);

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
        } catch (error:any) {
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

  const handleAddKey = function () {
    setKeys([...keys, { id: ulid(), name: '', key: '', saving: false }]);
  };

  const handleSaveKey = function (key:ModelProviderKey) {
    keys.forEach((iterationKey) => {
      if (iterationKey.id === key.id) {
        iterationKey.modelProviderId = props.modelProvider;
        iterationKey.saving = true;
        setSaveKey(iterationKey);
      }
    });
  };

  const onNameChange = function (event:any, key:ModelProviderKey) {
    keys.forEach((iterationKey) => {
      if (iterationKey.id === key.id) {
        iterationKey.name = event.target.value;
        iterationKey.dirty = true;
        setDirtyKey(iterationKey);
      }
    });
  };

  const onKeyChange = function (event:any, key:ModelProviderKey) {
    keys.forEach((iterationKey) => {
      if (iterationKey.id == key.id) {
        iterationKey.key = event.target.value;
        iterationKey.dirty = true;
        setDirtyKey(iterationKey);
      }
    });
  };

  const handleDeleteKey = function (id: string) {
    setKeys(keys.filter((object: any) => object.id !== id));
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
                    gradientDuoTone='purpleToBlue'
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
                  onClick={() => handleDeleteKey(key.id)}
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
    </div>
  );
}
