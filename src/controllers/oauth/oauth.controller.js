import * as web from 'express-decorators'
import url from 'url'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'
import { randomString, decodeAuthCredentials } from '../../util/utils'
import redisClient from '../../util/redis/redis'

const clientsServer = {
  'my-client': {
    name: 'Sample Client',
    clientSecret: 'zETqHgl0d7ThysUqPnaFuLOmG1E=',
    scopes: ['permission:name', 'permission:date_of_birth'],
  },
  'test-client': {
    name: 'Test Client',
    clientSecret: 'TestSecret',
    scopes: ['permission:name'],
  },
}

const users = {
  user1: 'password1',
  john: 'appleseed',
}

@web.basePath('/api/v2/oauth')
class OauthController {
  @web.post('/authorization')
  async Authorization(request, response) {
    const { userName, password, requestId } = request.body
    const userData = await redisClient.get(`${process.env.NODE_ENV}_${requestId}`)
    const userDataObj = JSON.parse(userData)
    const { redirect_uri, state, client_id } = userDataObj

    if (!userName || users[userName] !== password) {
      response.status(401).send('Error: user not authorized')
      return
    }

    if (!requestId) {
      response.status(401).send('Error: timeout please login again naka!')
      return
    }

    const code = randomString()
    const authorization = {
      userDataObj,
      userName,
      code,
    }
    const redirectUri = url.parse(redirect_uri)

    await redisClient.set(`${process.env.NODE_ENV}_${client_id}`, JSON.stringify(authorization))

    redirectUri.query = {
      code,
      state,
    }
    response.redirect(url.format(redirectUri))
  }
  @web.post('/token')
  async generateToken(request, response) {
    const authCredentials = request.headers.authorization
    if (!authCredentials) {
      res.status(401).send('Error: not authorized')
      return
    }

    const { clientId, clientSecret } = decodeAuthCredentials(authCredentials)
    const client = await redisClient.get(`${process.env.NODE_ENV}_${clientId}`)
    const clientObj = JSON.parse(client)
    const clients = clientsServer[clientId]

    if (!clients || clients.clientSecret !== clientSecret) {
      response.status(401).send('Error: client not authorized')
      return
    }

    const code = request.body.code
    if (!code || !clientObj.code) {
      response.status(401).send('Error: invalid code')
      return
    }
    const token = jwt.sign(
      {
        userName: clientObj.userName,
        scope: clientObj.userDataObj.scope,
      },
      fs.readFileSync(path.join(__dirname, '..','..','config', 'keys', 'private_key.pem')),
      {
        algorithm: 'RS256',
        expiresIn: 300,
        issuer: 'http://localhost:6000',
      }
    )

    response.json({
      access_token: token,
      token_type: 'Bearer',
      scope: clientObj.userDataObj.scope,
    })
  }
}

module.exports = OauthController
