import { UserIDValidation } from "./userIDValidation";

test("Should return false", async () => {
  const result = await UserIDValidation("baylon@gmail.com");

  expect(result).toEqual(expect.arrayContaining([{ is_user_id_exist: 0 }]));
});

test("Should return true", async () => {
  const result = await UserIDValidation("john@smith.com");

  expect(result).toEqual(expect.arrayContaining([{ is_user_id_exist: 1 }]));
});
