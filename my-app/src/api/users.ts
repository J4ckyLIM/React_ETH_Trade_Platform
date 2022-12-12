import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchApi, methods } from './fetchApi';

export interface CreateUserArgs {
  email: string;
  password: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

const uri = '/users';

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, Error, CreateUserArgs>({
    mutationFn: async ({
      email,
      password,
    }: CreateUserArgs): Promise<void> =>
      fetchApi({
        uri: `${uri}/new`,
        method: methods.POST,
        body: {
          email,
          password,
        },
      }),
    onSuccess: (_, { onSuccess }) => {
      queryClient.invalidateQueries([uri]);
      if(onSuccess) {
        onSuccess();
      }
    },
    onError: (error, { onError }) => {
      if(onError) {
        onError(error);
      }
    }
  });

  return { ...mutation, createUser: mutation.mutate };
};