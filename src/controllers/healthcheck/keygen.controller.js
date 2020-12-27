import * as web from 'express-decorators'
const licenseKey = require('license-key-gen')


@web.basePath('/api/v1')
class KeygenController {
  @web.post('/keygen/create')
  async healthCheck(request, response) {
    var userInfo = {
      companyName: 'มายด์ โซลูชั่น จำกัด',
      companyID: '1111',
      city: 'city/town',
      Road: 'State/Province',
      district: 'postal/zip',
      subDistrict: 'postal/zip',
    }
    var licenseData = {
      info: userInfo,
      prodCode: 'VAG',
      appVersion: '1.0',
      osType: 'WIN10',
    }

    var license = licenseKey.createLicense(licenseData)
    response.send({
      status: true,
      ...license
    })
  }
}

module.exports = KeygenController
