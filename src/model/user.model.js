import mongoose from 'mongoose'

const { Schema } = mongoose

const userSchemaDefinition = {
    username: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    address: {
        type: String,
    },
    profileImg: {
        type: String,
    },
    application: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        index: 1
    }]
}

export default mongoose.model('user', new Schema(userSchemaDefinition, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }))