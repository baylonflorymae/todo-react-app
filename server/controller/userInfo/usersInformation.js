import {usersInformation} from '../../model/userInfo/usersInformation';

export const usersInformationList = (req, res) => {
  return new Promise((resolve, reject) => {
    try {

      const {users_input} = req.body;

      const result = await usersInformation(users_input)

      console.log(result)
    } catch (error) {
      return reject(error)
    }
  })
}