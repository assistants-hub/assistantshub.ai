import { Button, Label, TextInput } from 'flowbite-react';
import { HiKey, HiPlus, HiTrash } from 'react-icons/hi';
import { ulid } from 'ulidx';
import { useEffect, useState } from 'react';

export interface ModelProviderKeysProps {
  modelProvider?: string;
}

export default function ModelProviderKeys(props: ModelProviderKeysProps) {
  const [keys, setKeys] = useState<any>([]);

  useEffect(() => {}, [keys]);

  const handleAddKey = function () {
    setKeys([...keys, { id: ulid() }]);
  };

  const handleDeleteKey = function (id:string) {
    setKeys(keys.filter((object:any) => object.id !== id));
  };

  return (
    <div className={'stack space-y-1'}>
      <></>
      {keys.length ? (
        keys.map((key:any) => (
          <div id={key.id} key={key.id} className={'overflow-y-auto'}>
            <div className='grid grid-cols-12 gap-3 pt-1'>
              <div className='col-span-3'>
                <div className='mb-2 block'>
                  <Label htmlFor={props.modelProvider} value='Name' />
                </div>
                <TextInput
                  id={props.modelProvider + '-name-' + key.id}
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
                  id={props.modelProvider + '-key-' + key.id}
                  placeholder=''
                  required
                />
              </div>
              <div className={'col-span-2 flex items-end justify-start gap-2'}>
                <Button size='md' gradientDuoTone='purpleToBlue'>
                  <HiKey className='mr-2 h-5 w-5' />
                  Save
                </Button>
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
