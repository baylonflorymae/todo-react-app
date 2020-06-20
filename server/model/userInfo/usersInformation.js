import { Connection } from "../connection";

export const usersInformation = (users_input) => {
  return new Promise((resolve, reject) => {
    try {
      Connection.query(
        `SELECT * FROM users_login_tbl VALUES ("${users_input}")`,
        (error, rows, fields) => {
          if (!error) {
            res.send(rows);
          } else console.error(error);
        }
      );
    } catch (error) {
      return reject(error);
    }
  });
};
