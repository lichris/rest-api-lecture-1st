const request = require('supertest')
const HttpStatusCodes = require('http-status-codes')
const randomString = require('random-string')

const app = require('../../app')
const v1Models = require('../../models/v1')
const jwtUtil = require('../../utils/jwt')

let user
let token

beforeAll(async () => {
  user = await v1Models.User.create({
    nickname: randomString(),
    password: randomString()
  })

  token = jwtUtil.generate({ id: user.id, nickname: user.nickname })
})

afterAll(() => v1Models.sequelize.close())

describe('GET /users', () => {
  test('사용자를 받아올때, profile 이 함께 로드되어야 합니다.', async () => {
    let res = await request(app)
      .get('/v1/users')
      .set('Authorization', `Bearer ${ token }`)

    expect(res.statusCode).toBe(HttpStatusCodes.OK)
    expect(res.body.data.user.profile).toBeTruthy()
  })
})

describe('PUT /users', () => {
  // level /users

  describe('PUT /profiles', () => {
    // level /users/profiles
    test('프로필 수정', async () => {
      let res = await request(app)
        .put('/v1/users/profiles')
        .send({
          profileImg: '/asdf',
          greeting: 'asdf'
        })
        .set('Authorization', `Bearer ${ token }`)
  
      expect(res.statusCode).toBe(HttpStatusCodes.OK)
      expect(res.body.data.profile.profileImg).toBe('/asdf')
      expect(res.body.data.profile.greeting).toBe('asdf')
    })
  })
})

describe('DELETE /users', () => {
  // level /users

  describe('DELETE /profiles', () => {
    // level /users/profiles
    test('프로필 초기화', async () => {
      let res = await request(app)
        .delete('/v1/users/profiles')
        .set('Authorization', `Bearer ${ token }`)
  
      expect(res.statusCode).toBe(HttpStatusCodes.OK)
      expect(res.body.data.profile.profileImg).toBeFalsy()
      expect(res.body.data.profile.greeting).toBeFalsy()
    })
  })
})