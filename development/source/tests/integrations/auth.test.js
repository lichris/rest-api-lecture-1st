const request = require('supertest')
const randomString = require('random-string')
const HttpStatusCodes = require('http-status-codes')

const app = require('../../app')
const v1Models = require('../../models/v1')
const jwtUtil = require('../../utils/jwt')

afterAll(() => v1Models.sequelize.close())

describe('Auth 테스트', () => {

  let id
  let password

  beforeAll(async () => {
    password = randomString()

    const user = await v1Models.User.create({
      nickname: randomString(),
      password
    })

    id = user.id
  })

  describe('login 테스트 성공', () => {

    test('login 테스트 성공', async () => {
      // POST /v1/auth/login

      let response = await request(app)
        .post('/v1/auth/login')
        .send({
          id,
          password
        })

      expect(response.statusCode).toBe(200)
      expect(response.body.data.token).not.toBe(null)

      const payload = jwtUtil.check(response.body.data.token)

      expect(payload.id).toBe(id)
    })
  })

  describe('login 테스트 실패', () => {

    test('사용자 id 를 찾을 수 없습니다.', async () => {
      let response = await request(app)
        .post('/v1/auth/login')
        .send({
          id: 'asdf',
          password
        })

      expect(response.statusCode).toBe(HttpStatusCodes.NOT_FOUND)
    })
  })
})