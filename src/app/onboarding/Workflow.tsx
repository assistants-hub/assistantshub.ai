'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import Legal from '@/app/onboarding/steps/Legal';
import Authentication from '@/app/onboarding/steps/Authentication';
import ModelProviders from '@/app/onboarding/steps/ModelProviders';
import OtherSettings from '@/app/onboarding/steps/OtherSettings';
import Done from '@/app/onboarding/steps/Done';
import { Button, Modal } from 'flowbite-react';
import {
  HiOutlineArrowLeft,
  HiOutlineArrowRight,
  HiOutlineCheck,
} from 'react-icons/hi';
import { useRouter } from 'next/navigation';

const LAST_STEP = 5;

export default function Workflow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isPreviousEnabled, setIsPreviousEnabled] = useState(false);
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const router = useRouter();

  useEffect(() => {}, [isNextEnabled, isPreviousEnabled]);

  const onStepReady = (step: number, isReady: boolean) => {
    if (step === currentStep) {
      setIsNextEnabled(isReady);
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
    setIsNextEnabled(true);
  };

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
    setIsPreviousEnabled(true);
    setIsNextEnabled(false);
  };

  const handleDone = () => {
    router.push('/');
  };

  let steps = [
    {
      step: 1,
      title: 'Legal',
      subtitle: 'Accept terms & conditions',
    },
    {
      step: 2,
      title: 'Admin Credentials',
      subtitle: 'Setup administrator account',
    },
    {
      step: 3,
      title: 'Get Started',
      subtitle: "Let's login and continue",
    },
  ];

  return (
    <Modal show={true} size={'7xl'}>
      <Modal.Body>
        <div className='space-y-6 p-2'>
          <div className='flex flex-auto items-center justify-center pt-2'>
            <Image
              src='/logo.png'
              alt='Assistants Hub Logo'
              width={0}
              height={0}
              sizes='10vw'
              style={{ width: '6%', height: 'auto' }} // optional
            />
          </div>
          <ol className='w-full items-center justify-center space-y-4 pt-2 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse'>
            {steps.map((step) => {
              return (
                <li
                  key={step.step}
                  className={
                    step.step === currentStep
                      ? 'flex items-center space-x-2.5 text-blue-600 dark:text-blue-500 rtl:space-x-reverse'
                      : 'flex items-center space-x-2.5 text-gray-500 dark:text-gray-400 rtl:space-x-reverse'
                  }
                >
                  <span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-blue-600 dark:border-blue-500'>
                    {step.step}
                  </span>
                  <span>
                    <h3 className='xs:font-small leading-tight sm:font-medium'>
                      {step.title}
                    </h3>
                    <p className='text-xs xs:hidden sm:flex'>{step.subtitle}</p>
                  </span>
                </li>
              );
            })}
          </ol>
          <div className='flex flex-auto items-center justify-center sm:h-[calc(22vh)] md:h-[calc(40vh)]'>
            {(() => {
              switch (currentStep) {
                case 1:
                  return (
                    <Legal
                      onStepReady={onStepReady}
                      currentStep={currentStep}
                    />
                  );
                case 2:
                  return (
                    <Authentication
                      onStepReady={onStepReady}
                      currentStep={currentStep}
                    />
                  );
                case 3:
                  return (
                    <ModelProviders
                      onStepReady={onStepReady}
                      currentStep={currentStep}
                    />
                  );
                case 4:
                  return (
                    <OtherSettings
                      onStepReady={onStepReady}
                      currentStep={currentStep}
                    />
                  );
                case 5:
                  return (
                    <Done onStepReady={onStepReady} currentStep={currentStep} />
                  );
                default:
                  return null;
              }
            })()}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className='justify-end'>
        {currentStep > 1 ? (
          <Button
            outline
            gradientDuoTone='purpleToBlue'
            onClick={handlePreviousStep}
            disabled={!isPreviousEnabled}
            hidden={false}
          >
            <HiOutlineArrowLeft className='mr-2 h-5 w-5' />
            Previous
          </Button>
        ) : null}
        {currentStep != LAST_STEP ? (
          <Button
            gradientDuoTone='purpleToBlue'
            onClick={handleNextStep}
            disabled={!isNextEnabled}
          >
            Next
            <HiOutlineArrowRight className='ml-2 h-5 w-5' />
          </Button>
        ) : null}
        {currentStep === LAST_STEP ? (
          <Button
            gradientDuoTone='purpleToBlue'
            onClick={handleDone}
            disabled={!isNextEnabled}
          >
            Done
            <HiOutlineCheck className='ml-2 h-5 w-5' />
          </Button>
        ) : null}
      </Modal.Footer>
    </Modal>
  );
}
