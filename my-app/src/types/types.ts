export type UserWallet = {
  address: string;
  privateKey: string;
}

export type AppUser = {
  user: {
    wallet: UserWallet;
  };
}