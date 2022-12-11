import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchApi, methods } from './fetchApi';

export interface CreateUserArgs {
  email: string;
  password: string;
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
    onSuccess: () => {
      queryClient.invalidateQueries([uri]);
    },
  });

  return { ...mutation, createUser: mutation.mutate };
};