import { Pool } from "pg";

let pool = null;
const createPool = () => {
  if (pool) {
    alert("DB instance already exists.");
    return;
  }
  pool = new Pool({
    user: process.env.DB_USER || "my_project_db_6y9t_user",
    host:
      process.env.DB_HOST ||
      "dpg-cmpn2gta73kc73be9fcg-a.oregon-postgres.render.com",
    database: process.env.DB_NAME || "my_project_db_6y9t",
    password: process.env.DB_PASSWORD || "Yo135ONQrPKPSMZYZP4xjIS2XFRnI8r3",
    port: 5432,
  });
  return pool;
};

const getPool = () => {
  if (!pool) pool = createPool();
  return pool;
};

export default getPool;
