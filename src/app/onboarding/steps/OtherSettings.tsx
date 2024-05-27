import { useEffect } from 'react';
import { StepProps } from '@/app/onboarding/StepProps';

export default function OtherSettings(props: StepProps) {
  useEffect(() => {
    setTimeout(() => {
      console.log('Legal');
      props.onStepReady(props.currentStep, true);
    }, 1000);
  });

  return <div>Other Settings</div>;
}
