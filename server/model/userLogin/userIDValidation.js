import { Connection } from "../connection";
/**
 * This checks the user id in the data base if it
 * has already existed in the records
 * @param {String} user_id - user id of the user
 */
export const UserIDValidation = (user_id) => {
  return new Promise((resolve, reject) => {
    try {
      Connection.query(
        `SELECT IF(COUNT(user_login_id) >= 1, TRUE, FALSE) AS is_user_id_exist FROM user_info_tbl WHERE user_login_id = "${user_id}";`,
        (err, results) => {
          if (err) {
            return reject(err);
          }
          resolve(results);
        }
      );
    } catch (error) {
      return reject(error);
    }
  });
};
