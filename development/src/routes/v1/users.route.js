const express = require('express')
const router = express.Router()

const controller = require('../../controllers/v1/users.controller')

// http method

router.route('/')
  // 사용자 조회
  // query 가 없으면 getAll
  // id 가 있으면 getbyid
  // nickname 이 있으면 getbynickname
  .get(controller.get)
  // post : 생성
  // body: {nickname, password}
  .post(controller.create)

router.route('/:id')
  // put : 수정
  // body: password
  .put(controller.update)
  // delete : 삭제
  .delete(controller.destroy)

module.exports = router
