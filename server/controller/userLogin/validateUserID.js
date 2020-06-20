import { UserIDValidation } from "../../model/userLogin/userIDValidation";

export const validateUserID = (req, res) =>
  new Promise(async () => {
    try {
      const { user_id } = req.query;

      const result = await UserIDValidation(user_id);

      res.send({ is_user_id_exist: Boolean(result[0].is_user_id_exist) });
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });
