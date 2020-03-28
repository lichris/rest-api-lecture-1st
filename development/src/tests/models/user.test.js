const bcrypt = require('bcrypt')
const randomString = require('random-string')

const v1Models = require('../../models/v1')

let user
let password

beforeAll(async () => {
  password = randomString()
  user = await v1Models.User.create({
    nickname: randomString(),
    password
  })
})

afterAll(() => v1Models.sequelize.close())

describe('User 테스트', () => {

  describe('User Create', () => {
    test('User 생성 시, password 가 암호화 되어야 한다.', async () => {
      const isMatch = await bcrypt.compare(password, user.password)

      expect(isMatch).toBe(true)
    })

    test('User 생성 시, UserProfile 이 따라 생겨야 합니다.', async () => {
      const profile = await v1Models.UserProfile.findOne({
        where: {
          userId: user.id
        }
      })

      expect(profile).toBeTruthy()
      expect(profile.userId).toBe(user.id)
    })
  })
})