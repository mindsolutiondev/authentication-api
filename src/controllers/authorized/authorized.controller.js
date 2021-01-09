import * as web from 'express-decorators'
import config from '../../config'
import redisClient from '../../util/redis/redis'

import { containsAll, randomString } from '../../util/utils'

const clients = {
	"my-client": {
		name: "Sample Client",
		clientSecret: "zETqHgl0d7ThysUqPnaFuLOmG1E=",
		scopes: ["permission:name", "permission:date_of_birth"],
	},
	"test-client": {
		name: "Test Client",
		clientSecret: "TestSecret",
		scopes: ["permission:name"],
	},
}

@web.basePath('/oauth')
class OauthController {
    @web.get('/signin')
    async AuthorizedCheck(request, response) {
        const clientId = request.query.client_id
        const client = clients[clientId]

        if (!client) {
            response.status(401).send('not Authorized!')
        }

        if (
            typeof request.query.scope !== "string" ||
            !containsAll(client.scopes, request.query.scope.split(" "))
        ) {
            response.status(401).send("Error: invalid scopes requested")
            return
        }
        const userData = await request.query
        userData.requestId = await randomString()
        await redisClient.set(`${config.all.env}_${userData.requestId}`, JSON.stringify(userData))
        response.render("login", {
            client,
            scope: request.query.scope,
            requestId: userData.requestId,
        })
    }
  }
  
  module.exports = OauthController
  