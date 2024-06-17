import React, { useState, useEffect } from 'react';
import { useDebounce } from '@/app/utils/useDebounce';
import { Spinner, TextInput } from 'flowbite-react';
import { HiCheck } from 'react-icons/hi';

export interface DebouncedInputProps {
  value?: string;
  placeholder?: string;
  onDebounceTextChange?: (text: string) => void;
}

export const DebouncedInput: React.FC<DebouncedInputProps> = (
  props: DebouncedInputProps
) => {
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
    <div className='grid grid-cols-6'>
      <TextInput
        value={text}
        sizing='lg'
        className='col-span-5'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setText(e.target.value)
        }
        placeholder={props.placeholder ? props.placeholder : 'Type here...'}
      />
      <div className='col-span-1 ml-3 mt-2 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200'>
        {loading ? (
          <Spinner aria-label='saving..' size='xs' />
        ) : (
          <HiCheck className='h-5 w-5' />
        )}
      </div>
    </div>
  );
};

export default DebouncedInput;
