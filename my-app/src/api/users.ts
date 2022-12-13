import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthentication } from '../hooks';
import { UserWallet } from '../types/types';
import { fetchApi, methods } from './fetchApi';

export interface CreateUserArgs {
  email: string;
  password: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export interface CreateWalletArgs {
  userId: string;
  onSuccess?: (wallet: UserWallet) => void;
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

export const useCreateWallet = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<{ message: string, wallet: UserWallet }, Error, CreateWalletArgs>({
    mutationFn: async ({ userId }: CreateWalletArgs): Promise<{ message: string, wallet: UserWallet }> =>
      fetchApi({
        uri: `${uri}/${userId}/wallet/new`,
        method: methods.POST,
      }),
    onSuccess: (data, { onSuccess }) => {
      queryClient.invalidateQueries([uri]);
      if(onSuccess) {
        onSuccess(data.wallet);
      }
    },
    onError: (error, { onError }) => {
      if(onError) {
        onError(error);
      }
    }
  });

  return { ...mutation, createWallet: mutation.mutate };
}

export const useGetWallet = () => {
  const { user } = useAuthentication();

  if (!user) {
    throw new Error('User is missing');
  }

  const newUri = `${uri}/${user.uid}/wallet`;
  const query = useQuery<{ wallet: UserWallet}, Error>({
    queryKey: [uri, user],
    queryFn: async (): Promise<{ wallet: UserWallet}> =>
      fetchApi({
        uri: newUri,
      }),
  });

  const wallet = query.data?.wallet;

  return {
    ...query,
    wallet,
  };
}