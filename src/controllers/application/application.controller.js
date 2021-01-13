import * as web from 'express-decorators'
import { createApp } from '../../repository/application.repository'

@web.basePath('/api/v2')
class UserController {
  @web.post('/application/create')
  async createApplication(request, response) {
    try {
      await createApp(request.body)
      response.status(200).send({ status: 'success' })
    } catch (err) {
      response.status(400).send({ status: 'bad request' })
    }
  }
}

module.exports = UserController
