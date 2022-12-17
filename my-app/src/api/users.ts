import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthentication } from '../hooks';
import { AppUser, UserWallet } from '../types/types';
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

export const useGetUserInfo = () => {
  const { token } = useAuthentication();
  const query = useQuery<AppUser, Error>({
    queryKey: [uri, token],
    queryFn: async (): Promise<AppUser> => {
      return fetchApi({
        uri: `${uri}/me`,
        method: methods.GET,
      });
    },
  });
  return { ...query, userInfo: query.data?.user };
}