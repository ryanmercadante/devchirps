import express from 'express'
import jwt from 'express-jwt'
import jwksClient from 'jwks-rsa'

const app = express()

const jwtCheck = jwt({
  secret: jwksClient.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${process.env.AUTH0_ISSUER}.well-known/jwks.json`,
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: process.env.AUTH0_ISSUER,
  algorithms: ['RS256'],
  credentialsRequired: true,
})

app.use(jwtCheck, (err, req, res, next) => {
  console.log('error!!!!!!!!!!!', err.code)
  if (err.code === 'credentials_required') {
    return next()
  }
  return next(err)
})

export default app
