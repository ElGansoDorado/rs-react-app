export type User = {
  username: string;
  age: number;
  email: string;
  password: string;
  gender: boolean;
  TAC: boolean;
  img: string;
  country: string;
};

export type FormData = {
  username: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: boolean;
  TAC: boolean;
  img: FileList;
  country: string;
};
