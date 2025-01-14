'use client';

import { signUpValidationSchema } from '@/validators/user.validators';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { usePostMutationQuery } from '../hooks/useMutationQuery';
import type { Profile } from '@/shared/types/user.type';
import SignInUpLayout from '../ui/auth.layout/auth.layout';
import AnimatedInput from '../ui/global/inputs/animated.input/animated.input';
import config from '@/config';
import SubmitButtonDefault from '../ui/global/buttons/submit.button.default/submit.button.default';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import urls from '@/shared/enums/urls';

type SignUpType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignUp() {
  const form = useForm<SignUpType>({
    resolver: yupResolver(signUpValidationSchema),
  });

  const router = useRouter();

  const { mutate: signUp, isPending } = usePostMutationQuery<
    Profile,
    SignUpType
  >({
    url: urls.signUp,
  });

  const handleSignUp = (formValue: SignUpType) => {
    signUp(formValue, {
      onSuccess: () => {
        /* Navigate To login */
        router.push('/sign-in');
      },
    });
  };

  const onSignUp = (formValue: SignUpType) => {
    handleSignUp(formValue);
  };

  return (
    <SignInUpLayout>
      <FormProvider {...form}>
        <form
          onSubmit={e => form.handleSubmit(onSignUp)(e)}
          className="relative z-[1] flex w-full flex-col gap-10 rounded-2xl bg-white p-10 dark:bg-slate-950 md:w-2/3 xl:w-1/2 2xl:w-1/3"
        >
          <div className="flex flex-col items-center">
            <h1 className="bg-radial-red text-3xl font-extrabold text-[#333] dark:text-gray-200">
              Sign Up
            </h1>
            <p className="mt-5 text-[#666]">Let&apos;s Put You on track</p>
          </div>

          <div className="flex flex-col items-center gap-8">
            <AnimatedInput
              name="name"
              label="Name"
              className="w-full border-[2px]"
              type="text"
              defaultValue={config.DEV_MODE === '1' ? config.SIGN_UP_NAME : ''}
            />

            <div className="flex w-full gap-2">
              <AnimatedInput
                name="email"
                label="Email"
                className="w-full border-[2px]"
                type="text"
                defaultValue={config.DEV_MODE === '1' ? config.LOGIN_EMAIL : ''}
              />
            </div>

            <AnimatedInput
              name="password"
              label="Password"
              type="password"
              showPasswordButton
              className="w-full border-[2px]"
              defaultValue={
                config.DEV_MODE === '1' ? config.LOGIN_PASSWORD : ''
              }
            />
            <AnimatedInput
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              showPasswordButton
              className="w-full border-[2px]"
              defaultValue={
                config.DEV_MODE === '1' ? config.LOGIN_PASSWORD : ''
              }
            />
            <button type="submit" className="w-full">
              <SubmitButtonDefault
                className={`relative rounded-lg ${
                  isPending && 'submit-animation'
                }`}
              >
                Sign Up
              </SubmitButtonDefault>
            </button>
          </div>

          <div className="rounded-full bg-gray-100 pt-1" />

          <div className="flex items-center justify-center">
            <button
              type="button"
              className="flex w-fit items-center justify-center gap-3 rounded-lg border p-2 px-5 transition-all duration-200 hover:bg-slate-200 dark:bg-white dark:hover:bg-gray-200"
            >
              <Image
                alt="google"
                src={'./logo/google_logo.svg'}
                height={25}
                width={25}
              />
              <p>Continue With Google</p>
            </button>
          </div>

          <div className="flex flex-col items-center justify-center gap-5 md:flex-row md:items-center">
            <span className="dark:text-gray-500">
              Already a Registered Member?{' '}
            </span>
            <Link
              className="rounded-full bg-black p-2 px-5 text-white hover:bg-gray-500 dark:bg-gray-300 dark:text-black"
              href={'/sign-in'}
            >
              Sign In
            </Link>
          </div>
        </form>
      </FormProvider>
    </SignInUpLayout>
  );
}
