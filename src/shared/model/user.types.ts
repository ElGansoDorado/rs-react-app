export type User = {
  username: string;
  age: number;
  email: string;
  password: string;
  gender: string;
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
  gender: string;
  TAC: boolean;
  img: FileList;
  country: string;
};
