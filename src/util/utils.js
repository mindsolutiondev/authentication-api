import crypto from 'crypto'
import bcrypt from 'bcrypt'
import querystring from 'querystring'

export function decodeAuthCredentials(auth) {
  var clientCredentials = Buffer.from(auth.slice('basic '.length), 'base64').toString().split(':')
  var clientId = querystring.unescape(clientCredentials[0])
  var clientSecret = querystring.unescape(clientCredentials[1])
  return { clientId, clientSecret }
}

export function randomString() {
  const randomBytes = crypto.randomBytes(20)
  return randomBytes.toString('base64')
}

export function containsAll(arr1, arr2) {
  const arr1Set = new Set()
  for (let i = 0; i < arr1.length; i++) {
    arr1Set.add(arr1[i])
  }

  for (let i = 0; i < arr2.length; i++) {
    if (!arr1Set.has(arr2[i])) {
      return false
    }
  }
  return true
}

export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  return hash
}

export async function comparePassword(passwordFromClient, passwordFromDB) {
  const match = await bcrypt.compare(passwordFromClient, passwordFromDB)
  return match
}
