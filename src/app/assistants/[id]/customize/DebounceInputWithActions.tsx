import React, { useState, useEffect } from 'react';
import { useDebounce } from '@/app/utils/useDebounce';
import { Button, Spinner, TextInput } from 'flowbite-react';
import { HiCheck, HiTrash } from 'react-icons/hi';

export interface DebouncedInputWithActionsProps {
  value?: string;
  placeholder?: string;
  onDebounceTextChange?: (text: string) => void;
  onDebounceTextDelete?: () => void;
}

export const DebouncedInputWithActions: React.FC<
  DebouncedInputWithActionsProps
> = (props: DebouncedInputWithActionsProps) => {
  const [text, setText] = useState<string>(props.value ? props.value : '');
  const [loading, setLoading] = useState<boolean>(false);
  const debouncedText = useDebounce<string>(text, 300); // 300ms delay

  useEffect(() => {
    // This function will run after debouncedText changes and the 300ms delay passes
    if (debouncedText && debouncedText !== props.value) {
      setLoading(true);
      props.onDebounceTextChange
        ? props.onDebounceTextChange(debouncedText)
        : null;
      setLoading(false);
    }
  }, [debouncedText]); // Only re-run if debouncedText changes

  return (
    <div className='grid grid-cols-12'>
      <TextInput
        value={text}
        sizing='md'
        className='col-span-10'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setText(e.target.value)
        }
        placeholder={props.placeholder ? props.placeholder : ''}
      />
      <div className='col-span-1 ml-3 mt-2 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200'>
        {loading ? (
          <Spinner aria-label='saving..' size='xs' />
        ) : (
          <HiCheck className='h-5 w-5' />
        )}
      </div>
      <Button
        size='sm'
        color={'gray'}
        disabled={!prompt}
        onClick={props.onDebounceTextDelete as any}
        className={'col-span-1 border-0 pb-1'}
      >
        <HiTrash className='h-5 w-5' color={'gray'} />
      </Button>
    </div>
  );
};

export default DebouncedInputWithActions;
