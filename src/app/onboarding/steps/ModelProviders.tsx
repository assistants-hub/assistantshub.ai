import { StepProps } from '@/app/onboarding/StepProps';
import { useEffect } from 'react';

export default function ModelProviders(props: StepProps) {
  useEffect(() => {
    setTimeout(() => {
      console.log('Legal');
      props.onStepReady(props.currentStep, true);
    }, 1000);
  });

  return <div>ModelProviders</div>;
}
