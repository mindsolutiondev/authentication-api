import * as web from 'express-decorators'
import { createUser } from '../../repository/user.repository'

@web.basePath('/api/v2')
class UserController {
  @web.post('/users') 
  async createUser (request,response) {
    const createUserResult = await createUser(request.body)
    if (createUserResult.status === true) {
      response.status(200).json({ message: 'create user success'})
    } else {
      response.status(403).send({ message: 'invalid request' })
    }
  }
}

module.exports = UserController