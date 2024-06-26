import React, { useState } from 'react';
import { Label, TextInput } from 'flowbite-react';

interface ColorPickerProps {
  label: string;
  initialColor: string;
  onColorChange: (color: string) => void;
}

const ColorPicker = (props: ColorPickerProps) => {
  const [color, setColor] = useState<string>(props.initialColor); // Default primaryColor is black
  const [inputColor, setInputColor] = useState<string>(props.initialColor);

  const handleColorChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setColor(event.target.value.toUpperCase());
    setInputColor(event.target.value.toUpperCase());
    props.onColorChange(event.target.value.toUpperCase());
  };

  const handleColorHexInputChange: React.ChangeEventHandler<
    HTMLInputElement
  > = (event) => {
    const hexValue = event.target.value.toUpperCase();
    // Validate hex value (simple validation)
    if (/^#([0-9A-F]{3}){1,2}$/i.test(hexValue)) {
      setColor(hexValue);
      setInputColor(hexValue);
      props.onColorChange(hexValue);
    } else {
      setInputColor(hexValue); // Allow user to continue typing
    }
  };

  return (
    <div className='flex'>
      <div id='fileUpload' className='grid max-w-2xl grid-cols-3'>
        <div className={'col-span-2'}>
          <div className='mb-2 block'>
            <Label value={props.label} />
          </div>
          <div className='grid max-w-xs grid-cols-2 pb-6'>
            <TextInput
              type='text'
              className='col-span-1'
              value={inputColor}
              onChange={handleColorHexInputChange}
              maxLength={7}
            />
            <input
              type='color'
              className={
                'ml-2 block h-10 w-14 cursor-pointer items-start rounded-lg border border-gray-200 bg-white p-1 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900'
              }
              value={color}
              onChange={handleColorChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
