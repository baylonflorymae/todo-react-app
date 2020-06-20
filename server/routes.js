import express from "express";
import { validateUserID } from "./controller/userLogin/validateUserID";
import { usersInformationList } from "./controller/userInfo/usersInformation";

const router = express.Router();

router.get("/todo", validateUserID);
router.get("/new", usersInformationList);

export default {
  router,
};
