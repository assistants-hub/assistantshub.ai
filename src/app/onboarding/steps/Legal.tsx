import { StepProps } from '@/app/onboarding/StepProps';
import { Checkbox, Label } from 'flowbite-react';
import { useEffect, useState } from 'react';

export default function Legal(props: StepProps) {
  const [csrfToken, setCsrfToken] = useState<string>('');

  useEffect(() => {
    props.onStepReady(props.currentStep, false);
    fetch('/api/settings')
      .then((response) => response.json())
      .then((data) => setCsrfToken(data.token));
  }, []);

  const handleAcceptanceOfTerms = async (event:any) => {
    if (event.target.checked) {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: csrfToken,
          step: props.currentStep,
          metadata: {
            agreeToTerms: true,
          },
        }),
      });
      props.onStepReady(props.currentStep, true);
    } else {
      props.onStepReady(props.currentStep, false);
    }
  };

  return (
    <div className='h-full w-full'>
      <iframe
        className={'max-h-full w-full overflow-y-auto bg-gray-200'}
        width='100%'
        height='88%'
        frameBorder='0'
        src='/pages/terms-embedded.html'
      ></iframe>
      <div className='flex flex-row items-center gap-2 p-5'>
        <Checkbox
          id='accept'
          defaultChecked={false}
          onClick={handleAcceptanceOfTerms}
        />
        <Label htmlFor='accept' className='flex'>
          I agree with the&nbsp;
          <a
            href='/pages/terms.html'
            target='_blank'
            className='text-cyan-600 hover:underline dark:text-cyan-500'
          >
            terms and conditions
          </a>
        </Label>
      </div>
    </div>
  );
}
