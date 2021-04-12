import { AuthActionTypes, IStateProps } from "./auth-reducer";

export const loginAction = () => ({ type: AuthActionTypes.LOGIN });
export const logoutAction = () => ({ type: AuthActionTypes.LOGOUT });

export const isLoginState = (state: { authStatus: IStateProps }) =>
  state?.authStatus?.payload?.isLogin;
