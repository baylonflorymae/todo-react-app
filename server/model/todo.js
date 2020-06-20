import { Connection } from "./connection";

export const getAllTodo = async () => {
  return new Promise((resolve, reject) => {
    Connection.query("SELECT * from todo", (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};
