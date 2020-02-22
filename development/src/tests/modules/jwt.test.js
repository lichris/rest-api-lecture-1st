require('dotenv').config()

const jwt = require('../../utils/jwt')

describe('JWT 로직 검증', () => {

  let payload
  let token

  beforeAll(() => {
    payload = { test: 'test' }
    token = jwt.generate(payload)
  })

  test('jwt generate 테스트', () => {
    expect(token).toMatch(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/)
  })

  test('jwt check 테스트', () => {
    const result = jwt.check(token)
    expect(result.test).toBe(payload.test)
  })
})