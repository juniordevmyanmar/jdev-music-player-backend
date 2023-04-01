import * as jose from 'jose'

const secretKey = process.env.SECRET || 'zH4NRP1HMALxxCFnRZABFA7GOJtzU_gIj02alfL1lvI'
const issuer = process.env.ISSUER || 'urn:jdmm:issuer'
const audience = process.env.ISSUER || 'urn:jdmm:audience'

class JWT {
  static async encryption(user: any): Promise<string | ''> {
    const secret = jose.base64url.decode(secretKey)
    const userSubject = JSON.stringify(user)

    const jwt = await new jose.EncryptJWT({ 'urn:example:claim': true })
      .setProtectedHeader({ alg: 'dir', enc: 'A128CBC-HS256' })
      .setIssuedAt()
      .setIssuer(issuer)
      .setAudience(audience)
      .setExpirationTime('24h')
      .setSubject(userSubject)
      .encrypt(secret)

    return jwt
  }

  static async decode(token: string): Promise<jose.JWTPayload | null> {
    const secret = jose.base64url.decode(secretKey)
    const { payload } = await jose.jwtDecrypt(token, secret, {
      issuer: issuer,
      audience: audience,
    })

    return payload
  }
}

export default JWT
