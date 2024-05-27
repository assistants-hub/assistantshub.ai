import { StepProps } from '@/app/onboarding/StepProps';
import { useEffect } from 'react';

export default function Legal(props: StepProps) {
  useEffect(() => {
    setTimeout(() => {
      console.log('Legal');
      props.onStepReady(props.currentStep, true);
    }, 1000);
  });

  return <div>Legal</div>;
}
