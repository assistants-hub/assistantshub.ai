'use client';

import { Accordion, Spinner } from 'flowbite-react';
import Image from 'next/image';
import ModelProviderKeys from '@/app/settings/ModelProviderKeys';
import { useGetModelProviderKeys } from '@/app/settings/client';
import React, { useEffect } from 'react';

export function ModelProviders() {
  let { keysLoading, keys, keysEmpty, mutate } = useGetModelProviderKeys();

  useEffect(() => {
  }, [keys]);

  function getKeysForModelProvider(provider:string) {
    let filtered = keys.filter((item) => item.modelProviderId === provider);
    filtered.forEach((item: any) => {
      item.disabled = true;
    });

    return filtered;
  }

  return (
    <>
      {keysLoading ? (
        <div className='bg-grey flex items-center justify-center '>
          <Spinner />
        </div>
      ) : (
        <Accordion collapseAll>
          <Accordion.Panel>
            <Accordion.Title>
              <div className={'flex flex-auto items-center gap-2'}>
                <Image
                  src={'/images/model-providers/openai.svg'}
                  alt={'OpenAI'}
                  width={30}
                  height={60}
                ></Image>{' '}
                OpenAI
              </div>
            </Accordion.Title>
            <Accordion.Content>
              <ModelProviderKeys
                modelProvider={'openai'}
                keys={getKeysForModelProvider('openai')}
              />
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title>
              <div className={'flex flex-auto items-center gap-2'}>
                <Image
                  src={'/images/model-providers/google.png'}
                  alt={'Google'}
                  width={30}
                  height={60}
                ></Image>{' '}
                Google AI Studio
              </div>
            </Accordion.Title>
            <Accordion.Content>
              <ModelProviderKeys
                modelProvider={'google'}
                keys={getKeysForModelProvider('google')}
              />
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title>
              <div className={'flex flex-auto items-center gap-2'}>
                <Image
                  src={'/images/model-providers/groq.png'}
                  alt={'Groq'}
                  width={30}
                  height={60}
                ></Image>{' '}
                Groq Cloud
              </div>
            </Accordion.Title>
            <Accordion.Content>
              <ModelProviderKeys
                modelProvider={'groq'}
                keys={getKeysForModelProvider('groq')}
              />
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title>
              <div className={'flex flex-auto items-center gap-2'}>
                <Image
                  src={'/images/model-providers/anthropic.png'}
                  alt={'Anthropic'}
                  width={30}
                  height={60}
                ></Image>{' '}
                Anthropic
              </div>
            </Accordion.Title>
            <Accordion.Content>
              <ModelProviderKeys
                modelProvider={'anthropic'}
                keys={getKeysForModelProvider('anthropic')}
              />
            </Accordion.Content>
          </Accordion.Panel>
        </Accordion>
      )}
    </>
  );
}
