export enum AuthActionTypes {
  LOGIN = `LOGIN`,
  LOGOUT = `LOGOUT`,
}

export interface IAuthAction {
  type: AuthActionTypes;
}

export interface IStateProps {
  payload: { isLogin: boolean };
}

export const authInitialState = {
  payload: { isLogin: false },
};

const authReducer = (
  state: IStateProps = authInitialState,
  action: IAuthAction
) => {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      return {
        ...state,
        payload: { isLogin: true },
      };

    case AuthActionTypes.LOGOUT:
      return {
        ...state,
        payload: { isLogin: false },
      };

    default:
      return state;
  }
};

export default authReducer;
