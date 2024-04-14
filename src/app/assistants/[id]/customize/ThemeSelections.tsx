import React, { useContext, useState } from 'react';
import AssistantContext from '@/app/assistants/[id]/AssistantContext';
import {
  getPrimaryColor,
  getPrimaryTextColor,
  getSecondaryColor,
  getSecondaryTextColor,
} from '@/app/utils/assistant';
import ColorPicker from '@/app/assistants/[id]/customize/ColorPicker';

const ThemeSelections = () => {
  const { assistant, setAssistant } = useContext(AssistantContext);

  return (
    <div className='p-6'>
      <div id='colors' className='grid max-w-2xl grid-cols-2'>
        <ColorPicker
          label='Primary Color'
          initialColor={getPrimaryColor(assistant)}
          onColorChange={(color) => {
            // @ts-ignore
            setAssistant({
              ...assistant,
              theme: {
                ...assistant.theme,
                primaryColor: color,
              },
            });
          }}
        />
        <ColorPicker
          label='Secondary Color'
          initialColor={getSecondaryColor(assistant)}
          onColorChange={(color) => {
            // @ts-ignore
            setAssistant({
              ...assistant,
              theme: {
                ...assistant.theme,
                secondaryColor: color,
              },
            });
          }}
        />
      </div>
      <div id='textColors' className='grid max-w-2xl grid-cols-2'>
        <ColorPicker
          label='Header Title Color'
          initialColor={getPrimaryTextColor(assistant)}
          onColorChange={(color) => {
            // @ts-ignore
            setAssistant({
              ...assistant,
              theme: {
                ...assistant.theme,
                primaryTextColor: color,
              },
            });
          }}
        />
        <ColorPicker
          label='Header Description Color'
          initialColor={getSecondaryTextColor(assistant)}
          onColorChange={(color) => {
            // @ts-ignore
            setAssistant({
              ...assistant,
              theme: {
                ...assistant.theme,
                secondaryTextColor: color,
              },
            });
          }}
        />
      </div>
    </div>
  );
};

export default ThemeSelections;
