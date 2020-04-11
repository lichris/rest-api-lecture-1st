const uuid4 = require('../../utils/uuid4')

describe('uuid4 테스트', () => {
  test('generate 함수는 ordered uuid4 가 출력되어야 합니다.', () => {
    expect(uuid4.generate()).toMatch(/\b4[0-9A-Fa-f]{31}\b/g)
  })
})