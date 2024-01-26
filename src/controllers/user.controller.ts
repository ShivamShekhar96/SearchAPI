import getCache from "appCache";
import getPool from "../db";
import { GetUser, CreateUser } from "../interface/user.interface";

const db = getPool();
const cache = getCache();

export const getUser = async (params: GetUser) => {
  let query =
    "SELECT id, first_name, last_name, email FROM public.users WHERE email = $1";
  const results = await db.query(query, [params.email]);
  return results.rows[0];
};

const checkUserExists = async (email: string) => {
  const result = await db.query(
    "SELECT id FROM public.users WHERE email = $1",
    [email]
  );

  return result.rows[0];
};

export const loginUser = async (params: CreateUser & { auth_key: string }) => {
  const userExists = await checkUserExists(params.email);
  let user_id = null;
  if (userExists) user_id = userExists.id;
  else {
    const user = await createUser(params);
    user_id = user.id;
  }
  cache.set(params.auth_key, user_id, 7776000);
};

export const logoutUser = async (auth_key: string) => {
  cache.delete(auth_key);
};

export const createUser = async (params: CreateUser) => {
  const result = await db.query(
    "INSERT INTO public.users (email, first_name, last_name, phone) VALUES ($1, $2, $3, $4) RETURNING id",
    [params.email, params.first_name, params.last_name, params.phone]
  );
  return result.rows[0].id;
};
