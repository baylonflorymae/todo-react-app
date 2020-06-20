import * as mysql from "mysql";
import config from "../config/config";

export const Connection = mysql.createConnection(config.mysql);

Connection.connect((err) => {
  if (err) console.error(err);
});
