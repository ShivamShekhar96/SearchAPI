import getCache from "appCache";
import getPool from "../db";
import { CreateSearches, GetUserSearches } from "../interface/search.interface";

const db = getPool();
const cache = getCache();

// TODO: add pagination
export const getUserSearches = async (
  params: GetUserSearches & { auth_key: string }
) => {
  const user_id = cache.get(params.auth_key);
  if (!user_id) return [];
  let query =
    "SELECT url, description FROM public.searches WHERE user_id = $1 ORDER BY created_at DESC";
  const results = await db.query(query, [user_id]);
  return results.rows;
};

const checkExistingSearch = async (url: string) => {
  const result = await db.query(
    "SELECT id FROM public.searches WHERE url ILIKE $1",
    [url]
  );

  return result.rows[0];
};

// TODO: handle url query as well
export const createSearches = async (
  params: CreateSearches & { auth_key: string }
) => {
  const user_id = cache.get(params.auth_key);
  if (!user_id) return "User not authorized";

  const existingSearch = await checkExistingSearch(params.url);
  if (existingSearch)
    return `Search already exists with search id ${existingSearch.id}`;
  const { url, description } = params;

  const result = await db.query(
    "INSERT INTO public.searches (url, description, user_id) VALUES ($1, $2, $3) RETURNING id",
    [url, description, user_id]
  );

  return `New search created with ID ${result.rows[0].id}`;
};
