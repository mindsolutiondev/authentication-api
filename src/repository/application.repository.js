import mongoose from 'mongoose'
import omit from 'lodash/omit'
import Application from '../model/application.model'
import { randomString } from '../util/utils'
import userModel from '../model/user.model'

export const createApp = async (appData) => {
  const ownerId = mongoose.Types.ObjectId.isValid(appData.ownerId)
    ? { _id: mongoose.Types.ObjectId(appData.ownerId) }
    : false

  if (ownerId !== false) {
    const applicationObj = {
      ownerId: ownerId,
      clientId: randomString(),
      applicationName: appData.applicationName,
      clientSecret: randomString(),
    }
    let resultToCreate = await Application.create(applicationObj)

    // update AppId To User
    await userModel.updateOne({ _id: ownerId }, { $push: { application: resultToCreate._id } })
    return resultToCreate
  } else {
    throw new Error({ error: 'owner Id is not valid' })
  }
}

export const getApplicationDescription = async (clientIds) => {
  const applicationData = await Application.findOne({ clientId: clientIds }).lean()
  console.log(applicationData)

  return omit(applicationData, ['__v', '_id'])
}
