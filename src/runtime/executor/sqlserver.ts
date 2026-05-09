import sql from "mssql";
import dotenv from "dotenv";
import path from "path";
dotenv.config({
  path: path.resolve(
    process.cwd(),
    ".env"
  )
});
interface ExecuteSqlOptions {
  sqlText: string;
  params?: any[];
}

const config: sql.config = {
  user: "sa",
  password:process.env.SQLSERVER_PASSWORD,
  server: "sqlserver",
  database: "sample",
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};
export async function executeSqlServer(
  sqlText: string,
  params: any[] = []
) {
  const pool = await sql.connect(config);

  const request = pool.request();

  // 参数绑定，防止 SQL 注入
  params.forEach((value, index) => {
    request.input(`p${index}`, value);
  });

  const result = await request.query(sqlText);

  return result.recordset;
}