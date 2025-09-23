import { postData } from '@/lib/fetch-util';
import type { SignUpFormData } from '@/pages/auth/SignUp';
import { useMutation } from '@tanstack/react-query';

export const useSignUpMutation = () => {
  return useMutation({
    mutationFn: (data: SignUpFormData) => postData('/auth/register', data),
  });
};

export const useVerifyEmailMutation = () => {
  return useMutation({
    mutationFn: (data: { token: string }) =>
      postData('/auth/verify-email', data),
  });
};

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      postData('/auth/login', data),
  });
};
