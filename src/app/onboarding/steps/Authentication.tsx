import { StepProps } from '@/app/onboarding/StepProps';
import { useEffect } from 'react';
import { Label, TextInput } from 'flowbite-react';
import { useForm, Controller, SubmitHandler } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Authentication(props: StepProps) {
  const { register, control, handleSubmit, watch, formState: { errors } } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  useEffect(() => {
  });

  return <div className='h-full w-full justify-center items-center bg-red-100'>
    <div className='flex flex-row justify-center items-center gap-2 p-5  bg-gray-200'>
      <form className="flex flex-auto max-w-md flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex text-sm text-gray-600 justify-center items-center">Setup administrator account for management.</div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Administrator Email" />
          </div>
          <Controller
            name="email"
            control={control}
            render={({ field }) => <TextInput {...field}
                     placeholder="santthosh@assistantshub.ai"  /> }/>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Administrator Password" />
          </div>
          <TextInput id="password1" type="password" required />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password2" value="Confirm Password" />
          </div>
          <TextInput id="password2" type="password" required />
        </div>
        <div className="text-sm text-gray-400">Note: You will be able to configure additional authentication providers
          from administrator console, once you login.
        </div>
      </form>
    </div>
  </div>;
}
