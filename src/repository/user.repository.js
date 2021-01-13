import user from '../model/user.model'
import isEmpty from 'lodash/isEmpty'
import { hashPassword } from '../util/utils'

export const createUser = async (data) => {
  try {
    if (!isEmpty(data)) {
      const { password } = data
      const passwordHash = await hashPassword(password)
      const objData = { ...data, password: passwordHash }
      await user.create(objData)
      return {
        status: true,
      }
    } else {
      return {
        status: false,
      }
    }
  } catch (err) {
    throw new Error('cannot create user because '+ err.message)
  }
}

export const getUser = async (username, password) => {
  const userData = await user.findOne({ username: username })
  console.log(userData)
  return userData
}
