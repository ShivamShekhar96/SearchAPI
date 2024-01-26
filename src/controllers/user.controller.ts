import getPool from "../db";
import {
    GetUser,
    CreateUser
} from "../interface/user.interface";

const db = getPool();

export const getUser = async (params: GetUser) => {
  let query =
    "SELECT id, first_name, last_name, email FROM public.users WHERE email = $1";
  const results = await db.query(query, [params.email]);
  return results.rows[0];
};

export const createUser = (params: CreateUser) => {
    const result = db.query(
      "INSERT INTO public.users (email, first_name, last_name, phone) VALUES ($1, $2, $3, $4) RETURNING id",
      [params.email, params.first_name, params.last_name, params.phone]
    );
  
    return result.rows[0].id;
  };

