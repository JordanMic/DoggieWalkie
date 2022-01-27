export interface IAuthMethods {
  login: LoginEndpointFunction;
  register: RegisterEndpointFunction;
}

export type LoginEndpointFunction = (loginData: ILoginData) => Promise<ILoginResponse>
export type RegisterEndpointFunction = (newRegisterData: INewRegisterData) => Promise<void>

export interface INewRegisterData {
  username: string;
  email: string;
  password: string;
}

export interface ILoginData {
  login: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  username: string;
  roles: string[];
  userData: UserData;
}

export interface UserData {
  firstName: string;
  lastName: string;
  avatar: string,
  town: number,
  district: number,
  voivodeship: number
}

export interface ILoginErrorResponse {
  timestamp: string,
  status: number,
  error: string,
  message: string,
  path: string
}

export interface IRegisterErrorResponse{
  reason: string,
  timestamp: string
}
