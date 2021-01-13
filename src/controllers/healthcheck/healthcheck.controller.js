import * as web from 'express-decorators'

@web.basePath('/')
class HealthCheckController {
  @web.get('/')
  async healthCheck(request, response) {
    console.log('hhhhh')
    response.send({
      status: 2002,
    })
  }
}

module.exports = HealthCheckController
