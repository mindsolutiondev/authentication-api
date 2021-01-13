import * as web from 'express-decorators'
import config from '../../config'
import { getApplicationDescription } from '../../repository/application.repository'
import redisClient from '../../util/redis/redis'

import { containsAll, randomString } from '../../util/utils'

const clients = {
	"9mT85B4B2TyCgh3biaMwGt6kI78=": {
		name: "9mT85B4B2TyCgh3biaMwGt6kI78=",
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
        const clientApp = await getApplicationDescription(clientId)
        console.log(clientApp)


        if (!clientApp) {
            response.status(401).send('not Authorized!')
        }

        if (
            typeof request.query.scope !== "string" ||
            !containsAll(clientApp.scope, request.query.scope.split(" "))
        ) {
            response.status(401).send("Error: invalid scopes requested")
            return
        }
        const userData = await request.query
        userData.requestId = await randomString()
        await redisClient.set(`${config.all.env}_${userData.requestId}`, JSON.stringify(userData))
        response.render("login", {
            client: clientApp,
            scope: request.query.scope,
            requestId: userData.requestId,
        })
    }
  }
  
  module.exports = OauthController
  