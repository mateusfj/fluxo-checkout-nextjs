export interface IResponseList<T> {
  data: T[];
  total?: number;
}

export interface IResponseOne<T> {
  data: T[];
}

export interface IResponseGetMe<T> {
  data: T;
}

export interface IResponseSuccess {
  message: string;
}

export interface IResponseError {
  error: string;
  message: string;
}
