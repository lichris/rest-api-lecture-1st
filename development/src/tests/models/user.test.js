const bcrypt = require('bcrypt')

const v1Models = require('../../models/v1')

afterAll(() => v1Models.sequelize.close())

describe('User 테스트', () => {

  describe('User Create', () => {

    test('User 생성 시, password 가 암호화 되어야 한다.', async () => {
      const password = 'someRandomString'

      const user = await v1Models.User.create({
        nickname: 'Heeseung Lee',
        password
      })

      const isMatch = await bcrypt.compare(password, user.password)

      expect(isMatch).toBe(true)
    })
  })
})