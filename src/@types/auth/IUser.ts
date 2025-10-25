export type IUser = {
  id: string;
  email: string;
  name: string;
  password: string;
};

export type ICreateUser = {
  name: string;
  email: string;
  password: string;
};

export type ILoginUser = {
  email: string;
  password: string;
};

export type IUserWithoutPassword = Omit<IUser, "password">;
