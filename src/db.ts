import { Pool } from "pg";

let pool = null;
const createPool = () => {
  if (pool) {
    alert("DB instance already exists.");
    return;
  }
  pool = new Pool({
    user: process.env.DB_USER || "me",
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_NAME || "api",
    password: process.env.DB_PASSWORD || "password",
    port: 5432,
  });
  return pool;
};

const getPool = () => {
  if (!pool) pool = createPool();
  return pool;
};

export default getPool