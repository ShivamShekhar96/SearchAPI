export interface GetUser {
  email: string;
}

export interface CreateUser {
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
}
