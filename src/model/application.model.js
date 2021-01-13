import mongoose from 'mongoose'

const { Schema } = mongoose

const applicationDefinition = {
    ownerId: mongoose.Schema.Types.ObjectId,
    clientId: {
        type: String,
        default: ''
    },
    applicationName: {
        type: String,
    },
    clientSecret: {
        type: String,
        default: ''
    },
    scope: [ String ]
}

export default mongoose.model('application', new Schema(applicationDefinition, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }))