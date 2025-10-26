import { ICreateUser, ILoginUser, IUser } from "./IUser";

interface AuthStoreState {
  users: Record<string, IUser>;
  currentUser: IUser | null;
}

interface AuthStoreActions {
  register: (user: ICreateUser) => void;
  login: (login: ILoginUser) => void;
  logout: () => void;
  getCurrentUser: () => IUser | null;
}

export type IAuthStore = AuthStoreState & AuthStoreActions;
